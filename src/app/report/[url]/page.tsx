'use client';

import { Suspense } from 'react';
import { useRouter, useParams } from 'next/navigation';

import Footer from '@/components/footer';
import DefaultHeader from '@/components/header/DefaultHeader';
import SearchLoading from '../SearchLoading';
import DataLoader from '@/components/report/organisms/DataLoader';

const Page = () => {
  const router = useRouter();
  const params = useParams<{ url: string }>();
  const originalUrl = decodeURIComponent(String(params.url));

  const handleCancel = () => {
    if (typeof window !== 'undefined' && window.history.length > 1)
      router.back();
    else router.push('/');
  };

  return (
    <div>
      <DefaultHeader isLoggedIn={false} initialSearch={originalUrl} />
      <main className="bg-gray-light flex w-full flex-col items-center justify-center p-4">
        <Suspense fallback={<SearchLoading onCancel={handleCancel} />}>
          <DataLoader url={originalUrl} onCancel={handleCancel} />
        </Suspense>
      </main>
      <Footer />
    </div>
  );
};

export default Page;
