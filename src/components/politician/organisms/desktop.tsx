'use client';

import PoliticianBoard from '../molecules/politicianBoard';

export default function PoliticianDesktop() {
  return (
    <section className="flex w-full flex-col items-center gap-6">
      <div className="flex w-full max-w-[900px] flex-col items-center gap-2">
        <p className="text-black-normal text-xl font-extrabold md:text-2xl">오늘의 인기 정치인 TOP 10</p>
        <p className="text-black-normal text-sm md:text-base">인물을 선택하면 최신 기사 신뢰도를 조회할 수 있습니다</p>
      </div>
      <PoliticianBoard />
    </section>
  );
}
