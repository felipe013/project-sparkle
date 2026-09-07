import { createFileRoute } from "@tanstack/react-router";
import { HeroBanner } from "@/components/course/hero-banner";
import { LessonRow } from "@/components/course/lesson-row";
import { useContinueWatching, useCourse } from "@/lib/course-store";
import { FEATURED_LESSON_ID } from "@/lib/course-seed";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Mestre dos Ajustes — Curso Completo de Ajustes e Reformas de Roupas" },
      {
        name: "description",
        content:
          "Assista às aulas do Curso Completo de Ajustes e Reformas de Roupas: 12 módulos sobre cintura, mangas, barras, zíperes e acabamentos.",
      },
      { property: "og:title", content: "Mestre dos Ajustes — Aulas de ajustes de roupas" },
      {
        property: "og:description",
        content: "12 módulos de vídeoaulas de costura e ajustes, com progresso salvo por aluno.",
      },
    ],
  }),
  component: HomePage,
});

function HomePage() {
  const { modules, lessonsOfModule, lessons, progress } = useCourse();
  const continueWatching = useContinueWatching();

  const newest = [...lessons].slice(0, 12);
  const completedLessons = lessons.filter((item) => progress[item.id]?.completed).slice(0, 12);

  return (
    <div className="pb-8">
      <HeroBanner lessonId={FEATURED_LESSON_ID} />

      <div className="-mt-12 relative z-10">
        <LessonRow
          title="Continue assistindo"
          subtitle={
            continueWatching.length > 0
              ? "Retome de onde você parou"
              : undefined
          }
          lessons={continueWatching}
        />

        <LessonRow
          title="Comece por aqui"
          subtitle="As primeiras aulas do curso"
          lessons={newest}
          moduleSlug={modules[0]?.slug}
        />

        <LessonRow
          title="Aulas concluídas"
          subtitle="Reveja quando precisar"
          lessons={completedLessons}
        />

        <section className="mx-auto max-w-7xl px-4 pt-10 sm:px-6">
          <h2 className="text-3xl tracking-wide">Todos os módulos</h2>
        </section>

        {modules.map((item) => (
          <LessonRow
            key={item.id}
            title={item.title}
            subtitle={item.tagline}
            lessons={lessonsOfModule(item.id)}
            moduleSlug={item.slug}
          />
        ))}
      </div>
    </div>
  );
}
