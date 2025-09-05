'use client';

import { useEffect, useState } from 'react';
import SectionTitle from '@/components/ui/title/SectionTitle';
import Desktop from './HotVideos.desktop';
import Mobile from './HotVideos.mobile';
import { getHotVideos } from '@/apis/videos/getHotVideos';
import type { VideoItem } from '@/types/videos';
import { getPercents } from '@/apis/videos/getPercents';

export default function HotVideos() {
  const [videos, setVideos] = useState<VideoItem[]>([]);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    (async () => {
      try {
        // 1) TOP 10 영상 조회
        const all = await getHotVideos(10);
        const sliced = all.slice(0, 5);

        // 2) TOP 10 영상의 신뢰도 조회
        const ids = sliced.map((v) => v.id);
        const percents = await getPercents(ids);

        const merged: VideoItem[] = sliced.map((v) => {
          const p = percents.find((r) => r.videoId === v.id);
          const score = p?.totalConfidenceScore ?? null;
          const numScore = score === null ? null : Number(score);

          if (p?.status === 'COMPLETED' && numScore !== null) {
            return { ...v, gradePercent: numScore, gradeStatus: 'COMPLETED' };
          }
          if (p?.status === 'FAILED') {
            return { ...v, gradePercent: null, gradeStatus: 'FAILED' };
          }
          return {
            ...v,
            gradePercent: null,
            gradeStatus:
              p?.status === 'COMPLETED' ||
              p?.status === 'FAILED' ||
              p?.status === 'PENDING' ||
              p?.status === 'UNKNOWN'
                ? p.status
                : 'PENDING',
          };
        });
        setVideos(merged);
      } catch (err: any) {
        console.error('[HotVideos] error:', err?.response ?? err);
        setError(err?.message ?? '영상 목록을 불러오지 못했습니다');
      }
    })();
  }, []);

  return (
    <div className="w-[90%] md:w-[1000px]">
      <SectionTitle title="오늘의 TOP 10 정치 유튜브 &gt;" link="/videos" />
      <div className="hidden md:block">
        <Desktop videos={videos} />
      </div>
      <div className="block md:hidden">
        <Mobile videos={videos} />
      </div>
    </div>
  );
}
