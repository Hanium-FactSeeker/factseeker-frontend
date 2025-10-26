'use client';

import { useEffect, useRef } from 'react';
import { gtmPush } from '@/utils/gtm';

//특정 정치인 상세 화면
export function usePoliticianTracking(personName: string) {
  const page_path = '/politician';
  const startTimeRef = useRef<number | null>(null);

  function trackPersonSearch() {
    gtmPush({
      event: 'person_search',
      page_path,
      target_name: personName,
    });
  }

  // 페이지 체류 시간 측정
  useEffect(() => {
    startTimeRef.current = performance.now();
    return () => {
      if (startTimeRef.current !== null) {
        const end = performance.now();
        const durationSec = (end - startTimeRef.current) / 1000;

        gtmPush({
          event: 'person_view_time',
          page_path,
          target_name: personName,
          duration_sec: Number(durationSec.toFixed(1)), // 예: 12.3초
        });
      }
    };
  }, [personName]);

  return {
    trackPersonSearch,
  };
}
