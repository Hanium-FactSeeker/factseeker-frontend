'use client';

import { gtmPush } from '@/utils/gtm';

// 랭킹/검색 페이지에서 검색
export function usePoliticianSearchTracking() {
  const page_path = '/politician';

  function trackSearchQuery(query: string) {
    const q = query.trim();
    if (!q) return;

    gtmPush({
      event: 'person_search',
      page_path,
      target_name: q,
    });
  }

  return { trackSearchQuery };
}
