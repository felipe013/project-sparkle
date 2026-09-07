import { useState } from "react";
import { createFileRoute } from "@tanstack/react-router";
import { Pencil, Plus, RotateCcw, Trash2 } from "lucide-react";
import { LessonForm } from "@/components/course/lesson-form";
import { useCourse } from "@/lib/course-store";
import { youtubeThumbnail } from "@/lib/course-types";

export const Route = createFileRoute("/admin")({
  head: () => ({
    meta: [
      { title: "Painel administrativo — Mestre dos Ajustes" },
      {
        name: "description",
        content:
          "Adicione, edite, reordene e remova as vídeoaulas do curso a partir de links públicos do YouTube.",
      },
      { name: "robots", content: "noindex" },
      { property: "og:title", content: "Painel administrativo — Mestre dos Ajustes" },
      { property: "og:description", content: "Gestão das vídeoaulas do curso." },
    ],
  }),
  component: AdminPage,
});

function AdminPage() {
  const { modules, lessons, lessonsOfModule, removeLesson, resetLessons } = useCourse();
  const [moduleId, setModuleId] = useState(modules[0]?.id ?? "");
  const [editingId, setEditingId] = useState<string | null>(null);
  const [creating, setCreating] = useState(false);

  const rows = lessonsOfModule(moduleId);
  const editing = lessons.find((item) => item.id === editingId);

  return (
    <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6">
      <div className="grid grid-cols-[minmax(0,1fr)_auto] items-start gap-4">
        <div className="min-w-0">
          <h1 className="text-4xl tracking-wide sm:text-5xl">Painel administrativo</h1>
          <p className="mt-2 max-w-2xl text-sm text-muted-foreground">
            Cadastre aulas colando o link público do YouTube. Os vídeos continuam hospedados no
            YouTube e são exibidos pelo player oficial.
          </p>
        </div>
        <button
          type="button"
          onClick={resetLessons}
          className="inline-flex shrink-0 items-center gap-2 rounded-md bg-elevated px-4 py-2 text-sm text-foreground hover:bg-surface"
        >
          <RotateCcw className="size-4" aria-hidden="true" />
          Restaurar exemplo
        </button>
      </div>

      <div className="mt-8 rounded-xl border border-border bg-card p-5">
        <div className="grid grid-cols-[minmax(0,1fr)_auto] items-end gap-4 sm:flex sm:justify-between">
          <div className="min-w-0">
            <label htmlFor="modulo" className="mb-1.5 block text-sm text-muted-foreground">
              Módulo
            </label>
            <select
              id="modulo"
              value={moduleId}
              onChange={(event) => setModuleId(event.target.value)}
              className="w-full rounded-md border border-border bg-surface px-3 py-2 text-sm sm:w-80"
            >
              {modules.map((item) => (
                <option key={item.id} value={item.id}>
                  {item.title}
                </option>
              ))}
            </select>
          </div>
          <button
            type="button"
            onClick={() => {
              setEditingId(null);
              setCreating(true);
            }}
            className="inline-flex shrink-0 items-center gap-2 rounded-md bg-primary px-4 py-2 text-sm font-semibold text-primary-foreground hover:opacity-90"
          >
            <Plus className="size-4" aria-hidden="true" />
            Nova aula
          </button>
        </div>

        {creating || editing ? (
          <div className="mt-6 border-t border-border pt-6">
            <h2 className="mb-4 text-2xl">{editing ? "Editar aula" : "Nova aula"}</h2>
            <LessonForm
              key={editing?.id ?? "new"}
              lesson={editing}
              onDone={() => {
                setCreating(false);
                setEditingId(null);
              }}
            />
          </div>
        ) : null}
      </div>

      <ul className="mt-8 space-y-3">
        {rows.map((lesson) => (
          <li
            key={lesson.id}
            className="grid grid-cols-[auto_minmax(0,1fr)_auto] items-center gap-4 rounded-xl border border-border bg-card p-3"
          >
            <img
              src={youtubeThumbnail(lesson.youtubeId)}
              alt=""
              aria-hidden="true"
              loading="lazy"
              width={480}
              height={360}
              className="hidden h-16 w-28 shrink-0 rounded-md object-cover sm:block"
            />
            <div className="min-w-0">
              <p className="truncate text-base text-foreground">
                <span className="tabular-nums text-muted-foreground">{lesson.order}. </span>
                {lesson.title}
              </p>
              <p className="truncate text-xs text-muted-foreground">
                {lesson.duration} · {lesson.youtubeId} · {lesson.tags.join(", ")}
              </p>
            </div>
            <div className="flex shrink-0 gap-2">
              <button
                type="button"
                aria-label={`Editar ${lesson.title}`}
                onClick={() => {
                  setCreating(false);
                  setEditingId(lesson.id);
                }}
                className="rounded-md bg-elevated p-2 text-foreground hover:bg-surface"
              >
                <Pencil className="size-4" aria-hidden="true" />
              </button>
              <button
                type="button"
                aria-label={`Excluir ${lesson.title}`}
                onClick={() => removeLesson(lesson.id)}
                className="rounded-md bg-elevated p-2 text-destructive hover:bg-surface"
              >
                <Trash2 className="size-4" aria-hidden="true" />
              </button>
            </div>
          </li>
        ))}
      </ul>

      <section className="mt-10 rounded-xl border border-dashed border-border p-6">
        <h2 className="text-2xl">Busca automática no YouTube</h2>
        <p className="mt-2 max-w-3xl text-sm text-muted-foreground">
          A estrutura já está preparada para a YouTube Data API: quando a chave for configurada,
          este espaço passa a pesquisar vídeos por palavra-chave e preencher título, duração e
          miniatura automaticamente. Por enquanto, o cadastro é feito colando a URL.
        </p>
        <input
          disabled
          placeholder="Pesquisar vídeos no YouTube (em breve)"
          className="mt-4 w-full max-w-md rounded-md border border-border bg-surface px-3 py-2 text-sm text-muted-foreground opacity-60 sm:w-96"
        />
      </section>
    </div>
  );
}
