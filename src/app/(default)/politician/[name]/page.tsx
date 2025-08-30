// 서버 컴포넌트: 절대 "use client" 넣지 마세요.

import PoliticianDetailClient from './PoliticianDetailClient';

type PageProps = {
  params: Promise<{ name: string }>;
};

export default async function PoliticianDetailPage({ params }: PageProps) {
  const { name } = await params;

  return (
    <main className="flex w-full flex-col items-center">
      <PoliticianDetailClient name={decodeURIComponent(name)} />
    </main>
  );
}
