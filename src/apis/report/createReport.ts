'use client';

import apiClient from '@/apis/apiClient';

/**
 * 유튜브 영상 분석 요청 API
 *
 * @param youtubeUrl 분석할 YouTube 영상 URL
 * @param signal 요청을 취소할 수 있는 AbortSignal (옵셔널)
 * @returns 생성된 분석 ID (analysisId)
 * @throws 응답에 analysisId가 없을 경우 에러 발생
 *
 */
export async function createReport(
  youtubeUrl: string,
  signal?: AbortSignal,
): Promise<number> {
  const res = await apiClient.post(
    '/api/analysis',
    { youtube_url: youtubeUrl },
    {
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
      },
      withCredentials: true,
      signal,
    },
  );

  const id = res.data?.data?.analysisId;
  if (typeof id !== 'number') {
    throw new Error('분석 ID(analysisId)가 응답에 없습니다.');
  }
  return id;
}
