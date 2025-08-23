'use client';

const ACCESS = 'accessToken';
const REFRESH = 'refreshToken';
const TYPE = 'tokenType';

/**
 * 클라이언트 환경 여부 확인
 * - SSR(Server Side Rendering) 환경에서는 sessionStorage 접근 불가
 */
const isClient = () => typeof window !== 'undefined';

/**
 * 세션 스토리지에서 Access Token 조회
 * @returns {string | null} 저장된 Access Token, 없으면 null
 */
export const getAccessToken = () =>
  isClient() ? sessionStorage.getItem(ACCESS) : null;

/**
 * 세션 스토리지에서 Refresh Token 조회
 * @returns {string | null} 저장된 Refresh Token, 없으면 null
 */
export const getRefreshToken = () =>
  isClient() ? sessionStorage.getItem(REFRESH) : null;

/**
 * 세션 스토리지에서 Token Type 조회
 * @returns {string} 저장된 Token Type, 없으면 기본값 'Bearer'
 */
export const getTokenType = () =>
  isClient() ? (sessionStorage.getItem(TYPE) ?? 'Bearer') : 'Bearer';

/**
 * 세션 스토리지에 토큰 저장
 * @param {string} accessToken 새 Access Token
 * @param {string} [refreshToken] 새 Refresh Token (옵션)
 * @param {string} [tokenType] 새 Token Type (옵션, 기본값: 'Bearer')
 */
export const setTokens = (
  accessToken: string,
  refreshToken?: string,
  tokenType?: string,
) => {
  if (!isClient()) return;
  sessionStorage.setItem(ACCESS, accessToken);
  if (refreshToken) sessionStorage.setItem(REFRESH, refreshToken);
  if (tokenType) sessionStorage.setItem(TYPE, tokenType);
};

/**
 * 세션 스토리지에서 모든 토큰 제거
 * - 로그아웃 또는 인증 실패 시 호출
 */
export const clearTokens = () => {
  if (!isClient()) return;
  sessionStorage.removeItem(ACCESS);
  sessionStorage.removeItem(REFRESH);
  sessionStorage.removeItem(TYPE);
};
