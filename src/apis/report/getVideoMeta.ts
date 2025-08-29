'use client';

import apiClient from '@/apis/apiClient';

export type YoutubeMeta = {
  videoId: string;
  videoTitle: string;
  thumbnailUrl: string;
  channelId?: string;
  channelTitle?: string;
};

type ApiResp = {
  success: boolean;
  message?: string;
  data?: YoutubeMeta;
};

/**
 * `videoId`로 백엔드 `/api/youtube/video` 엔드포인트를 호출하여
 * 유튜브 메타 정보(제목/썸네일/채널 등)를 가져옵니다.
 *
 * - 성공 시 `YoutubeMeta`를 반환합니다.
 * - 데이터가 없거나 API 스키마상 `data`가 비어 있으면 `undefined`를 반환합니다.
 * - `signal`이 중단되면(Abort) 예외를 던지지 않고 브라우저/클라이언트가 요청을 취소합니다.
 *
 * @param {string} videoId - YouTube 동영상 ID (watch URL의 `v` 파라미터)
 * @param {AbortSignal} [signal] - 요청 취소를 위한 AbortSignal
 * @returns {Promise<YoutubeMeta | undefined>} 메타 정보 또는 `undefined`
 *
 */
export async function getVideoMeta(videoId: string, signal?: AbortSignal) {
  const res = await apiClient.get<ApiResp>('/youtube/video', {
    params: { videoId },
    headers: { Accept: 'application/json' },
    withCredentials: true,
    signal,
  });
  return res.data?.data;
}
