'use client';

import axios from 'axios';
import { getAccessToken, getTokenType } from '@/lib/auth/tokens';

const API_BASE = process.env.NEXT_PUBLIC_API_BASE_URL || process.env.API_BASE_URL || '';

/**
 * 유튜브 영상 분석 생성
 * proxy에서 timeout이 발생하는 경우가 있어 추후 개선 필요.
 */
export async function createReport(youtubeUrl: string): Promise<number> {
  const base = API_BASE.replace(/\/+$/, '');
  const url = `${base}/api/analysis`;
  const body = { youtube_url: youtubeUrl };

  const token = getAccessToken();
  const type = getTokenType() || 'Bearer';

  const headers: Record<string, string> = {
    'Content-Type': 'application/json',
    Accept: 'application/json',
  };
  if (token) headers.Authorization = `${type} ${token}`;

  const res = await axios.post(url, body, {
    headers,
    withCredentials: false,
    timeout: 120000,
  });

  const id = res.data?.data?.analysisId ?? res.data?.analysisId ?? res.data?.id;

  if (typeof id !== 'number') {
    throw new Error('analysisId 누락');
  }

  return id;
}
