import { Suspense } from 'react';
import SearchLoading from './SearchLoading';
import ReportClient from './ReportClient';

export default function Page() {
  return (
    <Suspense fallback={<SearchLoading />}>
      <ReportClient />
    </Suspense>
  );
}
