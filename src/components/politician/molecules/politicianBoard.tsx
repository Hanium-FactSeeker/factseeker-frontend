'use client';

import { useMemo, useState } from 'react';
import Input from '@/components/ui/button/SearchInput';
import PoliticianItem from './politicianItem';
import { POLITICIANS } from '@/constants/politicians';

const Magnifier = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" aria-hidden>
    <circle cx="11" cy="11" r="7" fill="none" stroke="currentColor" strokeWidth="2" />
    <line x1="17" y1="17" x2="22" y2="22" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
  </svg>
);

export default function PoliticianBoard() {
  const [query, setQuery] = useState('');
  const list = useMemo(() => {
    const q = query.trim();
    const src = q ? POLITICIANS.filter(p => p.name.includes(q) || p.party.includes(q)) : POLITICIANS;
    return src.slice(0, 10);
  }, [query]);

  return (
    <div className="flex w-full max-w-[1000px] flex-col items-center gap-6">
      {/* 돋보기 아이콘 왼쪽에 붙임 */}
      <Input
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder="선택한 인물 또는 정당으로 검색하세요"
        onClick={() => {}}
        iconLeft={<Magnifier />}
        className="w-[92%] h-10 text-sm md:h-14 md:text-base md:max-w-[900px]"
      />

      <div className="grid w-full grid-cols-1 place-items-center gap-4 md:grid-cols-2 lg:grid-cols-3">
        {list.map((p) => (
          <PoliticianItem key={p.name} item={p as any} />
        ))}
      </div>
    </div>
  );
}
