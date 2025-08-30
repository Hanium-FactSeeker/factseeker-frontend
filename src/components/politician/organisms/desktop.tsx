'use client';

import { useState } from 'react';
import Input from '@/components/ui/button/SearchInput';
import PoliticianBoard from '../molecules/politicianBoardDesktop';
import ClientTime from '@/components/common/ClientTime';

const Magnifier = () => (
  <svg width="25" height="25" viewBox="0 0 24 24" aria-hidden>
    <circle
      cx="11"
      cy="11"
      r="7"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
    />
    <line
      x1="17"
      y1="17"
      x2="22"
      y2="22"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
    />
  </svg>
);

export default function PoliticianDesktop() {
  const [query, setQuery] = useState('');

  return (
    <section className="flex w-full flex-col items-center">
      <div className="mx-auto mt-14 w-full max-w-[1200px] px-4">
        <h2 className="text-black-normal text-center text-[22px] leading-7 font-bold">
          오늘의 인기 정치인 TOP 12
        </h2>
        <p className="text-black-alternative mt-3 text-center text-[14px] font-medium">
          인물을 선택하면 최신 기사 및 유튜브를 조회할 수 있습니다
        </p>
      </div>

      <div className="mt-6 flex w-full max-w-[1200px] items-end justify-between gap-10 px-4">
        <Input
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="순위에 없는 다른 정치인을 검색해 보세요"
          onClick={() => {}}
          iconRight={<Magnifier />}
          className="h-14 w-[70%] rounded-[20px] border-[#D9DBDC]"
        />
        <ClientTime className="text-gray-strong mr-2 text-[12px] font-medium whitespace-nowrap" />
      </div>

      <div className="mt-6 w-full max-w-[1200px] px-4">
        <div
          className="mx-auto w-full rounded-[10px] bg-white shadow-[0_4px_4px_rgba(0,0,0,0.08)]"
          style={{ border: '2px solid var(--gray-normal)' }}
        >
          <div className="px-6 py-6">
            <PoliticianBoard query={query} />
          </div>
        </div>
      </div>
    </section>
  );
}
