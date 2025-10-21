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
  if (!d || typeof d !== 'object') return null;
  const hasDataField = 'data' in d && typeof (d as { data?: unknown }).data === 'object';
  const maybe = hasDataField ? (d as { data: object }).data : d;

  const isTokenPayload = (obj: unknown): obj is TokenPayload => {
    if (!obj || typeof obj !== 'object') return false;
    const o = obj as Record<string, unknown>;
    return typeof o.accessToken === 'string' && typeof o.refreshToken === 'string';
  };

  if (isTokenPayload(maybe)) {
    const o = maybe as TokenPayload;
    return {
      accessToken: o.accessToken,
      refreshToken: o.refreshToken,
      tokenType: o.tokenType ?? 'Bearer',
      expiresIn: o.expiresIn,
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
