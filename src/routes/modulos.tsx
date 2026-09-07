import { createFileRoute, Link } from "@tanstack/react-router";
import { ChevronRight } from "lucide-react";
import { useCourse } from "@/lib/course-store";
import { youtubeThumbnail } from "@/lib/course-types";

export const Route = createFileRoute("/modulos")({
  head: () => ({
    meta: [
      { title: "Módulos do curso — Mestre dos Ajustes" },
      {
        name: "description",
        content:
          "Todos os módulos do Curso Completo de Ajustes e Reformas de Roupas: cintura, laterais, mangas, barras, encurtar peças, zíper, reforma, acabamentos e precificação.",
      },
      { property: "og:title", content: "Módulos do curso — Mestre dos Ajustes" },
      {
        property: "og:description",
        content: "Navegue por todos os módulos de vídeoaulas de ajustes e reformas de roupas.",
      },
    ],
  }),
  component: ModulesPage,
});

function ModulesPage() {
  const { modules, lessonsOfModule, progress } = useCourse();

  return (
    <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6">
      <h1 className="text-4xl tracking-wide sm:text-5xl">Todos os módulos</h1>
      <p className="mt-2 max-w-2xl text-sm text-muted-foreground">
        Doze módulos organizados na ordem em que uma peça chega no ateliê: diagnóstico, ajuste,
        acabamento e correção.
      </p>

      <ul className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {modules.map((item) => {
          const lessons = lessonsOfModule(item.id);
          const done = lessons.filter((lesson) => progress[lesson.id]?.completed).length;
          const percent = lessons.length ? Math.round((done / lessons.length) * 100) : 0;
          const cover = lessons[0];

          return (
            <li key={item.id}>
              <Link
                to="/modulo/$slug"
                params={{ slug: item.slug }}
                className="group block overflow-hidden rounded-xl border border-border bg-card shadow-[var(--shadow-card)] transition-all hover:-translate-y-1 hover:border-primary/60 hover:shadow-[var(--shadow-hover)]"
              >
                <div className="relative aspect-video overflow-hidden bg-surface">
                  {cover ? (
                    <img
                      src={youtubeThumbnail(cover.youtubeId)}
                      alt=""
                      aria-hidden="true"
                      loading="lazy"
                      width={480}
                      height={360}
                      className="size-full object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                  ) : null}
                  <span className="absolute left-3 top-3 rounded bg-background/85 px-2 py-0.5 text-xs tabular-nums">
                    Módulo {String(item.order).padStart(2, "0")}
                  </span>
                </div>

                <div className="p-5">
                  <h2 className="text-2xl leading-tight">{item.title}</h2>
                  <p className="mt-2 line-clamp-2 text-sm text-muted-foreground">{item.tagline}</p>

                  <div className="mt-4">
                    <div className="h-1.5 w-full overflow-hidden rounded-full bg-surface">
                      <div className="h-full bg-primary" style={{ width: `${percent}%` }} />
                    </div>
                    <p className="mt-2 flex items-center justify-between text-xs text-muted-foreground">
                      <span>
                        {done}/{lessons.length} aulas
                      </span>
                      <span className="inline-flex items-center gap-1 text-foreground">
                        Abrir
                        <ChevronRight className="size-3.5" aria-hidden="true" />
                      </span>
                    </p>
                  </div>
                </div>
              </Link>
            </li>
          );
        })}
      </ul>
    </div>
  );
}
