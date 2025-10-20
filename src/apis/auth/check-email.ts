import apiClient from '@/apis/apiClient';

/** 응답  */
export interface EmailCheckResponse {
  success: boolean;
  message: string;
  data: boolean;
}
/** 회원가입 시 이메일 중복 체크  */
export async function checkEmailDuplicate(email: string) {
  const res = await apiClient.get<EmailCheckResponse>('/check/email', {
    params: { email },
    headers: {
      Accept: 'application/json',
    },
  });
  return res.data;
}
