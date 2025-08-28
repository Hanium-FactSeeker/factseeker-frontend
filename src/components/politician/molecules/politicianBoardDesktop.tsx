'use client';

import { useEffect, useMemo, useRef, useState } from 'react';
import PoliticianItemDesktop, {
  PoliticianTopItem,
} from '../atoms/politicianItemDesktop';
import {
  fetchPoliticiansPage,
  fetchTopScoresSummary,
  searchPoliticianScoresByName,
} from '@/apis/politician/politician';

interface Props {
  query: string;
}

type Basics = Record<
  string,
  { id?: number; profileImageUrl?: string | null; party?: string }
>;

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

export default function PoliticianBoardDesktop({ query }: Props) {
  const [loading, setLoading] = useState(true);
  const [top, setTop] = useState<PoliticianTopItem[]>([]);
  const [basicsMap, setBasicsMap] = useState<Basics>({});
  const inited = useRef(false);

  const q = (query ?? '').trim();
  const pageSize = 12;
  const [page, setPage] = useState(0);
  const [searching, setSearching] = useState(false);
  const [searchAll, setSearchAll] = useState<PoliticianTopItem[]>([]);
  const [totalPages, setTotalPages] = useState(0);

  useEffect(() => {
    if (inited.current) return;
    inited.current = true;

    let alive = true;
    (async () => {
      try {
        setLoading(true);

        const basics = await fetchPoliticiansPage(0, 1000);
        if (!alive) return;
        const bm: Basics = {};
        (basics.politicians ?? []).forEach((p) => {
          bm[p.name] = {
            id: p.id,
            profileImageUrl: safeImg(p.profileImageUrl),
            party: p.party,
          };
        });
        setBasicsMap(bm);

        const top12 = await fetchTopScoresSummary();
        if (!alive) return;
        const mappedTop: PoliticianTopItem[] = (top12 ?? [])
          .slice(0, 12)
          .map((s) => ({
            id: bm[s.name]?.id ?? s.id,
            name: s.name,
            party: s.party || bm[s.name]?.party || '',
            profileImageUrl:
              bm[s.name]?.profileImageUrl || imgOf((s as any).profileImageUrl),
            overallScore: Math.round(
              s.overallScore ?? s.trustScore ?? s.totalScore ?? 0,
            ),
            gptScore: Math.round(s.gptScore ?? 0),
            geminiScore: Math.round(s.geminiScore ?? 0),
          }));
        setTop(mappedTop);
      } catch (e) {
        console.error('politician board init error', e);
      } finally {
        if (alive) setLoading(false);
      }
    })();

    return () => {
      alive = false;
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
          0,
          500,
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

        const all: PoliticianTopItem[] = latest.map((row) => {
          const name = row.politicianName || row.name || '';
          const base = basicsMap[name] || {};
          const scores = toScores(row);
          return {
            id: base.id ?? row.politicianId ?? row.id,
            name,
            party: row.politicianParty || row.party || base.party || '',
            profileImageUrl:
              base.profileImageUrl ?? imgOf((row as any).profileImageUrl),
            overallScore: scores.overall,
            gptScore: scores.gpt,
            geminiScore: scores.gemini,
          };
        });

        setSearchAll(all);
        setTotalPages(Math.max(1, Math.ceil(all.length / pageSize)));
      } catch (e) {
        console.error('scores/search mapping error', e);
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
  }, [q, basicsMap]);

  const visible = useMemo(() => {
    if (searching) return null;
    if (q) {
      const start = page * pageSize;
      return searchAll.slice(start, start + pageSize);
    }
    return top;
  }, [q, searching, searchAll, page, pageSize, top]);

  const row1 = (visible ?? []).slice(0, 6);
  const row2 = (visible ?? []).slice(6, 12);

  if (loading) {
    return (
      <div className="itemscenter flex w-full max-w-[1200px] flex-col gap-6">
        <div className="w-full rounded-xl border border-gray-200 bg-white p-6 text-center text-sm text-gray-500">
          불러오는 중…
        </div>
      </div>
    );
  }
  if (searching) {
    return (
      <div className="flex w-full max-w-[1200px] flex-col items-center gap-6">
        <div className="w-full rounded-xl border border-gray-200 bg-white p-6 text-center text-sm text-gray-500">
          검색 중…
        </div>
      </div>
    );
  }
  if (!visible?.length) {
    return (
      <div className="flex w-full max-w-[1200px] flex-col items-center gap-6">
        <div className="w-full rounded-xl border border-gray-200 bg-white p-6 text-center text-sm text-gray-500">
          결과가 없습니다.
        </div>
      </div>
    );
  }

  return (
    <div className="flex w-full max-w-[1200px] flex-col items-center gap-6">
      <div className="w-full">
        <div className="grid grid-cols-6 gap-x-6 gap-y-6">
          {row1.map((p, i) => (
            <PoliticianItemDesktop
              key={`r1-${i}-${p.id ?? p.name}`}
              item={{ ...p, party: p.party ?? '' }}
            />
          ))}
        </div>
        <div className="mt-6 grid grid-cols-6 gap-x-6 gap-y-6">
          {row2.map((p, i) => (
            <PoliticianItemDesktop
              key={`r2-${i}-${p.id ?? p.name}`}
              item={{ ...p, party: p.party ?? '' }}
            />
          ))}
        </div>

        {q && totalPages > 1 && (
          <div className="mt-6 flex items-center justify-center gap-3 text-sm text-gray-600">
            <button
              className="rounded border border-gray-300 px-3 py-1 disabled:opacity-50"
              onClick={() => setPage((p) => Math.max(0, p - 1))}
              disabled={page <= 0}
            >
              이전
            </button>
            <span className="px-2">
              {page + 1} / {totalPages}
            </span>
            <button
              className="rounded border border-gray-300 px-3 py-1 disabled:opacity-50"
              onClick={() => setPage((p) => Math.min(totalPages - 1, p + 1))}
              disabled={page >= totalPages - 1}
            >
              다음
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
