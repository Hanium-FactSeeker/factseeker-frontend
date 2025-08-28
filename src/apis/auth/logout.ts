'use client';

import apiClient from '@/apis/apiClient';

export interface LogoutResponse {
  success?: boolean;
  message?: string;
  data?: Record<string, unknown>;
}

/**
 * 서버 로그아웃
 * - POST /api/auth/logout
 * - 서버 측에서 토큰(세션/화이트리스트 등) 무효화
 */
export async function logoutApi(signal?: AbortSignal): Promise<LogoutResponse> {
  const res = await apiClient.post<LogoutResponse>(
    '/api/auth/logout',
    {},
    {
      withCredentials: true,
      signal,
      headers: { Accept: 'application/json' },
    },
  );
  return res.data ?? {};
}
