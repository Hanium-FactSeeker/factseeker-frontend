// 서버 컴포넌트: 절대 "use client" 넣지 마세요.
import DefaultHeader from '@/components/header/DefaultHeader';
import Footer from '@/components/footer';
import PoliticianDetailClient from './PoliticianDetailClient';

type PageProps =
  | { params: { name: string } }
  | { params: Promise<{ name: string }> };

export default async function PoliticianDetailPage(props: PageProps) {
  const p: any = (props as any).params;
  const resolved = typeof p?.then === 'function' ? await p : p;
  const name = decodeURIComponent(resolved?.name ?? '');

  return (
    <main className="flex w-full flex-col items-center">
      <DefaultHeader isLoggedIn={false} />
      <PoliticianDetailClient name={name} />
      <Footer />
    </main>
  );
}
