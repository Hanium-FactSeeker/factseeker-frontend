'use client';

import apiClient from '@/apis/apiClient';

export type GetTop10AnalysisResp<T = any> = {
  success: boolean;
  message?: string;
  data?: T;
};
/**
 * Top10 분석 결과 조회 API
 *
 * 인기영상에서 videoId로 Top10 영상에 대한 개별 분석 결과를 가져옵니다.
 *
 * 상태값:
 * - COMPLETE: 분석 완료
 * - PENDING: 분석 대기 중
 * - FAILED: 분석 실패
 *
 * @template T 서버에서 반환하는 데이터 타입
 * @param videoId 조회할 비디오 ID
 * @param signal 요청을 취소할 수 있는 AbortSignal (옵셔널)
 * @returns API 응답 객체 ({ success, message, data })
 *
 */
export async function getTop10Analysis<T = any>(
  videoId: string,
  signal?: AbortSignal,
): Promise<GetTop10AnalysisResp<T>> {
  const res = await apiClient.get<any>(`/analysis/top10/${videoId}`, {
    headers: {
      Accept: 'application/json',
      'X-Debug-Label': 'getTop10Analysis',
    },
    withCredentials: true,
    signal,
  });
  const payload = res.data?.data ?? res.data ?? undefined;
  return {
    success: true,
    data: payload as T,
  };
}
