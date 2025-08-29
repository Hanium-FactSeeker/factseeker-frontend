'use client';

import apiClient from '@/apis/apiClient';

export interface RecentAnalysis {
  videoAnalysisId: string;
  videoUrl: string;
  videoTitle: string;
}

interface RecentApiResp {
  success: boolean;
  message: string;
  data: RecentAnalysis[];
}

export async function getRecentReport(): Promise<RecentAnalysis[]> {
  const res = await apiClient.get<RecentApiResp>('/analysis/me/recent', {
    headers: { Accept: 'application/json' },
  });

  return res.data.data;
}
