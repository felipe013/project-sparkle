import { Link } from "@tanstack/react-router";
import { ChevronRight } from "lucide-react";
import { LessonCard } from "./lesson-card";
import { useCourse } from "@/lib/course-store";
import type { Lesson } from "@/lib/course-types";

export interface LessonRowProps {
  readonly title: string;
  readonly subtitle?: string;
  readonly lessons: readonly Lesson[];
  readonly moduleSlug?: string;
}

export function LessonRow({ title, subtitle, lessons, moduleSlug }: LessonRowProps) {
  const { modules, progress } = useCourse();
  if (lessons.length === 0) return null;

  const moduleTitleOf = (moduleId: string) =>
    modules.find((item) => item.id === moduleId)?.title ?? "Módulo";

  return (
    <section className="py-6">
      <div className="mx-auto flex max-w-7xl items-end justify-between gap-4 px-4 sm:px-6">
        <div className="min-w-0">
          <h2 className="truncate text-2xl tracking-wide sm:text-3xl">{title}</h2>
          {subtitle ? (
            <p className="mt-1 line-clamp-1 text-sm text-muted-foreground">{subtitle}</p>
          ) : null}
        </div>
        {moduleSlug ? (
          <Link
            to="/modulo/$slug"
            params={{ slug: moduleSlug }}
            className="inline-flex shrink-0 items-center gap-1 text-sm text-muted-foreground transition-colors hover:text-foreground"
          >
            Ver módulo
            <ChevronRight className="size-4" aria-hidden="true" />
          </Link>
        ) : null}
      </div>

      <div className="row-scroll mt-4 px-4 sm:px-6">
        {lessons.map((lesson) => (
          <LessonCard
            key={lesson.id}
            lesson={lesson}
            moduleTitle={moduleTitleOf(lesson.moduleId)}
            progress={progress[lesson.id]}
          />
        ))}
      </div>
    </section>
  );
}
