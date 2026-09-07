import { createFileRoute, Link } from "@tanstack/react-router";
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
          "Aulas de ajuste de cintura, laterais, mangas, barras, encurtar calças, vestidos e saias, troca de zíper, reforma de peças, acabamentos e como cobrar.",
      },
      { property: "og:title", content: "Mestre dos Ajustes — Aulas de ajustes de roupas" },
      {
        property: "og:description",
        content:
          "Dezenas de vídeoaulas de costura e ajustes, do primeiro alfinete ao acabamento profissional, com progresso salvo por aluno.",
      },
    ],
  }),
  component: HomePage,
});

function HomePage() {
  const { modules, lessonsOfModule, lessons, progress } = useCourse();
  const continueWatching = useContinueWatching();

  // Uma aula de abertura por módulo, para dar um panorama do curso inteiro.
  const highlights = modules
    .map((item) => lessonsOfModule(item.id)[0])
    .filter((item): item is NonNullable<typeof item> => Boolean(item));
  const completedLessons = lessons.filter((item) => progress[item.id]?.completed).slice(0, 12);

  return (
    <div className="pb-8">
      <HeroBanner lessonId={FEATURED_LESSON_ID} />

      <div className="-mt-12 relative z-10">
        <LessonRow
          title="Continue assistindo"
          subtitle="Retome de onde você parou"
          lessons={continueWatching}
        />

        <LessonRow
          title="Destaques do curso"
          subtitle="Uma aula de abertura de cada módulo"
          lessons={highlights}
        />


        <LessonRow
          title="Aulas concluídas"
          subtitle="Reveja quando precisar"
          lessons={completedLessons}
        />

        <section className="mx-auto max-w-7xl px-4 pt-10 sm:px-6">
          <h2 className="text-3xl tracking-wide">Todos os módulos</h2>
          <p className="mt-1 text-sm text-muted-foreground">
            {modules.length} módulos · {lessons.length} aulas no total
          </p>
          <div className="mt-4 flex flex-wrap gap-2">
            {modules.map((item) => (
              <Link
                key={item.id}
                to="/modulo/$slug"
                params={{ slug: item.slug }}
                className="rounded-full border border-border bg-card px-3.5 py-1.5 text-sm text-muted-foreground transition-colors hover:border-primary hover:text-foreground"
              >
                {item.title}
              </Link>
            ))}
          </div>
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
