'use client';

import { getSearchReportData } from '@/apis/report/getSearchReportData';
import { getTop10Analysis } from '@/apis/report/getTopReportData';

type FetchByAnalysisId = {
  kind: 'analysisId';
  analysisId: number;
};

type FetchByVideoId = {
  kind: 'videoId';
  videoId: string;
};

/**
 * 서버로부터 리포트 분석 데이터를 가져옵니다.
 *
 * 전달된 `params.kind` 값에 따라 다른 API를 호출:
 * - `kind`가 `"analysisId"`일 경우: 분석 ID(숫자)를 이용해 리포트 조회.
 * - `kind`가 `"videoId"`일 경우: 특정 비디오 ID(문자열)를 이용해 Top10 분석 결과 조회.
 *
 * @template T - API 응답 데이터의 타입(제네릭으로 지정 가능)
 *
 * @param {FetchReportParams} params - 리포트 조회 방법을 지정하는 파라미터
 *  - `{ kind: 'analysisId', analysisId: number }`: 분석 ID로 조회
 *  - `{ kind: 'videoId', videoId: string }`: 비디오 ID로 조회
 *
 * @returns {Promise<T>} API 호출 결과로 반환되는 데이터를 Promise로 감쌉니다.
 *
 * @example
 * ```ts
 * // 분석 ID로 조회
 * const report = await fetchReport<{ info: ReportInfo }>({
 *   kind: 'analysisId',
 *   analysisId: 123,
 * });
 *
 * // 비디오 ID로 조회
 * const report = await fetchReport<{ claims: EvidenceItem[] }>({
 *   kind: 'videoId',
 *   videoId: 'abc123',
 * });
 * ```
 */
export type FetchReportParams = FetchByAnalysisId | FetchByVideoId;

export async function fetchReport<T = any>(params: FetchReportParams) {
  if (params.kind === 'analysisId') {
    return getSearchReportData<T>(params.analysisId);
  }
  return getTop10Analysis<T>(params.videoId);
}
