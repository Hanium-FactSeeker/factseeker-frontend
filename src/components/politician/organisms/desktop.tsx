'use client';

import { useState } from 'react';
import Input from '@/components/ui/button/SearchInput';
import PoliticianBoard from '../molecules/politicianBoardDesktop';
import ClientTime from '@/components/common/ClientTime';

const Magnifier = () => (
  <svg width="25" height="25" viewBox="0 0 24 24" aria-hidden>
    <circle cx="11" cy="11" r="7" fill="none" stroke="currentColor" strokeWidth="2" />
    <line x1="17" y1="17" x2="22" y2="22" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
  </svg>
);

export default function PoliticianDesktop() {
  const [query, setQuery] = useState('');

  return (
    <section className="flex w-full flex-col items-center">
      <div className="mt-14 w-full max-w-[1200px] px-4">
        <h2 className="text-Black_normal text-[22px] font-bold leading-7 text-center">
          오늘의 인기 정치인 TOP 12
        </h2>
        <p className="mt-3 text-Black_alternative text-[14px] font-medium text-center">
          인물을 선택하면 최신 기사 및 유튜브를 조회할 수 있습니다
        </p>
      </div>

      <div className="mt-6 w-full max-w-[1200px] px-4">
        <div className="flex w-full items-center gap-3">
          <Input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="순위에 없는 다른 정치인도 검색해 보세요"
            onClick={() => {}}
            iconRight={<Magnifier />}
            className="h-14 w-full rounded-[20px] border-[#D9DBDC]"
          />
          <ClientTime className="mt-4 whitespace-nowrap text-gray-strong text-[12px] font-medium" />
        </div>
      </div>

      <div className="mt-6 w-full max-w-[1200px] px-4">
        <div
          className="mx-auto w-full rounded-[10px] bg-white shadow-[0_4px_4px_rgba(0,0,0,0.08)]"
          style={{ border: '1px solid var(--gray-normal)' }}
        >
          <div className="px-6 py-6">
            <PoliticianBoard query={query} />
          </div>
        </div>
      </div>
    </section>
  );
}
