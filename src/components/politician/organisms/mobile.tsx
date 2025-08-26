'use client';

import PoliticianBoardMobile from '../molecules/politicianBoardMobile';

export default function PoliticianMobile() {
  return (
    <section className="flex w-full flex-col items-center px-4 md:hidden">
      <div className="mt-8 w-full max-w-[700px]">
        <h2 className="text-Black_normal text-[18px] font-bold text-center">
          오늘의 인기 정치인 TOP 12
        </h2>
        <p className="mt-2 text-Black_alternative text-[12px] font-medium text-center">
          인물을 선택하면 최신 기사 및 유튜브를 조회할 수 있습니다
        </p>
      </div>

      <div className="mt-4 w-full max-w-[700px]">
        <div className="rounded-[10px]">
          <div className="px-4 py-4">
            <PoliticianBoardMobile />
          </div>
        </div>
      </div>
    </section>
  );
}
