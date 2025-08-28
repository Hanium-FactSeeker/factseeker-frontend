// /api/news  키워드 뉴스 검색
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

const API_PATH = '/api/news';

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

  const params = new URLSearchParams({
    query: query.trim(),
    start: String(start),
    display: String(display),
    sort,
  });

  if (!API_PATH) {
    throw new Error('NEWS_API_BASE_URL_MISSING: set NEXT_PUBLIC_API_BASE_URL');
  }
  const url = `${API_PATH}?${params.toString()}`;

  const res = await fetch(url, {
    method: 'GET',
    cache: 'no-store',
    headers: { Accept: '*/*' },
    signal,
  });
  if (!res.ok) throw new Error(`NEWS_API_HTTP_${res.status}`);

  const json: NewsApiResponse = await res.json();
  if (!('success' in json) || !json.success)
    throw new Error((json as any)?.message || 'NEWS_API_FAILED');

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
}
