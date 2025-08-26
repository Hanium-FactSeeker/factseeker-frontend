'use client';

import apiClient from '@/apis/apiClient';

type LatestTrendsApiResp = {
  success: boolean;
  message: string;
  data: string[];
};

/** 최신 정치 키워드 배열을 반환합니다. (상위 N개 자름) */
export async function getLatestTrends(limit?: number) {
  const res = await apiClient.get<LatestTrendsApiResp>(
    '/api/latest-trends',
    {},
  );

  const keywords = Array.isArray(res.data?.data) ? res.data.data : [];
  return typeof limit === 'number' ? keywords.slice(0, limit) : keywords;
}
