'use client';

import { useEffect, useMemo, useState } from 'react';
import PoliticianDetailDesktop from '@/components/politician/organisms/PoliticianDetailDesktop';
import PoliticianDetailMobile from '@/components/politician/organisms/PoliticianDetailMobile';
import { searchPoliticianScoresByName } from '@/apis/politician/politician';
import { searchNewsByKeyword } from '@/apis/politician/news';
import { searchYoutubeByKeyword } from '@/apis/politician/youtube';
import { getOgImage } from '@/apis/common/og';
import type { VideoItem } from '@/constants/videoList';

type ScoreRow = {
  politicianName?: string;
  name?: string;
  politicianParty?: string;
  party?: string;
  analysisDate?: string;
  overallScore?: number;
  trustScore?: number;
  totalScore?: number;
  gptScore?: number;
  geminiScore?: number;
  profileImageUrl?: string | null;
};

const dateKey = (s?: string) => (s ? new Date(s).getTime() || 0 : 0);
const pickLatest = (rows: ScoreRow[] = []) =>
  rows.reduce<ScoreRow | null>((best, cur) => {
    if (!best) return cur;
    const nd = dateKey(cur.analysisDate);
    const bd = dateKey(best.analysisDate);
    if (nd > bd) return cur;
    if (nd === bd) {
      const ns = (cur.overallScore ?? cur.trustScore ?? cur.totalScore ?? 0) as number;
      const bs = (best.overallScore ?? best.trustScore ?? best.totalScore ?? 0) as number;
      return ns >= bs ? cur : best;
    }
    return best;
  }, null);

const safeImg = (u?: string | null) =>
  u && u !== 'null' && u !== 'undefined' ? u : '';

const domainLabel = (url = '') => {
  try {
    const host = new URL(url).hostname;
    const parts = host.split('.').slice(-2).join('.');
    return parts.replace('.co.kr', '').replace('.com', '').replace('.kr', '');
  } catch {
    return '';
  }
};

function mapNewsToVideoItems(
  news: { title: string; link: string; pubDate?: string }[],
): VideoItem[] {
  return news.map((n) => ({
    id: n.link,
    title: n.title,
    link: n.link,
    channelName: domainLabel(n.link),
    publishedAt: n.pubDate,
  })) as unknown as VideoItem[];
}

function mapYoutubeToVideoItems(
  vs: {
    url: string;
    title: string;
    thumbnailUrl?: string;
    updatedAt?: string;
  }[],
): VideoItem[] {
  return vs.map((v) => ({
    id: v.url,
    title: v.title,
    link: v.url,
    channelName: '',
    publishedAt: v.updatedAt,
    thumbnail: v.thumbnailUrl,
    thumbnailUrl: v.thumbnailUrl,
  })) as unknown as VideoItem[];
}

async function enrichNewsThumbnails(items: VideoItem[], signal?: AbortSignal) {
  const enriched: VideoItem[] = [];
  for (const it of items) {
    let thumb = (it as any).thumbnail as string | undefined;
    if (!thumb) thumb = (it as any).thumbnailUrl as string | undefined;
    if (!thumb) {
      const og = await getOgImage(it.link, signal);
      if (og) thumb = og;
      else {
        try {
          const host = new URL(it.link).hostname;
          thumb = `https://www.google.com/s2/favicons?sz=128&domain=${host}`;
        } catch {}
      }
    }
    enriched.push({ ...it, thumbnail: thumb, thumbnailUrl: thumb } as any);
  }
  return enriched;
}

export default function PoliticianDetailClient({ name }: { name: string }) {
  const [loadingCard, setLoadingCard] = useState(true);
  const [loadingNews, setLoadingNews] = useState(true);
  const [loadingVideos, setLoadingVideos] = useState(true);

  const [politician, setPolitician] = useState<{
    name: string;
    party: string;
    img?: string;
    stats: { fact: number; gpt: number; claude: number };
  }>({
    name,
    party: '',
    img: '',
    stats: { fact: 0, gpt: 0, claude: 0 },
  });

  const [news, setNews] = useState<VideoItem[]>([]);
  const [videos, setVideos] = useState<VideoItem[]>([]);

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
    const ac = new AbortController();

    (async () => {
      try {
        setLoadingCard(true);
        const scoresResp: any = await (searchPoliticianScoresByName as any)(
          name,
          0,
          50,
        );
        const payload = (scoresResp?.data ?? scoresResp) || {};
        const list: ScoreRow[] = Array.isArray(payload)
          ? payload
          : (payload.politicians ??
              payload.results ??
              payload.items ??
              payload.data ??
              []);
        const picked = pickLatest(list) || {};

        const overall = Math.round(
          (picked.overallScore ??
            picked.trustScore ??
            picked.totalScore ??
            0) as number,
        );
        const gpt = Math.round(picked.gptScore ?? 0);
        const gemini = Math.round(picked.geminiScore ?? 0);

        if (alive) {
          setPolitician({
            name: picked.politicianName || picked.name || name,
            party: picked.politicianParty || picked.party || '',
            img: safeImg(picked.profileImageUrl),
            stats: { fact: overall, gpt, claude: gemini },
          });
        }
      } catch (e) {
        console.warn('[scores] load failed:', e);
      } finally {
        if (alive) setLoadingCard(false);
      }
    })();

    (async () => {
      try {
        setLoadingNews(true);
        const newsRes = await searchNewsByKeyword(name, {
          sort: 'date',
          display: 10,
          signal: ac.signal,
        });
        const base = mapNewsToVideoItems(newsRes.items || []);
        const withThumbs = await enrichNewsThumbnails(base, ac.signal);
        if (alive) setNews(withThumbs);
      } catch (e) {
        if (alive) setNews([]);
        console.warn('[news] load failed:', e);
      } finally {
        if (alive) setLoadingNews(false);
      }
    })();

    (async () => {
      try {
        setLoadingVideos(true);
        const ytRes = await searchYoutubeByKeyword(name, { signal: ac.signal });
        const raw = ytRes.items || [];
        if (alive)
          setVideos(
            mapYoutubeToVideoItems(
              raw.map((r: any) => ({
                url: r.url,
                title: r.title,
                thumbnailUrl: r.thumbnailUrl,
                updatedAt: r.updatedAt,
              })),
            ),
          );
      } catch (e) {
        if (alive) setVideos([]);
        console.warn('[youtube] load failed:', e);
      } finally {
        if (alive) setLoadingVideos(false);
      }
    })();

  return () => {
      alive = false;
      ac.abort();
    };
  }, [name]);

  return (
    <>
      <div className="hidden w-full md:block">
        <PoliticianDetailDesktop
          politician={politician}
          videos={videos}
          news={news}
          updatedAt={updatedAt}
          loadingCard={loadingCard}
          loadingNews={loadingNews}
          loadingVideos={loadingVideos}
        />
      </div>
      <div className="w-full md:hidden">
        <PoliticianDetailMobile
          politician={politician}
          videos={videos}
          news={news}
          updatedAt={updatedAt}
          loadingCard={loadingCard}
          loadingNews={loadingNews}
          loadingVideos={loadingVideos}
        />
      </div>
    </>
  );
}
