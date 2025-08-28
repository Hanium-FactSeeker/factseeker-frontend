'use client';

import { useEffect, useState } from 'react';
import { getRelatedKeywords } from '@/apis/videos/getRelatedKeywords';

export function useRelatedKeywords(videoId: string | undefined) {
  const [keywords, setKeywords] = useState<string[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!videoId) {
      setLoading(false);
      setKeywords([]);
      setError(null);
      return;
    }

    (async () => {
      setLoading(true);
      try {
        const k = await getRelatedKeywords(videoId);
        setKeywords(k);
        setError(null);
      } catch (e: any) {
        setError(e?.message ?? '키워드를 불러오지 못했습니다.');
      } finally {
        setLoading(false);
      }
    })();
  }, [videoId]);

  return { keywords, loading, error };
}
