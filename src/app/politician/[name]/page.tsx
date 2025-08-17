import DefaultHeader from '@/components/header/DefaultHeader';
import Footer from '@/components/footer';
import PoliticianDetailDesktop from '@/components/politician/organisms/PoliticianDetailDesktop';
import PoliticianDetailMobile from '@/components/politician/organisms/PoliticianDetailMobile';
import { videoList } from '@/constants/videoList';
import { POLITICIANS } from '@/constants/politicians';
import { notFound } from 'next/navigation';

type PageProps = {
  params: { name: string }; // /politician/[name]
};

export default function PoliticianDetailPage({ params }: PageProps) {
  const queryName = decodeURIComponent(params.name);

  // POLITICIANS에서 이름 매칭
  const found = POLITICIANS.find((p) => p.name === queryName);

  if (!found) {
    // 없는 인물이면 404 처리 (원하면 다른 fallback 문구로 바꿔도 됨)
    notFound();
  }

  // 상세 컴포넌트에 맞는 형태로 매핑
  const politician = {
    name: found!.name,
    party: found!.party,
    img: found!.img ?? (found as any).figureImg ?? '',
    stats: found!.stats, // { fact, gpt, claude }
  };

  return (
    <main className="flex w-full flex-col items-center">
      <DefaultHeader isLoggedIn={false} />
      <section className="flex w-full max-w-6xl flex-col items-center gap-10 px-4 py-8 md:px-6 md:py-12">
        <div className="hidden w-full md:block">
          <PoliticianDetailDesktop
            politician={politician}
            videos={videoList as any} // videoList 타입 그대로 쓰고 싶다 했으니 유지
            updatedAt="2025년 07월 06일 18:00 업데이트"
          />
        </div>
        <div className="w-full md:hidden">
          <PoliticianDetailMobile
            politician={politician}
            videos={videoList as any}
            updatedAt="2025년 07월 06일 18:00 업데이트"
          />
        </div>
      </section>
      <Footer />
    </main>
  );
}