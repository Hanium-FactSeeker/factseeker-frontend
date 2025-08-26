/**
 * 주어진 밀리초(ms) 동안 대기합니다.
 * AbortSignal이 전달되면 대기 중에도 취소할 수 있습니다.
 *
 * @param ms 대기할 시간(밀리초)
 * @param signal 요청 취소를 위한 AbortSignal
 */
export function waiting(ms: number, signal?: AbortSignal): Promise<void> {
  return new Promise<void>((resolve, reject) => {
    const t = setTimeout(resolve, ms);
    const onAbort = () => {
      clearTimeout(t);
      const e = new Error('AbortError');
      e.name = 'AbortError';
      reject(e);
    };
    if (signal) {
      if (signal.aborted) return onAbort();
      signal.addEventListener('abort', onAbort, { once: true });
    }
  });
}
