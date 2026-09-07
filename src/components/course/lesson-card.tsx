import { Link } from "@tanstack/react-router";
import { CheckCircle2, Play } from "lucide-react";
import { cn } from "@/lib/utils";
import { youtubeThumbnail, type Lesson, type LessonProgress } from "@/lib/course-types";

export interface LessonCardProps {
  readonly lesson: Lesson;
  readonly moduleTitle: string;
  readonly progress?: LessonProgress | undefined;
  /** Fixed width inside horizontal rows; full width inside grids. */
  readonly variant?: "row" | "grid" | undefined;
  readonly className?: string | undefined;
}

export function LessonCard({
  lesson,
  moduleTitle,
  progress,
  variant = "row",
  className,
}: LessonCardProps) {
  const percent = progress?.completed ? 100 : (progress?.percent ?? 0);

  return (
    <Link
      to="/aula/$lessonId"
      params={{ lessonId: lesson.id }}
      className={cn(
        "group relative block shrink-0 overflow-hidden rounded-xl border border-border bg-card shadow-[var(--shadow-card)] transition-all duration-300 hover:-translate-y-1 hover:border-primary/60 hover:shadow-[var(--shadow-hover)] focus-visible:-translate-y-1 focus-visible:border-primary focus-visible:outline-none",
        variant === "row" ? "w-[268px] sm:w-[300px]" : "w-full",
        className,
      )}
    >
      <div className="relative aspect-video overflow-hidden bg-surface">
        <img
          src={youtubeThumbnail(lesson.youtubeId)}
          alt={`Miniatura da aula ${lesson.title}`}
          loading="lazy"
          width={480}
          height={360}
          className="size-full object-cover transition-transform duration-500 group-hover:scale-105"
        />
        <div className="absolute inset-0 bg-background/40 opacity-0 transition-opacity group-hover:opacity-100" />
        <span className="absolute inset-0 grid place-items-center opacity-0 transition-opacity group-hover:opacity-100">
          <span className="grid size-12 place-items-center rounded-full bg-primary text-primary-foreground">
            <Play className="size-5 fill-current" aria-hidden="true" />
          </span>
        </span>

        <span className="absolute bottom-2 right-2 rounded bg-background/85 px-1.5 py-0.5 text-xs tabular-nums text-foreground">
          {lesson.duration}
        </span>

        {progress?.completed ? (
          <span className="absolute left-2 top-2 flex items-center gap-1 rounded-full bg-background/85 px-2 py-0.5 text-xs text-success">
            <CheckCircle2 className="size-3.5" aria-hidden="true" />
            Concluída
          </span>
        ) : null}

        {percent > 0 ? (
          <span className="absolute inset-x-0 bottom-0 block h-1 bg-surface">
            <span
              className="block h-full bg-primary"
              style={{ width: `${percent}%` }}
              aria-hidden="true"
            />
          </span>
        ) : null}
      </div>

      <div className="p-4">
        <p className="flex items-center gap-2 text-xs uppercase tracking-wider text-primary">
          <span className="truncate">{moduleTitle}</span>
          <span className="shrink-0 text-muted-foreground normal-case tracking-normal">
            Aula {lesson.order}
          </span>
        </p>
        <h3 className="mt-1.5 line-clamp-2 text-lg leading-tight text-card-foreground">
          {lesson.title}
        </h3>
        <p className="mt-1.5 line-clamp-2 text-sm text-muted-foreground">{lesson.description}</p>
        <span className="mt-3 inline-flex items-center gap-1.5 text-sm font-medium text-foreground transition-colors group-hover:text-primary">
          <Play className="size-3.5 fill-current" aria-hidden="true" />
          {percent > 0 && !progress?.completed ? "Continuar" : "Assistir"}
        </span>
      </div>
    </Link>
  );
}
