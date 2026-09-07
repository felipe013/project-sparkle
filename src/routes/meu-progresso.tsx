import { createFileRoute, Link } from "@tanstack/react-router";
import { LessonCard } from "@/components/course/lesson-card";
import { useContinueWatching, useCourse, useCourseStats } from "@/lib/course-store";
import { useAuth } from "@/hooks/use-auth";
import { CloudCheck, CloudOff } from "lucide-react";

export const Route = createFileRoute("/meu-progresso")({
  head: () => ({
    meta: [
      { title: "Meu progresso — Mestre dos Ajustes" },
      {
        name: "description",
        content:
          "Acompanhe aulas concluídas, aulas em andamento e a porcentagem total do curso de ajustes de roupas.",
      },
      { property: "og:title", content: "Meu progresso — Mestre dos Ajustes" },
      {
        property: "og:description",
        content: "Veja quanto você já concluiu do curso e retome de onde parou.",
      },
    ],
  }),
  component: ProgressPage,
});

function ProgressPage() {
  const { lessons, modules, progress, cloudSynced } = useCourse();
  const { user } = useAuth();
  const stats = useCourseStats();
  const continueWatching = useContinueWatching(24);
  const completed = lessons.filter((item) => progress[item.id]?.completed);

  const cards = [
    { label: "Aulas concluídas", value: String(stats.completed) },
    { label: "Aulas em andamento", value: String(stats.inProgress) },
    { label: "Total de aulas", value: String(stats.total) },
    { label: "Curso concluído", value: `${stats.percent}%` },
  ];

  return (
    <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6">
      <h1 className="text-4xl tracking-wide sm:text-5xl">Meu progresso</h1>

      {user ? (
        <p className="mt-3 inline-flex items-center gap-2 rounded-full border border-border bg-card px-3 py-1.5 text-sm text-muted-foreground">
          <CloudCheck className="size-4 text-success" aria-hidden="true" />
          {cloudSynced
            ? `Progresso salvo na nuvem para ${user.email}`
            : "Sincronizando seu progresso..."}
        </p>
      ) : (
        <p className="mt-3 inline-flex flex-wrap items-center gap-2 rounded-full border border-border bg-card px-3 py-1.5 text-sm text-muted-foreground">
          <CloudOff className="size-4" aria-hidden="true" />
          Progresso salvo só neste aparelho.
          <Link to="/entrar" className="font-semibold text-primary hover:underline">
            Entrar para salvar na nuvem
          </Link>
        </p>
      )}

      <div className="mt-6 h-2 w-full overflow-hidden rounded-full bg-surface">
        <div className="h-full bg-primary transition-all" style={{ width: `${stats.percent}%` }} />
      </div>

      <dl className="mt-6 grid grid-cols-2 gap-4 lg:grid-cols-4">
        {cards.map((card) => (
          <div key={card.label} className="rounded-xl border border-border bg-card p-5">
            <dt className="text-xs uppercase tracking-wider text-muted-foreground">{card.label}</dt>
            <dd className="mt-1 font-display text-4xl tracking-wide">{card.value}</dd>
          </div>
        ))}
      </dl>

      <Section title="Continue assistindo" lessons={continueWatching} modules={modules} progress={progress} />
      <Section title="Aulas concluídas" lessons={completed} modules={modules} progress={progress} />

      {stats.completed === 0 && continueWatching.length === 0 ? (
        <div className="mt-10 rounded-xl border border-border bg-card p-8">
          <h2 className="text-2xl">Você ainda não começou</h2>
          <p className="mt-2 text-sm text-muted-foreground">
            Abra a primeira aula e o progresso passa a ser salvo automaticamente neste navegador.
          </p>
          <Link
            to="/modulos"
            className="mt-4 inline-flex rounded-md bg-primary px-5 py-2.5 text-sm font-semibold text-primary-foreground hover:opacity-90"
          >
            Ver módulos
          </Link>
        </div>
      ) : null}
    </div>
  );
}

interface SectionProps {
  readonly title: string;
  readonly lessons: readonly import("@/lib/course-types").Lesson[];
  readonly modules: readonly import("@/lib/course-types").CourseModule[];
  readonly progress: import("@/lib/course-types").ProgressMap;
}

function Section({ title, lessons, modules, progress }: SectionProps) {
  if (lessons.length === 0) return null;
  return (
    <section className="mt-12">
      <h2 className="text-2xl tracking-wide sm:text-3xl">{title}</h2>
      <ul className="mt-4 grid gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {lessons.map((lesson) => (
          <li key={lesson.id}>
            <LessonCard
              lesson={lesson}
              moduleTitle={modules.find((item) => item.id === lesson.moduleId)?.title ?? ""}
              progress={progress[lesson.id]}
              variant="grid"
            />
          </li>
        ))}
      </ul>
    </section>
  );
}
