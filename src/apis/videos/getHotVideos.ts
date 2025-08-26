'use client';

import apiClient from '@/apis/apiClient';
import type { VideoItem } from '@/types/videos';

interface ApiItem {
  videoId: string;
  videoTitle: string;
  thumbnailUrl: string;
}
interface ApiResp {
  success: boolean;
  message: string;
  data: { data: ApiItem[]; timestamp: string };
}

/** 인기 정치 영상 조회 */
export async function getHotVideos(size = 10): Promise<VideoItem[]> {
  const res = await apiClient.get<ApiResp>('/api/youtube/videos', {
    params: { size },
    headers: { Accept: 'application/json' },
    withCredentials: true,
  });
  const list = res.data?.data?.data ?? [];

  return list.map(
    (v): VideoItem => ({
      id: v.videoId,
      title: v.videoTitle,
      thumbnail: v.thumbnailUrl,
      link: `https://www.youtube.com/watch?v=${v.videoId}`,
    }),
  );
}
