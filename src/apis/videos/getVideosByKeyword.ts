'use client';

import apiClient from '@/apis/apiClient';
import type { VideoItem } from '@/types/videos';

type RawVideo = {
  url: string;
  videoTitle: string;
  thumbnailUrl: string;
  channelName: string;
  updatedAt?: string;
};

/** 유튜브 URL에서 videoId 추출 */
function extractVideoId(url: string): string {
  try {
    const u = new URL(url);
    const v = u.searchParams.get('v');
    if (v) return v;
    return url;
  } catch {
    return url;
  }
}

/** 서버 응답 정규화 */
function normalize(raw: RawVideo): VideoItem {
  const id = extractVideoId(raw.url);
  return {
    id,
    title: raw.videoTitle,
    thumbnail: raw.thumbnailUrl,
    url: raw.url,
    channelName: raw.channelName,
    link: `https://www.youtube.com/watch?v=${id}`,
  };
}

/** 키워드로 연관 영상 검색 */
export async function getVideosByKeyword(
  keyword: string,
): Promise<VideoItem[]> {
  if (!keyword) return [];

  const url = `/youtube/search`;
  const res = await apiClient.get(url, {
    params: { keyword },
    headers: { Accept: 'application/json' },
    withCredentials: true,
  });

  const payload = (res.data?.data ?? res.data) as RawVideo[] | undefined;
  const list = Array.isArray(payload) ? payload : [];

  return list.map(normalize);
}
