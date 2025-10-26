import { useEffect, useRef } from 'react';
import { gtmPush } from '@/utils/gtm';

export function usePoliticianTracking(personName: string) {
  const page_path = '/politician';
  const startTimeRef = useRef<number | null>(null);

  // 사용자가 특정 인물을 검색했을 때 (검색 제출 시 호출)
  function trackPersonSearch() {
    gtmPush({
      event: 'person_search',
      page_path,
      target_name: personName,
    });
  }

  // 페이지 들어왔을 때 타이머 시작
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
          duration_sec: Number(durationSec.toFixed(1)),
        });
      }
    };
  }, [personName]);

  return {
    trackPersonSearch,
  };
}
