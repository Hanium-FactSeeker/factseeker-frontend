import apiClient from '@/apis/apiClient';

/** 회원가입 요청 바디 */
export interface SignUpRequest {
  loginId: string;
  password: string;
  fullname: string;
  gender: string;
  ageRange: string;
  phone: string;
  email: string;
}

/**
 * 일반 회원가입 응답
 *
 */
export interface SignUpResponse {
  success?: boolean;
  message?: string;
  data?: any;
}

/**
 * 일반 회원가입
 *
 */
export async function signUpUser(payload: SignUpRequest): Promise<SignUpResponse> {
  const res = await apiClient.post<SignUpResponse>('/auth/register', payload, {
    headers: {
      'Content-Type': 'application/json',
      Accept: 'application/json',
    },
  });

  const body = res.data ?? {};

  return body;
}
