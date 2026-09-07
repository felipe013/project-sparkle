import { useState } from "react";
import { useServerFn } from "@tanstack/react-start";
import { createFileRoute } from "@tanstack/react-router";
import { Pencil, Plus, RotateCcw, Trash2, Sparkles } from "lucide-react";
import { LessonForm } from "@/components/course/lesson-form";
import { useCourse } from "@/lib/course-store";
import { youtubeThumbnail } from "@/lib/course-types";
import { searchYoutubeLessons } from "@/lib/youtube.functions";

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

      <AutoImportPanel moduleId={moduleId} />
    </div>
  );
}

/** Fills a module with lessons found automatically on YouTube. */
function AutoImportPanel({ moduleId }: { moduleId: string }) {
  const { modules, replaceModuleLessons } = useCourse();
  const search = useServerFn(searchYoutubeLessons);
  const currentModule = modules.find((item) => item.id === moduleId);
  const [term, setTerm] = useState("");
  const [count, setCount] = useState(12);
  const [busy, setBusy] = useState(false);
  const [status, setStatus] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  async function handleImport() {
    if (!currentModule) return;
    setBusy(true);
    setStatus(null);
    setError(null);

    const query = term.trim() || `${currentModule.title} costura ajuste de roupas aula`;
    const result = await search({ data: { query, maxResults: count } });

    setBusy(false);
    if (result.error) {
      setError(result.error);
      return;
    }
    if (result.videos.length === 0) {
      setError("Nenhum vídeo encontrado para essa busca.");
      return;
    }

    replaceModuleLessons(
      moduleId,
      result.videos.map((video, index) => ({
        moduleId,
        title: video.title,
        description: video.description || currentModule.tagline,
        youtubeId: video.youtubeId,
        duration: video.duration,
        order: index + 1,
        tags: [currentModule.title],
      })),
    );
    setStatus(`${result.videos.length} aulas importadas para ${currentModule.title}.`);
  }

  return (
    <section className="mt-10 rounded-xl border border-border bg-card p-6">
      <h2 className="flex items-center gap-2 text-2xl">
        <Sparkles className="size-5 text-primary" aria-hidden="true" />
        Buscar aulas automaticamente
      </h2>
      <p className="mt-2 max-w-3xl text-sm text-muted-foreground">
        Procuramos vídeos públicos no YouTube sobre o tema do módulo e preenchemos título,
        descrição, duração e miniatura. As aulas atuais deste módulo são substituídas.
      </p>

      <div className="mt-4 flex flex-wrap items-end gap-3">
        <div className="min-w-60 flex-1">
          <label htmlFor="busca-yt" className="mb-1.5 block text-sm text-muted-foreground">
            Busca (opcional)
          </label>
          <input
            id="busca-yt"
            value={term}
            onChange={(event) => setTerm(event.target.value)}
            placeholder={
              currentModule ? `${currentModule.title} costura ajuste de roupas aula` : "Buscar"
            }
            className="w-full rounded-md border border-border bg-surface px-3 py-2 text-sm"
          />
        </div>
        <div>
          <label htmlFor="qtd-yt" className="mb-1.5 block text-sm text-muted-foreground">
            Quantidade
          </label>
          <input
            id="qtd-yt"
            type="number"
            min={1}
            max={25}
            value={count}
            onChange={(event) => setCount(Number(event.target.value))}
            className="w-24 rounded-md border border-border bg-surface px-3 py-2 text-sm"
          />
        </div>
        <button
          type="button"
          onClick={() => void handleImport()}
          disabled={busy}
          className="rounded-md bg-primary px-4 py-2 text-sm font-semibold text-primary-foreground hover:opacity-90 disabled:opacity-60"
        >
          {busy ? "Buscando..." : "Buscar e preencher módulo"}
        </button>
      </div>

      {error ? (
        <p role="alert" className="mt-3 text-sm text-destructive">
          {error}
        </p>
      ) : null}
      {status ? <p className="mt-3 text-sm text-success">{status}</p> : null}
    </section>
  );
}
