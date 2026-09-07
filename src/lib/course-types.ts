/** Domain types for the course platform. Kept free of React/browser deps. */

export interface CourseModule {
  readonly id: string;
  readonly slug: string;
  readonly title: string;
  readonly tagline: string;
  /** Reusable step-by-step template shown on every lesson of the module. */
  readonly steps: readonly string[];
}

export interface Lesson {
  readonly id: string;
  readonly moduleId: string;
  readonly title: string;
  readonly description: string;
  /** YouTube video id used by the official embed player. */
  readonly youtubeId: string;
  /** Human readable duration, e.g. "12:40". */
  readonly duration: string;
  /** Position inside the module (1-based). */
  readonly order: number;
  /** Free-text tags: technique, garment type, difficulty. */
  readonly tags: readonly string[];
}

export interface LessonProgress {
  /** 0-100 watched percentage. */
  readonly percent: number;
  readonly completed: boolean;
  readonly updatedAt: number;
}

export type ProgressMap = Readonly<Record<string, LessonProgress>>;

export type LessonDraft = Omit<Lesson, "id">;

export function youtubeThumbnail(youtubeId: string): string {
  return `https://i.ytimg.com/vi/${youtubeId}/hqdefault.jpg`;
}

export function youtubeEmbedUrl(youtubeId: string): string {
  return `https://www.youtube-nocookie.com/embed/${youtubeId}?rel=0&modestbranding=1`;
}

/** Accepts full URLs (watch, youtu.be, shorts, embed) or a bare 11-char id. */
export function parseYoutubeId(input: string): string | null {
  const value = input.trim();
  if (!value) return null;
  if (/^[\w-]{11}$/.test(value)) return value;

  const patterns = [
    /[?&]v=([\w-]{11})/,
    /youtu\.be\/([\w-]{11})/,
    /\/embed\/([\w-]{11})/,
    /\/shorts\/([\w-]{11})/,
    /\/live\/([\w-]{11})/,
  ];

  for (const pattern of patterns) {
    const match = value.match(pattern);
    if (match?.[1]) return match[1];
  }
  return null;
}
