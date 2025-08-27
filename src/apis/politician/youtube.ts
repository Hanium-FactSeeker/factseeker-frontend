// /api/youtube/search  키워드 유튜브 검색
export interface YoutubeRawItem {
  url: string;
  videoTitle: string;
  thumbnailUrl: string;
  updatedAt: string;
}
type Wrapped<T> = { success?: boolean; message?: string; data?: T };

// ✅ 백엔드 BASE URL
const API_BASE =
  process.env.NEXT_PUBLIC_API_BASE_URL ??
  process.env.API_BASE_URL ??
  '';

function normalizeResponse(json: any): YoutubeRawItem[] {
  const payload = (json?.data ?? json) as any;
  if (!payload) return [];
  if (Array.isArray(payload)) return payload as YoutubeRawItem[];
  if (payload.url && payload.videoTitle) return [payload as YoutubeRawItem];
  return [];
}

export async function searchYoutubeByKeyword(
  keyword: string,
  options: { signal?: AbortSignal } = {}
): Promise<{ items: { url: string; title: string; thumbnailUrl: string; updatedAt: string }[] }> {
  if (!keyword?.trim()) return { items: [] };

  if (!API_BASE) {
    throw new Error('YOUTUBE_API_BASE_URL_MISSING: set NEXT_PUBLIC_API_BASE_URL');
  }
  const qs = new URLSearchParams({ keyword: keyword.trim() }).toString();
  const url = `${API_BASE}/api/youtube/search?${qs}`;

  const res = await fetch(url, {
    method: 'GET',
    cache: 'no-store',
    headers: { Accept: '*/*' },
    signal: options.signal,
  });

  if (!res.ok) {
    let msg = `YOUTUBE_API_HTTP_${res.status}`;
    try {
      const errJson = await res.json();
      msg = errJson?.message || msg;
    } catch {}
    throw new Error(msg);
  }

  const json: Wrapped<YoutubeRawItem | YoutubeRawItem[]> | YoutubeRawItem | YoutubeRawItem[] = await res.json();
  const rawList = normalizeResponse(json);

  const items = rawList.map((r) => ({
    url: r.url,
    title: r.videoTitle,
    thumbnailUrl: r.thumbnailUrl,
    updatedAt: r.updatedAt,
  }));

  return { items };
}
