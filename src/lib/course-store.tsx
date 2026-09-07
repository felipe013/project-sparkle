import {
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
  type ReactNode,
} from "react";
import { COURSE_MODULES, SEED_LESSONS } from "./course-seed";
import { CourseContext, useCourse } from "./course-context";
import type { CourseContextValue } from "./course-context";
import type { Lesson, LessonDraft, LessonProgress, ProgressMap } from "./course-types";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/hooks/use-auth";

export { useCourse } from "./course-context";

const LESSONS_KEY = "mda:lessons:v3";
const PROGRESS_KEY = "mda:progress:v3";


function readStorage<T>(key: string, fallback: T): T {
  try {
    const raw = window.localStorage.getItem(key);
    return raw ? (JSON.parse(raw) as T) : fallback;
  } catch {
    return fallback;
  }
}

function writeStorage(key: string, value: unknown): void {
  try {
    window.localStorage.setItem(key, JSON.stringify(value));
  } catch {
    /* storage unavailable — demo keeps working in memory */
  }
}

/** Cloud row wins when it is further along; local wins when it is ahead. */
function mergeEntries(local?: LessonProgress, remote?: LessonProgress): LessonProgress {
  if (!local) return remote as LessonProgress;
  if (!remote) return local;
  if (local.completed !== remote.completed) return local.completed ? local : remote;
  return local.percent >= remote.percent ? local : remote;
}

export function CourseProvider({ children }: { children: ReactNode }) {
  const { user } = useAuth();
  const userId = user?.id ?? null;
  const [lessons, setLessons] = useState<readonly Lesson[]>(SEED_LESSONS);
  const [progress, setProgress] = useState<ProgressMap>({});
  const [hydrated, setHydrated] = useState(false);
  const [cloudSynced, setCloudSynced] = useState(false);
  const progressRef = useRef<ProgressMap>({});

  progressRef.current = progress;

  // Storage is browser-only: read after hydration to keep SSR markup stable.
  useEffect(() => {
    setLessons(readStorage<readonly Lesson[]>(LESSONS_KEY, SEED_LESSONS));
    setProgress(readStorage<ProgressMap>(PROGRESS_KEY, {}));
    setHydrated(true);
  }, []);

  useEffect(() => {
    if (hydrated) writeStorage(LESSONS_KEY, lessons);
  }, [hydrated, lessons]);

  useEffect(() => {
    if (hydrated) writeStorage(PROGRESS_KEY, progress);
  }, [hydrated, progress]);

  // Pull cloud progress on sign-in and push anything only this device knows.
  useEffect(() => {
    if (!hydrated) return;
    if (!userId) {
      setCloudSynced(false);
      return;
    }
    let active = true;

    void (async () => {
      const { data, error } = await supabase
        .from("lesson_progress")
        .select("lesson_id, percent, completed, updated_at")
        .eq("user_id", userId);

      if (!active || error || !data) return;

      const remote: Record<string, LessonProgress> = {};
      for (const row of data) {
        remote[row.lesson_id] = {
          percent: row.percent,
          completed: row.completed,
          updatedAt: new Date(row.updated_at).getTime(),
        };
      }

      const local = progressRef.current;
      const merged: Record<string, LessonProgress> = {};
      for (const id of new Set([...Object.keys(local), ...Object.keys(remote)])) {
        merged[id] = mergeEntries(local[id], remote[id]);
      }

      const pending = Object.entries(merged).filter(([id, entry]) => {
        const row = remote[id];
        return !row || row.percent !== entry.percent || row.completed !== entry.completed;
      });

      if (pending.length > 0) {
        await supabase.from("lesson_progress").upsert(
          pending.map(([lesson_id, entry]) => ({
            user_id: userId,
            lesson_id,
            percent: entry.percent,
            completed: entry.completed,
          })),
          { onConflict: "user_id,lesson_id" },
        );
      }

      if (!active) return;
      setProgress(merged);
      setCloudSynced(true);
    })();

    return () => {
      active = false;
    };
  }, [hydrated, userId]);

  const pushProgress = useCallback(
    (id: string, entry: LessonProgress) => {
      if (!userId) return;
      void supabase.from("lesson_progress").upsert(
        {
          user_id: userId,
          lesson_id: id,
          percent: entry.percent,
          completed: entry.completed,
        },
        { onConflict: "user_id,lesson_id" },
      );
    },
    [userId],
  );


  const sorted = useMemo(
    () =>
      [...lessons].sort((a, b) =>
        a.moduleId === b.moduleId
          ? a.order - b.order
          : a.moduleId.localeCompare(b.moduleId),
      ),
    [lessons],
  );

  const getModule = useCallback(
    (slug: string) => COURSE_MODULES.find((item) => item.slug === slug),
    [],
  );

  const getLesson = useCallback(
    (id: string) => sorted.find((item) => item.id === id),
    [sorted],
  );

  const lessonsOfModule = useCallback(
    (moduleId: string) =>
      sorted.filter((item) => item.moduleId === moduleId).sort((a, b) => a.order - b.order),
    [sorted],
  );

  const orderedAll = useMemo(() => {
    const rank = new Map(COURSE_MODULES.map((item) => [item.id, item.order]));
    return [...sorted].sort((a, b) => {
      const moduleDiff = (rank.get(a.moduleId) ?? 99) - (rank.get(b.moduleId) ?? 99);
      return moduleDiff !== 0 ? moduleDiff : a.order - b.order;
    });
  }, [sorted]);

  const nextLesson = useCallback(
    (id: string) => {
      const index = orderedAll.findIndex((item) => item.id === id);
      return index >= 0 ? orderedAll[index + 1] : undefined;
    },
    [orderedAll],
  );

  const setWatched = useCallback((id: string, percent: number) => {
    setProgress((current) => {
      const clamped = Math.max(0, Math.min(100, Math.round(percent)));
      const existing = current[id];
      if (existing && existing.percent >= clamped && !existing.completed) return current;
      return {
        ...current,
        [id]: {
          percent: clamped,
          completed: existing?.completed ?? clamped >= 95,
          updatedAt: Date.now(),
        },
      };
    });
  }, []);

  const toggleCompleted = useCallback((id: string) => {
    setProgress((current) => {
      const completed = !current[id]?.completed;
      return {
        ...current,
        [id]: { percent: completed ? 100 : 0, completed, updatedAt: Date.now() },
      };
    });
  }, []);

  const addLesson = useCallback((draft: LessonDraft) => {
    setLessons((current) => [
      ...current,
      { ...draft, id: `${draft.moduleId}-${Date.now().toString(36)}` },
    ]);
  }, []);

  const updateLesson = useCallback((id: string, patch: Partial<LessonDraft>) => {
    setLessons((current) =>
      current.map((item) => (item.id === id ? { ...item, ...patch } : item)),
    );
  }, []);

  const removeLesson = useCallback((id: string) => {
    setLessons((current) => current.filter((item) => item.id !== id));
  }, []);

  const resetLessons = useCallback(() => setLessons(SEED_LESSONS), []);

  const value = useMemo<CourseContextValue>(
    () => ({
      modules: COURSE_MODULES,
      lessons: orderedAll,
      progress,
      hydrated,
      getModule,
      getLesson,
      lessonsOfModule,
      nextLesson,
      setWatched,
      toggleCompleted,
      addLesson,
      updateLesson,
      removeLesson,
      resetLessons,
    }),
    [
      orderedAll,
      progress,
      hydrated,
      getModule,
      getLesson,
      lessonsOfModule,
      nextLesson,
      setWatched,
      toggleCompleted,
      addLesson,
      updateLesson,
      removeLesson,
      resetLessons,
    ],
  );

  return <CourseContext.Provider value={value}>{children}</CourseContext.Provider>;
}

/** Overall course completion, derived — never stored. */
export function useCourseStats() {
  const { lessons, progress } = useCourse();
  return useMemo(() => {
    const total = lessons.length;
    const completed = lessons.filter((item) => progress[item.id]?.completed).length;
    const inProgress = lessons.filter(
      (item) => !progress[item.id]?.completed && (progress[item.id]?.percent ?? 0) > 0,
    ).length;
    return {
      total,
      completed,
      inProgress,
      percent: total === 0 ? 0 : Math.round((completed / total) * 100),
    };
  }, [lessons, progress]);
}

/** Lessons started but not finished, most recent first. */
export function useContinueWatching(limit = 10) {
  const { lessons, progress } = useCourse();
  return useMemo(
    () =>
      lessons
        .filter((item) => {
          const entry = progress[item.id];
          return entry && !entry.completed && entry.percent > 0;
        })
        .sort((a, b) => (progress[b.id]?.updatedAt ?? 0) - (progress[a.id]?.updatedAt ?? 0))
        .slice(0, limit),
    [lessons, progress, limit],
  );
}
