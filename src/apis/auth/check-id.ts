import apiClient from '@/apis/apiClient';

/** 아이디 중복 체크 응답 */
export interface LoginIdCheckResponse {
  success: boolean;
  message: string;
  data: boolean;
}

/** 아이디 중복 체크 */
export async function checkIdDuplicate(
  loginId: string,
): Promise<LoginIdCheckResponse> {
  const res = await apiClient.get<LoginIdCheckResponse>('/check/loginId', {
    params: { loginId },
    headers: { Accept: 'application/json' },
  });
  return res.data;
}
