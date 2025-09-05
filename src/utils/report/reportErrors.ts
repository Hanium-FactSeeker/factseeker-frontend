// 사용자 취소/언마운트로 인한 abort 여부
export function isAbortError(err: any): boolean {
  return (
    err?.name === 'AbortError' || err?.name === 'CanceledError' || err?.code === 'ERR_CANCELED'
  );
}

// 서버 준비 중/일시 오류(404/409/425/429/5xx) → 재시도 대상
export function isTransientError(err: any): boolean {
  const s: number | undefined = err?.response?.status;
  if ([404, 409, 425, 429, 500, 502, 503, 504].includes(s ?? -1)) return true;
  const msg: string = err?.response?.data?.message || err?.message || '';
  return /(대기|진행|준비|pending)/i.test(msg);
}
