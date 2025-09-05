'use client';

import ReportTitle from '@/components/report/molecules/ReportTitle';
import ContentInfo from '@/components/report/organisms/ContentInfo';
import ContentEvidence from '@/components/report/organisms/ContentEvidence';
import SearchError from '@/app/(default)/report/SearchError';
import SearchLoading from '@/app/(default)/report/SearchLoading';
import { useReportPolling, type FetchData } from '@/hooks/useReportPolling';

type Props = { fetchData: FetchData | null; onCancel?: () => void };

export default function DataLoader({ fetchData, onCancel }: Props) {
  const { data, totalScore, loaded, isLoading, error, reset, cancel } =
    useReportPolling(fetchData, {
      onCancel,
      intervalMs: 6000,
      maxTries: 30000,
    });

  const handleExternalCancel = () => cancel();

  if (isLoading && !loaded && !error) {
    return (
      <div className="flex flex-col items-center">
        <ReportTitle totalScore={totalScore} />
        <SearchLoading onCancel={handleExternalCancel} />
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex flex-col items-center">
        <ReportTitle totalScore={totalScore} />
        <SearchError error={error} reset={reset} />
      </div>
    );
  }

  return (
    <div className="flex flex-col items-center">
      <ReportTitle totalScore={totalScore} />
      {data?.info && <ContentInfo info={data.info} />}
      {data?.claims && (
        <ContentEvidence claims={data.claims} totalScore={totalScore} />
      )}
    </div>
  );
}
