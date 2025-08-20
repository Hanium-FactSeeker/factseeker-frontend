'use client';

import { useMemo, useState } from 'react';
import SearchInput from '@/components/ui/search';
import PoliticianItemMobile from '../atoms/politicianItemMobile';
import { POLITICIANS } from '@/constants/politicians';

const Magnifier = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" aria-hidden>
    <circle cx="11" cy="11" r="7" fill="none" stroke="currentColor" strokeWidth="2" />
    <line x1="17" y1="17" x2="22" y2="22" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
  </svg>
);

export default function PoliticianBoardMobile() {
  const [query, setQuery] = useState('');

  const list = useMemo(() => {
    const q = query.trim();
    const src = q
      ? POLITICIANS.filter((p) => p.name.includes(q) || p.party.includes(q))
      : POLITICIANS;
    return src.slice(0, 10);
  }, [query]);

  return (
    <div className="w-full ">
      <SearchInput
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeHolder="순위에 없는 정치인도 검색해보세요"
        onClick={() => {}}
      />
      <div className="mt-4 flex flex-col gap-5">

      <span className="text-gray-strong text-xs font-normal ml-3">
        2000년 00월 00일 기준 00:00
      </span>
      </div>
      <div className="mt-4 flex flex-col gap-5">
        {list.map((p) => (
          <PoliticianItemMobile key={p.name} item={p as any} />
        ))}
      </div>
    </div>
  );
}
