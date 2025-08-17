'use client';

import { useMemo, useState } from 'react';
import Input from '@/components/ui/button/SearchInput';
import PoliticianItem from './politicianItem';
import { POLITICIANS } from '@/constants/politicians';

export default function PoliticianBoard() {
  const [query, setQuery] = useState('');
  const list = useMemo(() => {
    const q = query.trim();
    const src = q ? POLITICIANS.filter(p => p.name.includes(q) || p.party.includes(q)) : POLITICIANS;
    return src.slice(0, 10);
  }, [query]);

  return (
    <div className="flex w-full max-w-[900px] flex-col items-center gap-6">
      <div className="w-full">
        <Input
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="선택한 인물 또는 정당으로 검색하세요"
          onClick={() => {}}
        />
      </div>
      <div className="grid w-full grid-cols-1 place-items-center gap-4 md:grid-cols-2 lg:grid-cols-3">
        {list.map((p) => (
          <PoliticianItem key={p.name} item={p as any} />
        ))}
      </div>
    </div>
  );
}
