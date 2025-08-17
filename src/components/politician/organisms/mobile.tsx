'use client';

import PoliticianBoard from '../molecules/politicianBoard';

export default function PoliticianMobile() {
  return (
    <section className="flex w-full flex-col items-center gap-4">
      <div className="flex w-full max-w-[700px] flex-col items-center gap-1">
        <p className="text-black-normal text-lg font-extrabold">오늘의 인기 정치인 TOP 10</p>
        <p className="text-black-normal text-sm">인물을 선택하면 기사 신뢰도를 볼 수 있어요</p>
      </div>
      <PoliticianBoard />
    </section>
  );
}
