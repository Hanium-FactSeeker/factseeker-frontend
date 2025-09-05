'use client';

import apiClient from '@/apis/apiClient';

export type GetReportDataResp<T = any> = {
  success: boolean;
  message?: string;
  data?: T;
};

/**
 * url 분석 결과 조회 API
 */
export async function getSearchReportData<T = any>(
  videoAnalysisId: number,
  opts?: { signal?: AbortSignal; params?: Record<string, string> },
): Promise<GetReportDataResp<T>> {
  const path = `/analysis/${videoAnalysisId}`;

  const res = await apiClient.get<any>(path, {
    headers: { Accept: 'application/json', 'X-Debug-Label': 'getReportData' },
    withCredentials: true,
    signal: opts?.signal,
    params: opts?.params,
  });

  return {
    success: true,
    data: res.data?.data ?? res.data ?? undefined,
  } as GetReportDataResp<T>;
}
