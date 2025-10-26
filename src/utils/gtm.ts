import type { GTMEvent } from '@/types/gtm';

declare global {
  interface Window {
    dataLayer: Record<string, unknown>[];
  }
}

export function gtmPush(payload: GTMEvent): void {
  if (typeof window === 'undefined') return;

  window.dataLayer = window.dataLayer || [];

  const isDev = process.env.NODE_ENV !== 'production';

  window.dataLayer.push({
    ...payload,
    ...(payload.debug_mode === undefined ? { debug_mode: isDev } : null),
  });
}
