'use client';

import apiClient from '@/apis/apiClient';
import type { MeResponse } from '@/types/auth';

/**
 * 현재 로그인한 사용자 정보 조회
 * GET /api/auth/me
 */
export async function fetchMe(signal?: AbortSignal): Promise<any> {
  const res = await apiClient.get<MeResponse>('/api/auth/me', {
    headers: { Accept: 'application/json' },
    withCredentials: true,
    signal,
  });
  const body: any = res.data ?? {};
  return body?.data ?? body;
}
