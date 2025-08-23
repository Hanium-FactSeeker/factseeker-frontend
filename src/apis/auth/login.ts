import apiClient from '@/apis/apiClient';
import { setTokens } from '@/lib/auth/tokens';

/** 로그인 요청 바디 */
export interface LoginRequest {
  loginId: string;
  password: string;
}

/**
 * 사용자 로그인
 *
 * - POST /api/auth/login
 * - 바디: { loginId, password }
 * - 성공 시: accessToken/refreshToken/tokenType를 sessionStorage에 저장
 *
 * @param {LoginRequest} payload 로그인 아이디/비밀번호
 * @returns {Promise<LoginResponse>} 서버 응답(사용자 정보 포함)
 * @throws {Error} 인증 실패 또는 네트워크 오류
 */

export interface LoginResponse {
  accessToken?: string;
  refreshToken?: string;
  tokenType?: string;
  user?: {
    loginId?: string;
    fullname?: string;
    email?: string;
    phone?: string;
    roles?: string[];
  };
  success?: boolean;
  message?: string;
  data?: any;
}

/**
 * 사용자 로그인
 *
 * - POST /api/auth/login
 * - 바디: { loginId, password }
 * - 성공 시: accessToken/refreshToken/tokenType를 sessionStorage에 저장
 *
 * @param {LoginRequest} payload 로그인 아이디/비밀번호
 * @returns {Promise<LoginResponse>} 서버 응답(사용자 정보 포함)
 * @throws {Error} 인증 실패 또는 네트워크 오류
 */
export async function loginUser(payload: LoginRequest): Promise<LoginResponse> {
  const res = await apiClient.post<LoginResponse>('/api/auth/login', payload, {
    headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
    withCredentials: true,
  });

  const body = res.data ?? {};

  const accessToken = body.accessToken ?? body.data?.accessToken;
  const refreshToken = body.refreshToken ?? body.data?.refreshToken;
  const tokenType = body.tokenType ?? body.data?.tokenType ?? 'Bearer';

  if (accessToken) {
    setTokens(accessToken, refreshToken, tokenType);
  }

  return body;
}
