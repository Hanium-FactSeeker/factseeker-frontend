'use client';

import apiClient from '@/apis/apiClient';

export type GetReportDataResp<T = any> = {
  success: boolean;
  message?: string;
  data?: T;
};

/**
 * 분석 결과 조회 API
 *
 * 분석 ID(videoAnalysisId)로 분석 결과를 가져옵니다.
 *
 * @template T 서버에서 반환하는 데이터 타입
 * @param videoAnalysisId 조회할 분석 ID
 * @param signal 요청을 취소할 수 있는 AbortSignal (옵셔널)
 * @returns API 응답 객체 ({ success, message, data })
 *
 */
export async function getReportData<T = any>(
  videoAnalysisId: number,
  signal?: AbortSignal,
) {
  const res = await apiClient.get<GetReportDataResp<T>>(
    `/api/analysis/${videoAnalysisId}`,
    {
      headers: { Accept: 'application/json', 'X-Debug-Label': 'getReportData' },
      withCredentials: true,
      signal,
    },
  );
  return res.data;
}
