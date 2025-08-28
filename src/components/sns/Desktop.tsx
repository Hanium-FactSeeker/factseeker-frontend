'use client';

import { useMemo, useState } from 'react';
import Input from '@/components/ui/button/SearchInput';
import SwitchButton from '@/components/ui/button/SwitchButton';
import SnsCard from '@/components/ui/sns/SnsCard';
import { snsData, SnsItem } from '@/constants/snsData';

const PAGE_SIZE = 10;

export default function Desktop() {
  const [query, setQuery] = useState('');
  const [sortKey, setSortKey] = useState<'latest' | 'trust'>('trust');
  const [page, setPage] = useState(1);

  const filtered: SnsItem[] = useMemo(() => {
    const q = query.trim();
    let list = snsData;
    if (q) list = list.filter((p) => p.name.includes(q));
    if (sortKey === 'trust')
      list = [...list].sort((a, b) => b.percentage - a.percentage);
    else list = [...list].reverse();
    return list;
  }, [query, sortKey]);

  const totalPages = Math.max(1, Math.ceil(filtered.length / PAGE_SIZE));
  const current = filtered.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE);

  return (
    <section className="bg-background text-foreground">
      <div className="mx-auto max-w-[1280px] px-6 pt-6">
        <div className="flex items-center gap-4">
          <div className="flex-1">
            <Input
              placeholder="모아보고 싶은 정치인을 검색해 보세요"
              iconRight={<span className="text-black-alternative">🔍</span>}
              value={query}
              onChange={(e) => {
                setPage(1);
                setQuery(e.target.value);
              }}
            />
          </div>

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

        <div className="mt-6 grid grid-cols-5 gap-6">
          {current.map((p, i) => (
            <SnsCard
              key={`${p.name}-${i}`}
              type={p.type as any}
              name={p.name}
              party={p.party}
              percentage={p.percentage}
              figureImg={p.figureImg ?? ''}
              post={p.post}
              postedAt={p.postedAt}
              url={p.url}
            />
          ))}
        </div>

        <div className="mt-8 flex items-center justify-center gap-2">
          {Array.from({ length: totalPages }).map((_, i) => {
            const n = i + 1;
            const active = n === page;
            return (
              <button
                key={n}
                className={
                  active
                    ? 'bg-primary-normal rounded px-3 py-1 text-white'
                    : 'bg-gray-light text-black-normal hover:bg-gray-normal rounded px-3 py-1'
                }
                onClick={() => setPage(n)}
              >
                {n}
              </button>
            );
          })}
        </div>
      </div>
    </section>
  );
}
