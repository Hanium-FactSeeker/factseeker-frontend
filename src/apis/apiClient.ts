'use client';

import type { AxiosError, InternalAxiosRequestConfig } from 'axios';
import axios from 'axios';
import {
  clearTokens,
  getAccessToken,
  getRefreshToken,
  getTokenType,
  setTokens,
} from '@/lib/auth/tokens';

const PATH = {
  LOGIN: '/auth/login',
  REFRESH: '/auth/refresh',
  LOGOUT: '/auth/logout',
} as const;

const JSON_HEADERS = {
  'Content-Type': 'application/json',
  Accept: 'application/json',
} as const;

/** 동시에 여러 refresh 요청을 막기 위한 플래그 */
let refreshInFlight: Promise<string> | null = null;

/**
 * Refresh Token으로 새로운 Access Token 발급
 */
async function requestRefresh(): Promise<string> {
  const refreshToken = getRefreshToken();
  if (!refreshToken) throw new Error('Missing refresh token');

  const res = await apiClient.post(
    PATH.REFRESH,
    { refreshToken },
    { headers: JSON_HEADERS, withCredentials: true },
  );

  const body = res.data ?? {};
  const access = body.accessToken ?? body.data?.accessToken;
  const type = body.tokenType ?? body.data?.tokenType ?? 'Bearer';

  if (!access) throw new Error('No access token in refresh response');

  setTokens(access, undefined, type);
  return access;
}

/**
 * Axios 인스턴스
 * - baseURL을 "/api" 로 고정 (Next.js rewrites가 실제 서버로 프록시)
 */
const apiClient = axios.create({
  baseURL: '/api',
  headers: JSON_HEADERS,
  withCredentials: true,
});

/**
 * 요청 인터셉터
 * - Access Token을 Authorization 헤더에 자동 추가
 */
apiClient.interceptors.request.use((config) => {
  const token = getAccessToken();
  const type = getTokenType();
  if (token) {
    config.headers = config.headers ?? {};
    (config.headers as Record<string, string>).Authorization = `${type} ${token}`;
  }
  return config;
});

/** Axios 요청 구성 확장 (재시도 플래그) */
interface CustomAxiosRequestConfig extends InternalAxiosRequestConfig {
  _retry?: boolean;
}

/**
 * 응답 인터셉터
 * - 401 발생 시 Refresh Token으로 Access Token 재발급 후 재시도
 * - Refresh 실패 시 토큰 삭제 및 로그인 페이지로 이동
 */
apiClient.interceptors.response.use(
  (res) => res,
  async (err: AxiosError) => {
    const status = err.response?.status;
    const cfg = err.config as CustomAxiosRequestConfig;

    if (!cfg || status !== 401) return Promise.reject(err);

    const url = cfg.url ?? '';

    // 로그인/리프레시/로그아웃 요청은 예외 처리
    if (url.includes(PATH.LOGIN) || url.includes(PATH.REFRESH) || url.includes(PATH.LOGOUT)) {
      return Promise.reject(err);
    }

    if (!cfg._retry) {
      cfg._retry = true;

      try {
        if (!refreshInFlight) {
          refreshInFlight = requestRefresh().finally(() => {
            refreshInFlight = null;
          });
        }
        const newAccess = await refreshInFlight;

        cfg.headers = cfg.headers ?? {};
        (cfg.headers as Record<string, string>).Authorization = `${getTokenType()} ${newAccess}`;

        return apiClient(cfg);
      } catch (e) {
        clearTokens();
        if (typeof window !== 'undefined' && window.location.pathname !== '/login') {
          window.location.href = '/login';
        }
        return Promise.reject(e);
      }
    }

    return Promise.reject(err);
  },
);

export default apiClient;
