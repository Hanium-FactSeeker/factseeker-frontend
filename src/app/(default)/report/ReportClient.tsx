'use client';

import { useEffect, useMemo } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import DataLoader from '@/components/report/organisms/DataLoader';
import { useSearchTracking } from '@/hooks/gtm/useSearchTracking';
import type { FetchData } from '@/hooks/useReportPolling';

function nonEmpty(v: string | null): string | undefined {
  const s = (v ?? '').trim();
  return s.length > 0 ? s : undefined;
}

function isLikelyUrl(v: string | undefined): v is string {
  if (!v) return false;
  try {
    const u = new URL(v);
    return u.protocol === 'http:' || u.protocol === 'https:';
  } catch {
    return false;
  }
}

export default function ReportClient() {
  const router = useRouter();
  const sp = useSearchParams();
  const { trackSearchResultLoaded } = useSearchTracking();

  const analysisIdRaw = nonEmpty(sp.get('analysisId'));
  const analysisId =
    analysisIdRaw != null && !Number.isNaN(Number(analysisIdRaw))
      ? Number(analysisIdRaw)
      : undefined;

  const videoId = nonEmpty(sp.get('videoId'));
  const urlParamRaw = nonEmpty(sp.get('url'));
  const url = isLikelyUrl(urlParamRaw) ? urlParamRaw : undefined;

  // 우선순위: analysisId > videoId > url
  const fetchData = useMemo<FetchData | null>(() => {
    if (typeof analysisId === 'number') {
      return { kind: 'analysisId' as const, analysisId };
    }
    if (videoId) {
      return { kind: 'videoId' as const, videoId };
    }
    if (url) {
      return { kind: 'url' as const, url };
    }
    return null;
  }, [analysisId, videoId, url]);

  useEffect(() => {
    if (!fetchData) return;
    trackSearchResultLoaded(0);
  }, [fetchData, trackSearchResultLoaded]);

  const handleCancel = () => {
    if (typeof window !== 'undefined' && window.history.length > 1) router.back();
    else router.push('/');
  };

  return fetchData ? (
    <DataLoader fetchData={fetchData} onCancel={handleCancel} />
  ) : (
    <p className="text-sm text-gray-600">분석할 대상이 없습니다.</p>
  );
}
