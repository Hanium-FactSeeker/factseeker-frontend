'use client';

import { useEffect, useMemo, useState } from 'react';
import SearchInput from '@/components/ui/search';
import PoliticianItemMobile from '../atoms/politicianItemMobile';
import {
  fetchPoliticiansPage,
  fetchTopScoresSummary,
  searchPoliticianScoresByName,
} from '@/apis/politician/politician';

type Stat = { fact: number; gpt: number; claude: number };
type CardItem = {
  id?: number;
  name: string;
  party: string;
  img: string;
  stats: Stat;
};

type SearchScoreRow = {
  id?: number;
  politicianId?: number;
  politicianName?: string;
  politicianParty?: string;
  analysisDate?: string;
  overallScore?: number;
  gptScore?: number;
  geminiScore?: number;
  trustScore?: number;
  totalScore?: number;
  name?: string;
  party?: string;
  profileImageUrl?: string | null;
};

const safeImg = (u?: string | null) =>
  u && u !== 'null' && u !== 'undefined' ? u : '';
const normalizeName = (name?: string) =>
  (name ?? '').replace(/\s+/g, '').trim();
const dateKey = (s?: string) => (s ? new Date(s).getTime() || 0 : 0);

const imgOf = (v: unknown) =>
  safeImg(
    typeof v === 'function' ? undefined : (v as string | null | undefined),
  );

function kstNowText() {
  const now = new Date();
  const utc = now.getTime() + now.getTimezoneOffset() * 60000;
  const kst = new Date(utc + 9 * 60 * 60000);
  const yy = kst.getFullYear();
  const mm = String(kst.getMonth() + 1).padStart(2, '0');
  const dd = String(kst.getDate()).padStart(2, '0');
  const hh = String(kst.getHours()).padStart(2, '0');
  const mi = String(kst.getMinutes()).padStart(2, '0');
  return `${yy}년 ${mm}월 ${dd}일 기준 ${hh}:${mi}`;
}

function toScores(r: SearchScoreRow) {
  const overall = r.overallScore ?? r.trustScore ?? r.totalScore ?? 0;
  const gpt = r.gptScore ?? 0;
  const gemini = r.geminiScore ?? 0;
  return {
    overall: Math.round(overall),
    gpt: Math.round(gpt),
    gemini: Math.round(gemini),
  };
}

function dedupLatest(rows: SearchScoreRow[]) {
  const map = new Map<string, SearchScoreRow>();
  for (const row of rows) {
    const key = normalizeName(row.politicianName || row.name);
    if (!key) continue;
    const prev = map.get(key);
    if (!prev) {
      map.set(key, row);
      continue;
    }
    const dNew = dateKey(row.analysisDate);
    const dOld = dateKey(prev.analysisDate);
    if (dNew > dOld) {
      map.set(key, row);
    } else if (dNew === dOld) {
      const sNew = (row.overallScore ??
        row.trustScore ??
        row.totalScore ??
        0) as number;
      const sOld = (prev.overallScore ??
        prev.trustScore ??
        prev.totalScore ??
        0) as number;
      if (sNew >= sOld) map.set(key, row);
    }
  }
  return Array.from(map.values());
}

export default function PoliticianBoardMobile() {
  const [query, setQuery] = useState('');
  const [updatedAt, setUpdatedAt] = useState('');
  const [loading, setLoading] = useState(true);

  const [basicMap, setBasicMap] = useState<
    Record<string, { id?: number; party?: string; img?: string }>
  >({});

  const [topCards, setTopCards] = useState<CardItem[]>([]);

  const q = query.trim();
  const pageSize = 10;
  const [page, setPage] = useState(0);
  const [searching, setSearching] = useState(false);
  const [searchAll, setSearchAll] = useState<CardItem[]>([]);
  const [totalPages, setTotalPages] = useState(0);

  useEffect(() => {
    let mounted = true;
    (async () => {
      try {
        setLoading(true);

        const basics = await fetchPoliticiansPage(0, 1000);
        if (!mounted) return;
        const bm: Record<
          string,
          { id?: number; party?: string; img?: string }
        > = {};
        (basics.politicians ?? []).forEach((p) => {
          bm[p.name] = {
            id: p.id,
            party: p.party || '',
            img: safeImg(p.profileImageUrl),
          };
        });
        setBasicMap(bm);

        const top = await fetchTopScoresSummary();
        if (!mounted) return;
        const cards: CardItem[] = (top ?? []).slice(0, 10).map((s) => ({
          id: bm[s.name]?.id ?? s.id,
          name: s.name,
          party: s.party || bm[s.name]?.party || '',
          img: bm[s.name]?.img || imgOf((s as any).profileImageUrl), // 🔧 imgOf
          stats: {
            fact: Math.round(
              s.overallScore ?? s.trustScore ?? s.totalScore ?? 0,
            ),
            gpt: Math.round(s.gptScore ?? 0),
            claude: Math.round(s.geminiScore ?? 0),
          },
        }));
        setTopCards(cards);
      } catch (e) {
        console.error('mobile board init error', e);
      } finally {
        if (mounted) {
          setLoading(false);
          setUpdatedAt(kstNowText());
        }
      }
    })();
    return () => {
      mounted = false;
    };
  }, []);

  useEffect(() => {
    setPage(0);
  }, [q]);

  useEffect(() => {
    let alive = true;
    if (!q) {
      setSearchAll([]);
      setTotalPages(0);
      return;
    }

    const t = setTimeout(async () => {
      try {
        setSearching(true);

        const resp: any = await (searchPoliticianScoresByName as any)(
          q,
          /*page*/ 0,
          /*size*/ 500,
        );
        const payload = (resp?.data ?? resp) || {};
        const listRaw: SearchScoreRow[] = Array.isArray(payload)
          ? payload
          : (payload.politicians ??
            payload.results ??
            payload.items ??
            payload.data ??
            []);

        const latest = dedupLatest(listRaw);

        const cards: CardItem[] = latest.map((row) => {
          const name = row.politicianName || row.name || '';
          const meta = basicMap[name] || {};
          const s = toScores(row);
          return {
            id: meta.id ?? row.politicianId ?? row.id,
            name,
            party: row.politicianParty || row.party || meta.party || '',
            img: meta.img || imgOf((row as any).profileImageUrl),
            stats: { fact: s.overall, gpt: s.gpt, claude: s.gemini },
          };
        });

        setSearchAll(cards);
        setTotalPages(Math.max(1, Math.ceil(cards.length / pageSize)));
      } catch (e) {
        console.error('mobile scores/search mapping error', e);
        setSearchAll([]);
        setTotalPages(0);
      } finally {
        setSearching(false);
      }
    }, 200);

    return () => {
      alive = false;
      clearTimeout(t);
    };
  }, [q, basicMap]);

  const list = useMemo(() => {
    if (searching) return [];
    if (q) {
      const start = page * pageSize;
      return searchAll.slice(start, start + pageSize);
    }
    return topCards;
  }, [q, searching, searchAll, page, pageSize, topCards]);

  return (
    <div className="w-full">
      <SearchInput
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeHolder="순위에 없는 정치인도 검색해보세요"
        onClick={() => {}}
      />
      <div className="mt-4 flex flex-col gap-5">
        <span className="text-gray-strong ml-3 text-xs font-normal">
          {updatedAt || '로딩 중…'}
        </span>
      </div>

      {loading ? (
        <div className="mt-6 rounded-[12px] border border-gray-200 bg-white p-4 text-center text-sm text-gray-500">
          불러오는 중…
        </div>
      ) : searching ? (
        <div className="mt-6 rounded-[12px] border border-gray-200 bg-white p-4 text-center text-sm text-gray-500">
          검색 중…
        </div>
      ) : (
        <div className="mt-4 flex flex-col gap-5">
          {list.map((p, i) => (
            <PoliticianItemMobile
              key={`${p.name}-${p.id ?? i}`}
              item={p as any}
            />
          ))}
          {!list.length && (
            <div className="rounded-[12px] border border-gray-200 bg-white p-4 text-center text-sm text-gray-500">
              결과가 없어요.
            </div>
          )}

          {q && totalPages > 1 && (
            <div className="flex items-center justify-center gap-3 pb-2 text-xs text-gray-600">
              <button
                className="rounded border border-gray-300 px-2 py-1 disabled:opacity-50"
                onClick={() => setPage((p) => Math.max(0, p - 1))}
                disabled={page <= 0}
              >
                이전
              </button>
              <span className="px-2">
                {page + 1} / {totalPages}
              </span>
              <button
                className="rounded border border-gray-300 px-2 py-1 disabled:opacity-50"
                onClick={() => setPage((p) => Math.min(totalPages - 1, p + 1))}
                disabled={page >= totalPages - 1}
              >
                다음
              </button>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
