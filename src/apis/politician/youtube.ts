export interface YoutubeRawItem {
  url: string;
  videoTitle: string;
  thumbnailUrl: string;
  updatedAt: string;
}

type Wrapped<T> = { success?: boolean; message?: string; data?: T };

const API_PATH = '/youtube/search';

function normalizeResponse(json: unknown): YoutubeRawItem[] {
  const payload =
    (json as Wrapped<YoutubeRawItem | YoutubeRawItem[]>)?.data ?? json;

  if (!payload) return [];
  if (Array.isArray(payload)) return payload as YoutubeRawItem[];
  const it = payload as YoutubeRawItem;
  if (it?.url && it?.videoTitle) return [it];
  return [];
}

export async function searchYoutubeByKeyword(
  keyword: string,
  options: { signal?: AbortSignal } = {},
): Promise<{
  items: {
    url: string;
    title: string;
    thumbnailUrl: string;
    updatedAt: string;
  }[];
}> {
  if (!keyword?.trim()) return { items: [] };

  const qs = new URLSearchParams({ keyword: keyword.trim() }).toString();
  const url = `${API_PATH}?${qs}`;

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
      if (typeof errJson?.message === 'string') msg = errJson.message;
    } catch {
      /* ignore parse error */
    }
    throw new Error(msg);
  }

  const json = await res.json();
  // Wrapped 형태에서 success=false면 메시지 보여주기
  if (typeof json === 'object' && json && 'success' in (json as any)) {
    const w = json as Wrapped<unknown>;
    if (w.success === false) throw new Error(w.message || 'YOUTUBE_API_FAILED');
  }

  const rawList = normalizeResponse(json);
  const items = rawList.map((r) => ({
    url: r.url,
    title: r.videoTitle,
    thumbnailUrl: r.thumbnailUrl,
    updatedAt: r.updatedAt,
  }));

  return { items };
}
