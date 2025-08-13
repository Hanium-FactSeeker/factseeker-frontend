'use client';

import { useMemo, useState } from 'react';
import Input from '@/components/ui/button/SearchInput';
import { ToggleButton } from '@/components/ui/button/ToggleButton';
import SnsCard from '@/components/ui/sns/SnsCard';
import { snsData, SnsItem } from '@/constants/snsData';
import DefaultHeader from '@/components/header/DefaultHeader';
import Footer from '@/components/footer/index';

const PAGE_SIZE = 10;

export default function Desktop() {
  const [query, setQuery] = useState('');
  const [sortKey, setSortKey] = useState<'latest' | 'trust'>('trust');
  const [page, setPage] = useState(1);

  const filtered: SnsItem[] = useMemo(() => {
    const q = query.trim();
    let list = snsData;
    if (q) list = list.filter((p) => p.name.includes(q));
    if (sortKey === 'trust') {
      list = [...list].sort((a, b) => b.percentage - a.percentage);
    } else {
      list = [...list].reverse();
    }
    return list;
  }, [query, sortKey]);

  const totalPages = Math.max(1, Math.ceil(filtered.length / PAGE_SIZE));
  const current = filtered.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE);

  return (
    <>
      <DefaultHeader isLoggedIn={false} />
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
            <div className="flex items-center gap-2">
              <ToggleButton
                label="최신순"
                color={sortKey === 'latest' ? 'purple' : 'gray'}
                size="sm"
                onClick={() => {
                  setPage(1);
                  setSortKey('latest');
                }}
              />
              <ToggleButton
                label="신뢰 높은 순"
                color={sortKey === 'trust' ? 'purple' : 'gray'}
                size="sm"
                onClick={() => {
                  setPage(1);
                  setSortKey('trust');
                }}
              />
            </div>
          </div>

          <div className="mt-6 grid grid-cols-5 gap-6">
            {current.map((p) => (
              <SnsCard
                key={p.id}
                type={p.type as any}
                name={p.name}
                party={p.party}
                percentage={p.percentage}
                figureImg={p.figureImg ?? ''}
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
                      ? 'px-3 py-1 rounded bg-primary-normal text-white'
                      : 'px-3 py-1 rounded bg-gray-light text-black-normal hover:bg-gray-normal'
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
      <Footer />
    </>
  );
}
