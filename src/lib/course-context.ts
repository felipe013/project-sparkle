import { createContext, useContext } from "react";
import type { CourseModule, Lesson, LessonDraft, ProgressMap } from "./course-types";

export interface CourseContextValue {
  readonly modules: readonly CourseModule[];
  readonly lessons: readonly Lesson[];
  readonly progress: ProgressMap;
  readonly hydrated: boolean;
  /** True once this student's progress is loaded from (and saved to) the cloud. */
  readonly cloudSynced: boolean;

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

export const CourseContext = createContext<CourseContextValue | null>(null);

export function useCourse(): CourseContextValue {
  const context = useContext(CourseContext);
  if (!context) throw new Error("useCourse deve ser usado dentro de <CourseProvider>");
  return context;
}