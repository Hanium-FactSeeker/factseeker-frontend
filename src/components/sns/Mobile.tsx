"use client";

import { useMemo, useState } from "react";
import Input from "@/components/ui/button/SearchInput";
import { ToggleButton } from "@/components/ui/button/ToggleButton";
import SnsCard from "@/components/ui/sns/SnsCard";
import { snsData, SnsItem } from "@/constants/snsData";
import DefaultHeader from "@/components/header/DefaultHeader";
import Footer from "@/components/footer";

const PAGE_SIZE = 1;

const Magnifier = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" aria-hidden>
    <circle cx="11" cy="11" r="6" fill="none" stroke="#979999" strokeWidth="2" />
    <line x1="16" y1="16" x2="21" y2="21" stroke="#979999" strokeWidth="2" strokeLinecap="round" />
  </svg>
);

export default function Mobile() {
  const [query, setQuery] = useState("");
  const [sortKey, setSortKey] = useState<"latest" | "trust">("trust");
  const [page, setPage] = useState(1);

  const filtered: SnsItem[] = useMemo(() => {
    const q = query.trim();
    let list = snsData;
    if (q) list = list.filter((p) => p.name.includes(q));
    if (sortKey === "trust") list = [...list].sort((a, b) => b.percentage - a.percentage);
    else list = [...list].reverse();
    return list;
  }, [query, sortKey]);

  const totalPages = Math.max(1, Math.ceil(filtered.length / PAGE_SIZE));
  const current = filtered.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE);

  const goPrev = () => setPage((p) => (p > 1 ? p - 1 : p));
  const goNext = () => setPage((p) => (p < totalPages ? p + 1 : p));

  return (
    <>
      <DefaultHeader isLoggedIn={false} />

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
              className="min-w-0 border-gray-normal text-black-normal"
            />

            <div className="flex shrink-0 gap-2">
              <ToggleButton
                label="최신순"
                size="xxs"
                color={sortKey === "latest" ? "purple" : "gray"}
                onClick={() => { setPage(1); setSortKey("latest"); }}
              />
              <ToggleButton
                label="신뢰 높은 순"
                size="xxs"
                color={sortKey === "trust" ? "purple" : "gray"}
                onClick={() => { setPage(1); setSortKey("trust"); }}
              />
            </div>
          </div>
          
          <div className="mt-5 flex items-center justify-center">
            <button
              aria-label="prev"
              onClick={goPrev}
              className="mr-3 h-9 w-9 rounded-full border border-gray-normal text-black-normal"
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
                  figureImg={p.figureImg ?? ""}
                  className="mx-auto w-52 h-80 md:w-56 md:h-84"
                />
              ))}
            </div>

            <button
              aria-label="next"
              onClick={goNext}
              className="ml-3 h-9 w-9 rounded-full border border-gray-normal text-black-normal"
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
                  className={active ? "h-2 w-2 rounded-full bg-primary-normal" : "h-2 w-2 rounded-full bg-gray-normal"}
                />
              );
            })}
          </div>
        </div>
      </section>

      <Footer />
    </>
  );
}
