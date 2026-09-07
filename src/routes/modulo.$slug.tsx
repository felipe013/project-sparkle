import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { LessonCard } from "@/components/course/lesson-card";
import { useCourse } from "@/lib/course-store";
import { COURSE_MODULES } from "@/lib/course-seed";

export const Route = createFileRoute("/modulo/$slug")({
  loader: ({ params }) => {
    const found = COURSE_MODULES.find((item) => item.slug === params.slug);
    if (!found) throw notFound();
    return { title: found.title, tagline: found.tagline };
  },
  head: ({ loaderData }) => {
    if (!loaderData) {
      return { meta: [{ title: "Módulo não encontrado" }, { name: "robots", content: "noindex" }] };
    }
    return {
      meta: [
        { title: `${loaderData.title} — Mestre dos Ajustes` },
        { name: "description", content: loaderData.tagline },
        { property: "og:title", content: `${loaderData.title} — Mestre dos Ajustes` },
        { property: "og:description", content: loaderData.tagline },
      ],
    };
  },
  component: ModulePage,
});

function ModulePage() {
  const { slug } = Route.useParams();
  const { getModule, lessonsOfModule, progress } = useCourse();
  const courseModule = getModule(slug);
  const lessons = lessonsOfModule(slug);

  if (!courseModule) return null;

  const done = lessons.filter((item) => progress[item.id]?.completed).length;
  const percent = lessons.length ? Math.round((done / lessons.length) * 100) : 0;

  return (
    <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6">
      <Link to="/modulos" className="text-sm text-muted-foreground hover:text-foreground">
        ← Todos os módulos
      </Link>

      <div className="mt-4 grid gap-6 lg:grid-cols-[minmax(0,1fr)_320px] lg:items-start">
        <div>
          <p className="text-xs uppercase tracking-[0.2em] text-primary">
            Módulo {String(courseModule.order).padStart(2, "0")}
          </p>
          <h1 className="mt-2 text-4xl tracking-wide sm:text-5xl">{courseModule.title}</h1>
          <p className="mt-3 max-w-2xl text-sm text-muted-foreground sm:text-base">
            {courseModule.tagline}
          </p>
        </div>

        <aside className="rounded-xl border border-border bg-card p-5">
          <p className="text-sm text-muted-foreground">Seu progresso no módulo</p>
          <p className="mt-1 font-display text-4xl tracking-wide">{percent}%</p>
          <div className="mt-3 h-1.5 w-full overflow-hidden rounded-full bg-surface">
            <div className="h-full bg-primary" style={{ width: `${percent}%` }} />
          </div>
          <p className="mt-2 text-xs text-muted-foreground">
            {done} de {lessons.length} aulas concluídas
          </p>

          <h2 className="mt-6 text-lg">Passo a passo do módulo</h2>
          <ol className="mt-2 space-y-2 text-sm text-muted-foreground">
            {courseModule.steps.map((step, index) => (
              <li key={step} className="flex gap-2">
                <span className="text-primary tabular-nums">{index + 1}.</span>
                <span>{step}</span>
              </li>
            ))}
          </ol>
        </aside>
      </div>

      <ul className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {lessons.map((lesson) => (
          <li key={lesson.id}>
            <LessonCard
              lesson={lesson}
              moduleTitle={courseModule.title}
              progress={progress[lesson.id]}
              variant="grid"
            />
          </li>
        ))}
      </ul>
    </div>
  );
}
