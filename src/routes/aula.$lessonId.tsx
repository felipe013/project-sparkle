import { useEffect } from "react";
import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { CheckCircle2, Circle, SkipForward } from "lucide-react";
import { LessonCard } from "@/components/course/lesson-card";
import { useCourse } from "@/lib/course-store";
import { youtubeEmbedUrl } from "@/lib/course-types";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/aula/$lessonId")({
  head: () => ({
    meta: [
      { title: "Assistindo à aula — Mestre dos Ajustes" },
      {
        name: "description",
        content:
          "Assista à aula com passo a passo, marque como concluída e siga para o próximo vídeo do curso.",
      },
      { property: "og:title", content: "Aula — Mestre dos Ajustes" },
      {
        property: "og:description",
        content: "Vídeoaula de ajustes e reformas de roupas com passo a passo e progresso salvo.",
      },
    ],
  }),
  component: WatchPage,
});

function WatchPage() {
  const { lessonId } = Route.useParams();
  const navigate = useNavigate();
  const {
    getLesson,
    getModule,
    lessonsOfModule,
    nextLesson,
    progress,
    setWatched,
    toggleCompleted,
    hydrated,
  } = useCourse();

  const lesson = getLesson(lessonId);

  // Opening the player counts as "em andamento" until the aluno concludes it.
  useEffect(() => {
    if (hydrated && lesson) setWatched(lesson.id, 25);
  }, [hydrated, lesson, setWatched]);

  if (!lesson) {
    return (
      <div className="mx-auto max-w-3xl px-4 py-20 text-center">
        <h1 className="text-3xl">Aula não encontrada</h1>
        <Link to="/" className="mt-4 inline-block text-primary hover:underline">
          Voltar ao início
        </Link>
      </div>
    );
  }

  const courseModule = getModule(lesson.moduleId);
  const entry = progress[lesson.id];
  const upcoming = nextLesson(lesson.id);
  const related = lessonsOfModule(lesson.moduleId).filter((item) => item.id !== lesson.id);

  return (
    <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6">
      <Link
        to="/modulo/$slug"
        params={{ slug: lesson.moduleId }}
        className="text-sm text-muted-foreground hover:text-foreground"
      >
        ← {courseModule?.title}
      </Link>

      <div className="mt-4 grid gap-8 lg:grid-cols-[minmax(0,1fr)_340px] lg:items-start">
        <div className="min-w-0">
          <div className="overflow-hidden rounded-xl border border-border bg-card">
            <div className="aspect-video w-full">
              <iframe
                key={lesson.id}
                src={youtubeEmbedUrl(lesson.youtubeId)}
                title={lesson.title}
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                allowFullScreen
                className="size-full border-0"
              />
            </div>
          </div>

          <div className="mt-5">
            <p className="text-xs uppercase tracking-[0.2em] text-primary">
              {courseModule?.title} · Aula {lesson.order} · {lesson.duration}
            </p>
            <h1 className="mt-2 text-3xl tracking-wide sm:text-4xl">{lesson.title}</h1>
            <p className="mt-3 max-w-3xl text-sm text-muted-foreground sm:text-base">
              {lesson.description}
            </p>

            <div className="mt-5 flex flex-wrap gap-3">
              <button
                type="button"
                onClick={() => toggleCompleted(lesson.id)}
                className={cn(
                  "inline-flex items-center gap-2 rounded-md px-5 py-2.5 text-sm font-semibold transition-colors",
                  entry?.completed
                    ? "bg-success text-success-foreground"
                    : "bg-primary text-primary-foreground hover:opacity-90",
                )}
              >
                {entry?.completed ? (
                  <CheckCircle2 className="size-4" aria-hidden="true" />
                ) : (
                  <Circle className="size-4" aria-hidden="true" />
                )}
                {entry?.completed ? "Aula concluída" : "Marcar como concluído"}
              </button>

              {upcoming ? (
                <button
                  type="button"
                  onClick={() =>
                    void navigate({ to: "/aula/$lessonId", params: { lessonId: upcoming.id } })
                  }
                  className="inline-flex items-center gap-2 rounded-md bg-elevated px-5 py-2.5 text-sm font-semibold text-foreground transition-colors hover:bg-surface"
                >
                  Próximo vídeo
                  <SkipForward className="size-4" aria-hidden="true" />
                </button>
              ) : null}
            </div>

            <ul className="mt-4 flex flex-wrap gap-2">
              {lesson.tags.map((tag) => (
                <li
                  key={tag}
                  className="rounded-full border border-border px-3 py-1 text-xs text-muted-foreground"
                >
                  {tag}
                </li>
              ))}
            </ul>
          </div>

          {courseModule ? (
            <section className="mt-8 rounded-xl border border-border bg-card p-6">
              <h2 className="text-2xl tracking-wide">Passo a passo</h2>
              <ol className="mt-4 space-y-3">
                {courseModule.steps.map((step, index) => (
                  <li key={step} className="flex gap-3 text-sm text-muted-foreground">
                    <span className="grid size-6 shrink-0 place-items-center rounded-full bg-surface text-xs tabular-nums text-foreground">
                      {index + 1}
                    </span>
                    <span className="pt-0.5">{step}</span>
                  </li>
                ))}
              </ol>
            </section>
          ) : null}
        </div>

        <aside>
          <h2 className="text-2xl tracking-wide">Vídeos relacionados</h2>
          <ul className="mt-4 space-y-4">
            {related.slice(0, 6).map((item) => (
              <li key={item.id}>
                <LessonCard
                  lesson={item}
                  moduleTitle={courseModule?.title ?? ""}
                  progress={progress[item.id]}
                  variant="grid"
                />
              </li>
            ))}
          </ul>
        </aside>
      </div>
    </div>
  );
}
