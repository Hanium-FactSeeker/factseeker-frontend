'use client';

import { useEffect, useRef, useState } from 'react';
import PoliticianItem from './politicianItem';

type Stat = { fact: number; gpt: number; claude: number };
type Item = { name: string; party: string; img: string; stats: Stat; href?: string };

interface Props { items: Item[] }

export default function PoliticianCarousel({ items }: Props) {
  const ref = useRef<HTMLDivElement>(null);
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const onScroll = () => {
      const card = el.querySelector('[data-card]') as HTMLElement | null;
      if (!card) return;
      const gap = 20; // gap-5
      const w = card.offsetWidth + gap;
      setIndex(Math.round(el.scrollLeft / w));
    };
    el.addEventListener('scroll', onScroll, { passive: true });
    return () => el.removeEventListener('scroll', onScroll);
  }, []);

  const scrollTo = (i: number) => {
    const el = ref.current;
    if (!el) return;
    const card = el.querySelector('[data-card]') as HTMLElement | null;
    if (!card) return;
    const gap = 20;
    const w = card.offsetWidth + gap;
    el.scrollTo({ left: i * w, behavior: 'smooth' });
  };

  const go = (dir: -1 | 1) => {
    const next = Math.max(0, Math.min(index + dir, items.length - 1));
    scrollTo(next);
  };

  return (
    <div className="relative w-full md:hidden">
      <button
        className="absolute left-3 top-1/2 z-10 -translate-y-1/2 rounded-full border border-gray-normal bg-white/95 px-2 py-1 text-xl shadow"
        onClick={() => go(-1)}
        aria-label="이전"
      >
        ‹
      </button>
      <button
        className="absolute right-3 top-1/2 z-10 -translate-y-1/2 rounded-full border border-gray-normal bg-white/95 px-2 py-1 text-xl shadow"
        onClick={() => go(1)}
        aria-label="다음"
      >
        ›
      </button>

      <div
        ref={ref}
        className="no-scrollbar flex snap-x snap-mandatory gap-5 overflow-x-auto py-2"
        style={{
          scrollPaddingLeft: 'calc((100vw - 320px)/2)',
          scrollPaddingRight: 'calc((100vw - 320px)/2)',
        }}
      >
        {items.map((p) => (
          <div
            key={p.name}
            data-card
            className="snap-center shrink-0 w-[320px]"
          >
            <PoliticianItem item={p as any} />
          </div>
        ))}
      </div>

      <div className="mt-3 flex justify-center gap-1.5">
        {items.map((_, i) => (
          <span
            key={i}
            onClick={() => scrollTo(i)}
            className={`h-2 w-2 cursor-pointer rounded-full transition ${
              i === index ? 'bg-primary-normal' : 'bg-gray-normal'
            }`}
          />
        ))}
      </div>
    </div>
  );
}
