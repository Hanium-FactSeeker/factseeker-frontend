import apiClient from '@/apis/apiClient';

export async function getOgImage(
  url: string,
  signal?: AbortSignal,
): Promise<string | undefined> {
  if (!url) return undefined;

  const res = await apiClient.get<{ image?: string; message?: string }>('/og', {
    params: { url },
    signal,
    headers: { Accept: '*/*' },
  });

  const data: any = res.data;
  const image =
    data?.image ??
    data?.data?.image ??
    (typeof data === 'string' ? data : undefined);

  return image || undefined;
}
