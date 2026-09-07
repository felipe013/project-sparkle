import { Link } from "@tanstack/react-router";
import { Info, Play } from "lucide-react";
import { useCourse, useCourseStats } from "@/lib/course-store";
import { youtubeThumbnail } from "@/lib/course-types";

export interface HeroBannerProps {
  readonly lessonId: string;
}

export function HeroBanner({ lessonId }: HeroBannerProps) {
  const { getLesson, modules, lessons } = useCourse();
  const stats = useCourseStats();
  const lesson = getLesson(lessonId) ?? lessons[0];
  if (!lesson) return null;

  const courseModule = modules.find((item) => item.id === lesson.moduleId);

  return (
    <section className="relative">
      <div className="relative h-[420px] w-full overflow-hidden sm:h-[520px]">
        <img
          src={youtubeThumbnail(lesson.youtubeId)}
          alt=""
          aria-hidden="true"
          width={480}
          height={360}
          className="size-full scale-105 object-cover blur-[2px]"
        />
        <div className="fade-side absolute inset-0" />
        <div className="fade-bottom absolute inset-0" />
      </div>

      <div className="absolute inset-0 flex items-center">
        <div className="mx-auto w-full max-w-7xl px-4 sm:px-6">
          <div className="max-w-xl">
            <p className="text-xs uppercase tracking-[0.2em] text-primary">
              Curso Completo de Ajustes e Reformas de Roupas
            </p>
            <h1 className="mt-3 text-4xl leading-none tracking-wide sm:text-6xl">
              {lesson.title}
            </h1>
            <p className="mt-4 line-clamp-3 text-sm text-muted-foreground sm:text-base">
              {lesson.description} Módulo {courseModule?.title}. {stats.total} aulas em 12 módulos,
              do primeiro alfinete ao acabamento profissional.
            </p>

            <div className="mt-6 flex flex-wrap items-center gap-3">
              <Link
                to="/aula/$lessonId"
                params={{ lessonId: lesson.id }}
                className="inline-flex items-center gap-2 rounded-md bg-primary px-6 py-3 text-sm font-semibold text-primary-foreground transition-opacity hover:opacity-90"
              >
                <Play className="size-4 fill-current" aria-hidden="true" />
                Assistir
              </Link>
              <Link
                to="/modulos"
                className="inline-flex items-center gap-2 rounded-md bg-elevated px-6 py-3 text-sm font-semibold text-foreground transition-colors hover:bg-surface"
              >
                <Info className="size-4" aria-hidden="true" />
                Ver módulos
              </Link>
            </div>

            <p className="mt-5 text-sm text-muted-foreground">
              <span className="font-semibold text-foreground">{stats.percent}%</span> do curso
              concluído · {stats.completed} de {stats.total} aulas
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
