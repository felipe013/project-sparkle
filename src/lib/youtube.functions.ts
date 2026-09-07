import { createServerFn } from "@tanstack/react-start";

export interface YoutubeVideo {
  readonly youtubeId: string;
  readonly title: string;
  readonly description: string;
  readonly duration: string;
  readonly channelTitle: string;
}

interface SearchInput {
  readonly query: string;
  readonly maxResults: number;
}

interface SearchItem {
  id?: { videoId?: string };
  snippet?: { title?: string; description?: string; channelTitle?: string };
}

interface DetailItem {
  id?: string;
  contentDetails?: { duration?: string };
}

/** ISO-8601 (PT12M34S) to MM:SS or H:MM:SS. */
function formatDuration(iso: string | undefined): string {
  if (!iso) return "00:00";
  const match = iso.match(/PT(?:(\d+)H)?(?:(\d+)M)?(?:(\d+)S)?/);
  if (!match) return "00:00";
  const hours = Number(match[1] ?? 0);
  const minutes = Number(match[2] ?? 0);
  const seconds = Number(match[3] ?? 0);
  const pad = (value: number) => String(value).padStart(2, "0");
  return hours > 0 ? `${hours}:${pad(minutes)}:${pad(seconds)}` : `${pad(minutes)}:${pad(seconds)}`;
}

function trimText(value: string, max: number): string {
  const clean = value.replace(/\s+/g, " ").trim();
  return clean.length <= max ? clean : `${clean.slice(0, max - 1).trimEnd()}…`;
}

export const searchYoutubeLessons = createServerFn({ method: "POST" })
  .inputValidator((input: SearchInput): SearchInput => {
    const query = String(input?.query ?? "").trim();
    if (!query) throw new Error("Informe o que buscar no YouTube.");
    const maxResults = Math.max(1, Math.min(25, Math.round(Number(input?.maxResults) || 12)));
    return { query, maxResults };
  })
  .handler(async ({ data }): Promise<{ videos: YoutubeVideo[]; error?: string }> => {
    const apiKey = process.env["YOUTUBE_API_KEY"];
    if (!apiKey) return { videos: [], error: "A chave da YouTube Data API não está configurada." };

    const searchUrl = new URL("https://www.googleapis.com/youtube/v3/search");
    searchUrl.searchParams.set("part", "snippet");
    searchUrl.searchParams.set("type", "video");
    searchUrl.searchParams.set("videoEmbeddable", "true");
    searchUrl.searchParams.set("relevanceLanguage", "pt");
    searchUrl.searchParams.set("regionCode", "BR");
    searchUrl.searchParams.set("maxResults", String(data.maxResults));
    searchUrl.searchParams.set("q", data.query);
    searchUrl.searchParams.set("key", apiKey);

    const searchResponse = await fetch(searchUrl);
    if (!searchResponse.ok) {
      const body = await searchResponse.text();
      console.error(`YouTube search failed [${searchResponse.status}]: ${body}`);
      return { videos: [], error: "A busca no YouTube falhou. Verifique a chave da API." };
    }

    const searchJson = (await searchResponse.json()) as { items?: SearchItem[] };
    const items = (searchJson.items ?? []).filter((item) => item.id?.videoId);
    if (items.length === 0) return { videos: [] };

    const ids = items.map((item) => item.id!.videoId!).join(",");
    const detailUrl = new URL("https://www.googleapis.com/youtube/v3/videos");
    detailUrl.searchParams.set("part", "contentDetails");
    detailUrl.searchParams.set("id", ids);
    detailUrl.searchParams.set("key", apiKey);

    const durations = new Map<string, string>();
    const detailResponse = await fetch(detailUrl);
    if (detailResponse.ok) {
      const detailJson = (await detailResponse.json()) as { items?: DetailItem[] };
      for (const item of detailJson.items ?? []) {
        if (item.id) durations.set(item.id, formatDuration(item.contentDetails?.duration));
      }
    }

    return {
      videos: items.map((item) => ({
        youtubeId: item.id!.videoId!,
        title: trimText(item.snippet?.title ?? "Aula", 90),
        description: trimText(item.snippet?.description ?? "", 160),
        duration: durations.get(item.id!.videoId!) ?? "00:00",
        channelTitle: item.snippet?.channelTitle ?? "",
      })),
    };
  });
