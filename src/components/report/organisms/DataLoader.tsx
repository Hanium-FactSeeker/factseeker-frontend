'use client';

import { useEffect, useState } from 'react';
import ReportTitle from '@/components/report/molecules/ReportTitle';
import ContentInfo from '@/components/report/organisms/ContentInfo';
import ContentEvidence from '@/components/report/organisms/ContentEvidence';

type ReportData = {
  info?: any;
  evidence?: any;
};

function DataLoader({ url, signal }: { url: string; signal: AbortSignal }) {
  const [data, setData] = useState<ReportData | null>(null);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    const run = async () => {
      try {
        // const res = await getReport();
        // if (!res.ok) throw new Error(`API 실패: ${res.status}`);
        // const json = (await res.json()) as ReportData;
        // setData(json);
        // setLoaded(true);
      } catch (err: any) {
        if (err?.name === 'AbortError') return;
        throw err;
      }
    };
    run();
  }, [url, signal]);

  return (
    <>
      <ReportTitle />
      <ContentInfo /* data={data.info} */ />
      <ContentEvidence /* data={data.evidence} */ />
    </>
  );
}

export default DataLoader;
