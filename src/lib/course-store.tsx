import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from "react";
import { COURSE_MODULES, SEED_LESSONS } from "./course-seed";
import type { CourseModule, Lesson, LessonDraft, ProgressMap } from "./course-types";

const LESSONS_KEY = "mda:lessons:v2";
const PROGRESS_KEY = "mda:progress:v2";

interface CourseContextValue {
  readonly modules: readonly CourseModule[];
  readonly lessons: readonly Lesson[];
  readonly progress: ProgressMap;
  readonly hydrated: boolean;
  getModule: (slug: string) => CourseModule | undefined;
  getLesson: (id: string) => Lesson | undefined;
  lessonsOfModule: (moduleId: string) => readonly Lesson[];
  nextLesson: (id: string) => Lesson | undefined;
  setWatched: (id: string, percent: number) => void;
  toggleCompleted: (id: string) => void;
  addLesson: (draft: LessonDraft) => void;
  updateLesson: (id: string, patch: Partial<LessonDraft>) => void;
  removeLesson: (id: string) => void;
  resetLessons: () => void;
}

const CourseContext = createContext<CourseContextValue | null>(null);

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

export function CourseProvider({ children }: { children: ReactNode }) {
  const [lessons, setLessons] = useState<readonly Lesson[]>(SEED_LESSONS);
  const [progress, setProgress] = useState<ProgressMap>({});
  const [hydrated, setHydrated] = useState(false);

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

export function useCourse(): CourseContextValue {
  const context = useContext(CourseContext);
  if (!context) throw new Error("useCourse deve ser usado dentro de <CourseProvider>");
  return context;
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
