'use client';

import { useMemo } from 'react';
import PoliticianItemDesktop from '../atoms/politicianItemDesktop';
import { POLITICIANS } from '@/constants/politicians';

interface Props {
  query: string; // ⬅️ 상위에서 내려받는 검색어
}

export default function PoliticianBoardDesktop({ query }: Props) {
  const list = useMemo(() => {
    const q = (query ?? '').trim();
    const src = q
      ? POLITICIANS.filter((p) => p.name.includes(q) || p.party.includes(q))
      : POLITICIANS;
    return src.slice(0, 10);
  }, [query]);

  const row1 = list.slice(0, 5);
  const row2 = list.slice(5, 10);

  return (
    <div className="flex w-full max-w-[960px] flex-col items-center gap-6 md:max-w-[976px]">
      {/* 🔥 인풋은 제거하고 카드 그리드만 남김 */}
      <div className="w-full">
        <div className="grid grid-cols-5 gap-x-6 gap-y-6">
          {row1.map((p) => (
            <PoliticianItemDesktop key={p.name} item={p as any} />
          ))}
        </div>
        <div className="mt-6 grid grid-cols-5 gap-x-6 gap-y-6">
          {row2.map((p) => (
            <PoliticianItemDesktop key={p.name} item={p as any} />
          ))}
        </div>
      </div>
    </div>
  );
}
