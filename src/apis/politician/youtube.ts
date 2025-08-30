import apiClient from '../apiClient';

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

  try {
    const res = await apiClient.get<Wrapped<YoutubeRawItem | YoutubeRawItem[]>>(
      API_PATH,
      {
        params: { keyword: keyword.trim() },
        signal: options.signal, // Axios v1부터 AbortSignal 지원
        headers: { Accept: '*/*' },
      },
    );

    const json = res.data;

    // Wrapped 형태에서 success=false면 메시지 보여주기
    if (json && typeof json === 'object' && 'success' in json) {
      const w = json as Wrapped<unknown>;
      if (w.success === false) {
        throw new Error(w.message || 'YOUTUBE_API_FAILED');
      }
    }

    const rawList = normalizeResponse(json);
    const items = rawList.map((r) => ({
      url: r.url,
      title: r.videoTitle,
      thumbnailUrl: r.thumbnailUrl,
      updatedAt: r.updatedAt,
    }));

    return { items };
  } catch (err: any) {
    const status = err?.response?.status;
    const msg =
      err?.response?.data?.message ||
      err?.message ||
      (status ? `YOUTUBE_API_HTTP_${status}` : 'YOUTUBE_API_FAILED');
    throw new Error(msg);
  }
}
