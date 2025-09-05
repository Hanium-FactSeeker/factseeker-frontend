'use client';

import { useMemo, useState } from 'react';
import Input from '@/components/ui/button/SearchInput';
import SwitchButton from '@/components/ui/button/SwitchButton';
import SnsCard from '@/components/ui/sns/SnsCard';
import type { SnsItem } from '@/constants/snsData';
import { snsData } from '@/constants/snsData';

const PAGE_SIZE = 1;

const Magnifier = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" aria-hidden>
    <circle cx="11" cy="11" r="6" fill="none" stroke="#979999" strokeWidth="2" />
    <line x1="16" y1="16" x2="21" y2="21" stroke="#979999" strokeWidth="2" strokeLinecap="round" />
  </svg>
);

export default function Mobile() {
  const [query, setQuery] = useState('');
  const [sortKey, setSortKey] = useState<'latest' | 'trust'>('trust');
  const [page, setPage] = useState(1);

  const filtered: SnsItem[] = useMemo(() => {
    const q = query.trim();
    let list = snsData;
    if (q) list = list.filter((p) => p.name.includes(q));
    if (sortKey === 'trust') list = [...list].sort((a, b) => b.percentage - a.percentage);
    else list = [...list].reverse();
    return list;
  }, [query, sortKey]);

  const totalPages = Math.max(1, Math.ceil(filtered.length / PAGE_SIZE));
  const current = filtered.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE);

  const goPrev = () => setPage((p) => (p > 1 ? p - 1 : p));
  const goNext = () => setPage((p) => (p < totalPages ? p + 1 : p));

  return (
    <section className="bg-background text-foreground">
      <div className="mx-auto w-full px-4 pt-4">
        <div className="grid grid-cols-[minmax(0,1fr)_auto] items-center gap-3">
          <Input
            placeholder="정치인 이름 검색"
            value={query}
            onChange={(e) => {
              setPage(1);
              setQuery(e.target.value);
            }}
            inputSize="sm"
            fullWidth
            iconLeft={<Magnifier />}
            className="border-gray-normal text-black-normal min-w-0"
          />

          <SwitchButton
            value={sortKey}
            onChange={(val) => {
              setPage(1);
              setSortKey(val as 'latest' | 'trust');
            }}
            options={[
              { label: '최신순', value: 'latest' },
              { label: '신뢰성 높은 순', value: 'trust' },
            ]}
            className="shrink-0"
          />
        </div>

        <div className="mt-5 flex items-center justify-center">
          <button
            aria-label="prev"
            onClick={goPrev}
            className="border-gray-normal text-black-normal mr-3 h-9 w-9 rounded-full border"
          >
            ‹
          </button>

          <div className="w-full max-w-[360px]">
            {current.map((p, i) => (
              <SnsCard
                key={`${p.name}-${i}`}
                type={p.type as any}
                name={p.name}
                party={p.party}
                percentage={p.percentage}
                figureImg={p.figureImg ?? ''}
                className="mx-auto h-80 w-52 md:h-84 md:w-56"
                post={p.post}
                postedAt={p.postedAt}
                url={p.url}
              />
            ))}
          </div>

          <button
            aria-label="next"
            onClick={goNext}
            className="border-gray-normal text-black-normal ml-3 h-9 w-9 rounded-full border"
          >
            ›
          </button>
        </div>

        <div className="mt-3 mb-12 flex items-center justify-center gap-1">
          {Array.from({ length: totalPages }).map((_, i) => {
            const n = i + 1;
            const active = n === page;
            return (
              <span
                key={n}
                className={
                  active
                    ? 'bg-primary-normal h-2 w-2 rounded-full'
                    : 'bg-gray-normal h-2 w-2 rounded-full'
                }
              />
            );
          })}
        </div>
      </div>
    </section>
  );
}
