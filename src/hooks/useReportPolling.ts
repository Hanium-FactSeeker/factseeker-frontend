'use client';

import { useEffect, useMemo, useRef, useState } from 'react';
import { waiting } from '@/utils/waiting';
import { getSearchReportData as getReportData } from '@/apis/report/getSearchReportData';
import { getTop10Analysis } from '@/apis/report/getTopReportData';
import { createReport } from '@/apis/report/createReport';
import { isAbortError, isTransientError } from '@/utils/report/reportErrors';
import { getMetaUsingId } from '@/utils/report/reportMeta';
import type { ReportInfo, EvidenceItem } from '@/types/report';

export type FetchData =
  | { kind: 'url'; url: string }
  | { kind: 'analysisId'; analysisId: number }
  | { kind: 'videoId'; videoId: string };

type ReportData = { info?: ReportInfo; claims?: EvidenceItem[] };

type UseReportPollingOptions = {
  intervalMs?: number;
  maxTries?: number;
  onCancel?: () => void;
};

export function useReportPolling(
  fetchData: FetchData | null,
  opts?: UseReportPollingOptions,
) {
  const INTERVAL = opts?.intervalMs ?? 300000;
  const MAX_TRIES = opts?.maxTries ?? 999999;

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

  const handleCancel = () => {
    abortRef.current?.abort();
    opts?.onCancel?.();
  };

  const key = useMemo(() => JSON.stringify(fetchData ?? {}), [fetchData]);

  useEffect(() => {
    if (!fetchData) return;

    let cancelled = false;
    const signal = resetController();

    const run = async () => {
      try {
        setIsLoading(true);
        setError(null);
        setLoaded(false);
        setData(null);

        // 1) URL → create → analysisId 폴링
        if (fetchData.kind === 'url') {
          let analysisId: number;
          // eslint-disable-next-line prefer-const
          analysisId = await createReport(fetchData.url);

          if (cancelled) return;

          for (let i = 0; i < MAX_TRIES; i++) {
            if (cancelled || signal.aborted) return;
            try {
              const res = await getReportData<any>(analysisId, { signal });
              const status: string | undefined =
                (res as any)?.data?.status ?? (res as any)?.status;

              if (status === 'FAILED') throw new Error('분석이 실패했습니다.');
              if (res?.success && res?.data && status !== 'PENDING') {
                let info: ReportInfo = res.data;
                const claims: EvidenceItem[] = res.data?.claims ?? [];
                const score = Number(res.data?.totalConfidenceScore ?? 0);
                setTotalScore(Number.isNaN(score) ? 0 : score);
                info = await getMetaUsingId(info, signal);
                if (cancelled) return;
                setData({ info, claims });
                setLoaded(true);
                setIsLoading(false);
                return;
              }
            } catch (e: any) {
              if (isAbortError(e)) return;
              if (!isTransientError(e)) throw e;
            }
            await waiting(INTERVAL);
          }
          throw new Error('분석 결과가 시간 내 준비되지 않았습니다.');
        }

        // 2) analysisId → 폴링
        if (fetchData.kind === 'analysisId') {
          const { analysisId } = fetchData;

          for (let i = 0; i < MAX_TRIES; i++) {
            if (cancelled || signal.aborted) return;
            try {
              const res = await getReportData<any>(analysisId, { signal });
              const status: string | undefined =
                (res as any)?.data?.status ?? (res as any)?.status;

              if (status === 'FAILED') throw new Error('분석이 실패했습니다.');
              if (res?.success && res?.data && status !== 'PENDING') {
                let info: ReportInfo = res.data;
                const claims: EvidenceItem[] = res.data?.claims ?? [];
                const score = Number(res.data?.totalConfidenceScore ?? 0);
                setTotalScore(Number.isNaN(score) ? 0 : score);
                info = await getMetaUsingId(info, signal);
                if (cancelled) return;
                setData({ info, claims });
                setLoaded(true);
                setIsLoading(false);
                return;
              }
            } catch (e: any) {
              if (isAbortError(e)) return;
              if (!isTransientError(e)) throw e;
            }
            await waiting(INTERVAL);
          }
          throw new Error('분석 결과가 시간 내 준비되지 않았습니다.');
        }

        // 3) videoId → Top10 폴링
        if (fetchData.kind === 'videoId') {
          const { videoId } = fetchData;

          for (let i = 0; i < MAX_TRIES; i++) {
            if (cancelled || signal.aborted) return;
            try {
              const res = await getTop10Analysis<any>(videoId);
              const payload = res?.data;
              const status: string | undefined = (payload as any)?.status;

              if (status === 'FAILED')
                throw new Error('Top10 분석이 실패했습니다.');
              if (res?.success && payload && status !== 'PENDING') {
                const info: ReportInfo = payload;
                const claims: EvidenceItem[] = (payload as any)?.claims ?? [];
                const raw = (payload as any)?.totalConfidenceScore;
                const score = typeof raw === 'number' ? raw : Number(raw ?? 0);
                setTotalScore(Number.isNaN(score) ? 0 : score);
                const info2 = await getMetaUsingId(info, signal);
                if (cancelled) return;
                setData({ info: info2, claims });
                setLoaded(true);
                setIsLoading(false);
                return;
              }
            } catch (e: any) {
              if (isAbortError(e)) return;
              if (!isTransientError(e)) throw e;
            }
            await waiting(INTERVAL);
          }
          throw new Error('Top10 분석 결과가 시간 내 준비되지 않았습니다.');
        }
      } catch (err: any) {
        if (isAbortError(err)) return;
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
  }, [key, retryKey, INTERVAL, MAX_TRIES, fetchData]);

  const reset = () => setRetryKey((k) => k + 1);

  return {
    data,
    totalScore,
    loaded,
    isLoading,
    error,
    reset,
    cancel: handleCancel,
  };
}
