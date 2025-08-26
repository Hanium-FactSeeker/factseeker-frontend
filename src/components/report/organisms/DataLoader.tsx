'use client';

import { useEffect, useRef, useState } from 'react';
import ReportTitle from '@/components/report/molecules/ReportTitle';
import ContentInfo from '@/components/report/organisms/ContentInfo';
import ContentEvidence from '@/components/report/organisms/ContentEvidence';
import SearchLoading from '@/app/report/SearchLoading';
import SearchError from '@/app/report/SearchError';
import { createReport } from '@/apis/report/createReport';
import { getReportData } from '@/apis/report/getReportData';
import { getVideoMeta } from '@/apis/report/getVideoMeta';
import type { ReportInfo, EvidenceItem } from '@/types/report';
import { waiting } from '@/utils/waiting';

type ReportData = { info?: ReportInfo; claims?: EvidenceItem[] };

/**
 * 영상 메타데이터(title, thumbnail, channelName)을 추가로 가져오는 함수
 * videoId가 있고 기존 데이터에 값이 없을 경우에만 API를 호출합니다
 *
 * @param info ReportInfo 객체
 * @param signal 요청 취소를 위한 AbortSignal
 * @returns 필요한 ReportInfo
 */
async function getMetaUsingId(info: ReportInfo, signal: AbortSignal) {
  const needTitle = !info.videoTitle;
  const needThumb = !info.thumbnailUrl;
  if ((!needTitle && !needThumb) || !info.videoId) return info;
  try {
    const meta = await getVideoMeta(info.videoId, signal);
    return {
      ...info,
      videoTitle: info.videoTitle ?? meta?.videoTitle,
      thumbnailUrl: info.thumbnailUrl ?? meta?.thumbnailUrl,
      channelId: info.channelId ?? meta?.channelId,
      channelTitle: info.channelTitle ?? meta?.channelTitle,
    } as ReportInfo;
  } catch {
    return info;
  }
}

/**
 * DataLoader 컴포넌트
 *
 * - 1. YouTube URL을 POST(`/api/analysis`)로 분석 요청 후 analysisId를 획득합니다.
 * - 2. analysisId를 이용해 GET(`/api/analysis/{id}`)을 폴링하여 분석 결과를 가져옵니다.
 * - 3. 결과 데이터가 준비되면 `ReportInfo`와 `claims`를 자식 컴포넌트에 전달합니다.
 *
 * @param url 분석할 YouTube URL
 * @param onCancel 로딩 중 사용자가 취소할 때 실행되는 콜백
 */
function DataLoader({ url, onCancel }: { url: string; onCancel?: () => void }) {
  const [data, setData] = useState<ReportData | null>(null);
  const [totalScore, setTotalScore] = useState<number>(0);
  const [loaded, setLoaded] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);
  const [retryKey, setRetryKey] = useState(0);

  const abortRef = useRef<AbortController | null>(null);
  const resetController = () => {
    abortRef.current?.abort();
    abortRef.current = new AbortController();
    return abortRef.current.signal;
  };

  const handleExternalCancel = () => {
    abortRef.current?.abort();
    onCancel?.();
  };

  useEffect(() => {
    let cancelled = false;

    const run = async () => {
      try {
        setIsLoading(true);
        setError(null);
        setLoaded(false);
        setData(null);

        const signal = resetController();

        // 1) url 분석 요청 -> analysisId 반환
        const analysisId = await createReport(url, signal);

        // 2) GET: analysisId -> data 반환
        const MAX_TRIES = 20;
        const INTERVAL = 1500;

        for (let attempt = 1; attempt <= MAX_TRIES; attempt++) {
          if (cancelled) return;

          const res = await getReportData<any>(analysisId, signal);

          if (res?.success && res?.data) {
            let info: ReportInfo = res.data;
            setTotalScore(res.data.totalConfidenceScore);
            const claims: EvidenceItem[] = res.data?.claims ?? [];
            info = await getMetaUsingId(info, signal);

            if (!cancelled) {
              setData({ info, claims });
              setLoaded(true);
              setIsLoading(false);
            }
            return;
          }

          await waiting(INTERVAL, signal);
        }

        throw new Error('분석 결과가 시간 내 준비되지 않았습니다.');
      } catch (err: any) {
        const aborted =
          err?.name === 'AbortError' ||
          err?.name === 'CanceledError' ||
          err?.code === 'ERR_CANCELED';
        if (aborted) return;

        const e =
          err instanceof Error ? err : new Error(String(err?.message ?? err));
        if (!cancelled) {
          setError(e);
          setIsLoading(false);
          setLoaded(false);
        }
      }
    };

    run();
    return () => {
      cancelled = true;
      abortRef.current?.abort();
    };
  }, [url, retryKey]);

  const handleReset = () => setRetryKey((k) => k + 1);

  if (isLoading && !loaded && !error) {
    return (
      <>
        <ReportTitle />
        <SearchLoading onCancel={handleExternalCancel} />
      </>
    );
  }

  if (error) {
    return (
      <>
        <ReportTitle />
        <SearchError error={error} reset={handleReset} />
      </>
    );
  }

  return (
    <>
      <ReportTitle />
      {data?.info && <ContentInfo info={data.info} />}
      {data?.claims && (
        <ContentEvidence claims={data.claims} totalScore={totalScore} />
      )}
    </>
  );
}

export default DataLoader;
