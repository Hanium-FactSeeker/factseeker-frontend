'use client';

import { useEffect, useMemo, useState } from 'react';
import PoliticianDetailDesktop from '@/components/politician/organisms/PoliticianDetailDesktop';
import PoliticianDetailMobile from '@/components/politician/organisms/PoliticianDetailMobile';
import { searchPoliticianScoresByName } from '@/apis/politician/politician';
import type { VideoItem } from '@/constants/videoList';

type Stat = { fact: number; gpt: number; claude: number };
type Politician = { name: string; party: string; img?: string; stats: Stat };

type Props = { name: string };

function pickLatest(rows: any[] = []) {
  const dateKey = (s?: string) => (s ? new Date(s).getTime() || 0 : 0);
  return rows.reduce((best: any, cur: any) => {
    if (!best) return cur;
    const nd = dateKey(cur.analysisDate);
    const bd = dateKey(best.analysisDate);
    if (nd > bd) return cur;
    if (nd === bd) {
      const ns = cur.overallScore ?? cur.trustScore ?? cur.totalScore ?? 0;
      const bs = best.overallScore ?? best.trustScore ?? best.totalScore ?? 0;
      return ns >= bs ? cur : best;
    }
    return best;
  }, null);
}

export default function PoliticianDetailClient({ name }: Props) {
  const [loading, setLoading] = useState(true);
  const [politician, setPolitician] = useState<Politician>({
    name,
    party: '',
    img: '',
    stats: { fact: 0, gpt: 0, claude: 0 },
  });

  const videos: VideoItem[] = [];
  const updatedAt = useMemo(() => {
    const now = new Date();
    const utc = now.getTime() + now.getTimezoneOffset() * 60000;
    const kst = new Date(utc + 9 * 60 * 60000);
    const yy = kst.getFullYear();
    const mm = String(kst.getMonth() + 1).padStart(2, '0');
    const dd = String(kst.getDate()).padStart(2, '0');
    const hh = String(kst.getHours()).padStart(2, '0');
    const mi = String(kst.getMinutes()).padStart(2, '0');
    return `${yy}년 ${mm}월 ${dd}일 ${hh}:${mi} 업데이트`;
  }, []);

  useEffect(() => {
    let alive = true;
    (async () => {
      try {
        setLoading(true);
        const resp: any = await (searchPoliticianScoresByName as any)(name, 0, 50);
        const payload = (resp?.data ?? resp) || {};
        const list: any[] = Array.isArray(payload)
          ? payload
          : payload.politicians ?? payload.results ?? payload.items ?? payload.data ?? [];

        const picked = pickLatest(list) || {};
        const overall = Math.round(picked.overallScore ?? picked.trustScore ?? picked.totalScore ?? 0);
        const gpt = Math.round(picked.gptScore ?? 0);
        const gemini = Math.round(picked.geminiScore ?? 0);

        const imgRaw =
          picked.profileImageUrl ?? picked.img ?? picked.figureImg ?? '';
        const safeImg = imgRaw && imgRaw !== 'null' && imgRaw !== 'undefined' ? imgRaw : '';

        if (!alive) return;
        setPolitician({
          name: picked.politicianName || picked.name || name,
          party: picked.politicianParty || picked.party || '',
          img: safeImg,
          stats: { fact: overall, gpt, claude: gemini },
        });
      } catch (e) {
        console.error('[politician detail] fetch error', e);
        if (!alive) return;
        setPolitician((p) => ({ ...p, name }));
      } finally {
        if (alive) setLoading(false);
      }
    })();
    return () => {
      alive = false;
    };
  }, [name]);

  if (loading) {
    return (
      <div className="w-full rounded-2xl border border-gray-200 bg-white p-6 text-center text-sm text-gray-500">
        불러오는 중…
      </div>
    );
  }

  return (
    <>
      <div className="hidden w-full md:block">
        <PoliticianDetailDesktop
          politician={politician}
          videos={videos}
          updatedAt={updatedAt}
        />
      </div>
      <div className="w-full md:hidden">
        <PoliticianDetailMobile
          politician={politician}
          videos={videos}
          updatedAt={updatedAt}
        />
      </div>
    </>
  );
}
