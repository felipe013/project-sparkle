import { createFileRoute } from "@tanstack/react-router";
import { LessonCard } from "@/components/course/lesson-card";
import { useCourse } from "@/lib/course-store";

interface SearchParams {
  readonly q: string;
}

export const Route = createFileRoute("/buscar")({
  validateSearch: (search: Record<string, unknown>): SearchParams => ({
    q: typeof search.q === "string" ? search.q : "",
  }),
  head: () => ({
    meta: [
      { title: "Buscar aulas — Mestre dos Ajustes" },
      {
        name: "description",
        content:
          "Encontre aulas por título, módulo, técnica de costura ou tipo de roupa dentro do curso.",
      },
      { property: "og:title", content: "Buscar aulas — Mestre dos Ajustes" },
      {
        property: "og:description",
        content: "Busque vídeoaulas por técnica, peça de roupa ou módulo do curso.",
      },
    ],
  }),
  component: SearchPage,
});

function normalize(value: string): string {
  return value
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "");
}

function SearchPage() {
  const { q } = Route.useSearch();
  const { lessons, modules, progress } = useCourse();

  const term = normalize(q.trim());
  const results = term
    ? lessons.filter((lesson) => {
        const moduleTitle = modules.find((item) => item.id === lesson.moduleId)?.title ?? "";
        const haystack = normalize(
          [lesson.title, lesson.description, moduleTitle, lesson.tags.join(" ")].join(" "),
        );
        return term.split(/\s+/).every((word) => haystack.includes(word));
      })
    : [];

  return (
    <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6">
      <h1 className="text-4xl tracking-wide sm:text-5xl">Resultados da busca</h1>
      <p className="mt-2 text-sm text-muted-foreground">
        {q.trim()
          ? `${results.length} aula(s) para “${q.trim()}”`
          : "Digite um título, módulo, técnica ou tipo de roupa na barra de pesquisa."}
      </p>

      {results.length > 0 ? (
        <ul className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {results.map((lesson) => (
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
      ) : null}

      {q.trim() && results.length === 0 ? (
        <div className="mt-10 rounded-xl border border-border bg-card p-8">
          <h2 className="text-2xl">Nada encontrado</h2>
          <p className="mt-2 text-sm text-muted-foreground">
            Tente termos como “cintura”, “barra”, “zíper”, “vestido” ou “jeans”.
          </p>
        </div>
      ) : null}
    </div>
  );
}
