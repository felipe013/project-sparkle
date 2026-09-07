import { useState, type FormEvent } from "react";
import { useCourse } from "@/lib/course-store";
import { parseYoutubeId, type Lesson, type LessonDraft } from "@/lib/course-types";

export interface LessonFormProps {
  readonly lesson?: Lesson;
  readonly onDone: () => void;
}

const inputClass =
  "w-full rounded-md border border-border bg-surface px-3 py-2 text-sm text-foreground placeholder:text-muted-foreground focus-visible:border-ring focus-visible:outline-none";

export function LessonForm({ lesson, onDone }: LessonFormProps) {
  const { modules, addLesson, updateLesson } = useCourse();
  const [error, setError] = useState<string | null>(null);
  const [url, setUrl] = useState(
    lesson ? `https://www.youtube.com/watch?v=${lesson.youtubeId}` : "",
  );

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const youtubeId = parseYoutubeId(String(data.get("url") ?? ""));

    if (!youtubeId) {
      setError("Cole um link válido do YouTube (ou o ID de 11 caracteres).");
      return;
    }

    const draft: LessonDraft = {
      moduleId: String(data.get("moduleId")),
      title: String(data.get("title")).trim(),
      description: String(data.get("description")).trim(),
      duration: String(data.get("duration")).trim() || "00:00",
      order: Number(data.get("order")) || 1,
      youtubeId,
      tags: String(data.get("tags"))
        .split(",")
        .map((tag) => tag.trim())
        .filter(Boolean),
    };

    if (!draft.title) {
      setError("Informe o título da aula.");
      return;
    }

    if (lesson) updateLesson(lesson.id, draft);
    else addLesson(draft);

    setError(null);
    onDone();
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label htmlFor="url" className="mb-1.5 block text-sm text-muted-foreground">
          URL do YouTube
        </label>
        <input
          id="url"
          name="url"
          value={url}
          onChange={(event) => setUrl(event.target.value)}
          placeholder="https://www.youtube.com/watch?v=..."
          className={inputClass}
        />
        {url && parseYoutubeId(url) ? (
          <p className="mt-1.5 text-xs text-success">Vídeo reconhecido: {parseYoutubeId(url)}</p>
        ) : null}
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        <div>
          <label htmlFor="title" className="mb-1.5 block text-sm text-muted-foreground">
            Título
          </label>
          <input id="title" name="title" defaultValue={lesson?.title} className={inputClass} />
        </div>
        <div>
          <label htmlFor="moduleId" className="mb-1.5 block text-sm text-muted-foreground">
            Módulo
          </label>
          <select
            id="moduleId"
            name="moduleId"
            defaultValue={lesson?.moduleId ?? modules[0]?.id}
            className={inputClass}
          >
            {modules.map((item) => (
              <option key={item.id} value={item.id}>
                {item.title}
              </option>
            ))}
          </select>
        </div>
      </div>

      <div>
        <label htmlFor="description" className="mb-1.5 block text-sm text-muted-foreground">
          Descrição curta
        </label>
        <textarea
          id="description"
          name="description"
          rows={2}
          defaultValue={lesson?.description}
          className={inputClass}
        />
      </div>

      <div className="grid gap-4 sm:grid-cols-3">
        <div>
          <label htmlFor="duration" className="mb-1.5 block text-sm text-muted-foreground">
            Duração
          </label>
          <input
            id="duration"
            name="duration"
            defaultValue={lesson?.duration ?? "10:00"}
            className={inputClass}
          />
        </div>
        <div>
          <label htmlFor="order" className="mb-1.5 block text-sm text-muted-foreground">
            Ordem
          </label>
          <input
            id="order"
            name="order"
            type="number"
            min={1}
            defaultValue={lesson?.order ?? 1}
            className={inputClass}
          />
        </div>
        <div>
          <label htmlFor="tags" className="mb-1.5 block text-sm text-muted-foreground">
            Tags (vírgula)
          </label>
          <input
            id="tags"
            name="tags"
            defaultValue={lesson?.tags.join(", ")}
            placeholder="cintura, calça"
            className={inputClass}
          />
        </div>
      </div>

      {error ? <p className="text-sm text-destructive">{error}</p> : null}

      <div className="flex gap-3">
        <button
          type="submit"
          className="rounded-md bg-primary px-5 py-2.5 text-sm font-semibold text-primary-foreground hover:opacity-90"
        >
          {lesson ? "Salvar alterações" : "Adicionar aula"}
        </button>
        <button
          type="button"
          onClick={onDone}
          className="rounded-md bg-elevated px-5 py-2.5 text-sm font-semibold text-foreground hover:bg-surface"
        >
          Cancelar
        </button>
      </div>
    </form>
  );
}
