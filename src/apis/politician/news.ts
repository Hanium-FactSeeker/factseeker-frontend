import apiClient from '../apiClient';

export type NewsSort = 'sim' | 'date';

export interface RawNewsItem {
  title: string;
  link: string;
  description: string;
  pubDate: string;
}

export interface RawNewsPayload {
  lastBuildDate: string;
  total: number;
  start: number;
  display: number;
  items: RawNewsItem[];
}

export interface NewsApiSuccess {
  success: true;
  message: string;
  data: RawNewsPayload;
}

export interface NewsApiError {
  success: false;
  message: string;
}

export type NewsApiResponse = NewsApiSuccess | NewsApiError;

const API_PATH = '/news';

function stripTags(html = '') {
  const text = html.replace(/<[^>]*>/g, '');
  return text
    .replace(/&quot;/g, '"')
    .replace(/&#39;|&apos;/g, "'")
    .replace(/&amp;/g, '&')
    .replace(/&lt;/g, '<')
    .replace(/&gt;/g, '>')
    .replace(/&nbsp;/g, ' ');
}

export interface NewsItem {
  title: string;
  description: string;
  link: string;
  pubDate: string;
}

export async function searchNewsByKeyword(
  query: string,
  options: {
    start?: number;
    display?: number;
    sort?: NewsSort;
    signal?: AbortSignal;
  } = {},
): Promise<{
  items: NewsItem[];
  total: number;
  start: number;
  display: number;
  lastBuildDate: string;
}> {
  if (!query?.trim()) {
    return {
      items: [],
      total: 0,
      start: 1,
      display: options.display ?? 10,
      lastBuildDate: '',
    };
  }

  const { start = 1, display = 10, sort = 'date', signal } = options;

  const params = {
    query: query.trim(),
    start: String(start),
    display: String(display),
    sort,
  } as const;

  try {
    const res = await apiClient.get<NewsApiResponse>(API_PATH, {
      params,
      signal,
      headers: { Accept: '*/*' },
    });

    const json = res.data;

    if (!('success' in json) || !json.success) {
      throw new Error((json as any)?.message || 'NEWS_API_FAILED');
    }

    const { data } = json;

    const items: NewsItem[] = (data.items || []).map((it) => ({
      title: stripTags(it.title),
      description: stripTags(it.description),
      link: it.link,
      pubDate: it.pubDate,
    }));

    return {
      items,
      total: data.total,
      start: data.start,
      display: data.display,
      lastBuildDate: data.lastBuildDate,
    };
  } catch (err: any) {
    const status = err?.response?.status;
    const msg =
      err?.response?.data?.message ||
      err?.message ||
      (status ? `NEWS_API_HTTP_${status}` : 'NEWS_API_FAILED');
    throw new Error(msg);
  }
}
