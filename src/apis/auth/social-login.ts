'use client';

import apiClient from '@/apis/apiClient';

export type VerifyRes = { name?: string; age?: string; age_range?: string };

export type TokenPayload = {
  accessToken: string;
  refreshToken: string;
  tokenType?: string;
  expiresIn?: number;
};

export type ApiSuccess<T> = { success: true; message?: string; data: T };
export type ApiFail = { success: false; message?: string };

export function extractTokenPayload(d: unknown): TokenPayload | null {
  const maybe: any = (d as any)?.data ?? d;
  if (maybe && typeof maybe.accessToken === 'string' && typeof maybe.refreshToken === 'string') {
    return {
      accessToken: maybe.accessToken,
      refreshToken: maybe.refreshToken,
      tokenType: typeof maybe.tokenType === 'string' ? maybe.tokenType : 'Bearer',
      expiresIn: typeof maybe.expiresIn === 'number' ? maybe.expiresIn : undefined,
    };
  }
  return null;
}

export async function verifySocial(token: string) {
  const { data } = await apiClient.get<VerifyRes>('/auth/social/verify', {
    params: { token },
  });
  return data;
}

export type CompleteReq = {
  tempToken: string;
  fullname?: string;
  gender?: string;
  ageRange?: string;
  phone?: string;
  email?: string;
};

export async function completeSocial(payload: CompleteReq) {
  const res = await apiClient.post<ApiSuccess<TokenPayload> | TokenPayload | ApiFail>(
    '/social/complete',
    payload,
  );

  const tokens = extractTokenPayload(res.data);
  return { raw: res.data, tokens };
}
