'use client';

import apiClient from '@/apis/apiClient';

type RawPolitician = {
  name: string;
  party: string;
  gptScore?: number;
  geminiScore?: number;
  overallScore?: number;
  imageUrl?: string;
};

export async function getTopPoliticians(): Promise<RawPolitician[]> {
  const res = await apiClient.get<RawPolitician>(
    '/politicians/scores/top-summary',
    {
      headers: { Accept: '*/*' },
    },
  );

  const payload = res.data as any;
  const list: RawPolitician[] = Array.isArray(payload?.politicians)
    ? payload.politicians
    : Array.isArray(payload?.data?.politicians)
      ? payload.data.politicians
      : [];

  return list;
}
