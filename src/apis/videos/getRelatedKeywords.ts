'use client';

import apiClient from '@/apis/apiClient';

interface ApiResponse<T> {
  success: boolean;
  message: string;
  data: T;
}

interface KeywordPayload {
  keywords: string[];
}

export async function getRelatedKeywords(videoId: string) {
  if (!videoId) throw new Error('videoId is required');

  const url = `/analysis/top10/${encodeURIComponent(videoId)}/keywords`;

  const res = await apiClient.get<ApiResponse<KeywordPayload>>(url, {
    headers: { Accept: 'application/json' },
    withCredentials: true,
  });

  const ks = res.data.data.keywords;
  return Array.isArray(ks) ? ks : [];
}
