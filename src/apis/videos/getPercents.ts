'use client';

import apiClient from '@/apis/apiClient';

interface PercentResult {
  videoId: string;
  status: 'COMPLETED' | 'PENDING' | 'FAILED' | string;
  totalConfidenceScore?: number;
}

interface PercentApiResp {
  success: boolean;
  message: string;
  data: {
    requested: number;
    completed: number;
    pending: number;
    results: PercentResult[];
  };
}

export async function getPercents(videoIds: string[]) {
  if (!videoIds?.length) return [];

  const res = await apiClient.get<PercentApiResp>('/analysis/top10/percents', {
    params: { videoIds },
    paramsSerializer: (params) => {
      const usp = new URLSearchParams();
      (params.videoIds as string[]).forEach((id) => usp.append('videoIds', id));
      return usp.toString();
    },
  });

  return res.data?.data?.results ?? [];
}
