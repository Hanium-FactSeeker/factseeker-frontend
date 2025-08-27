'use client';

import { useEffect, useState } from 'react';
import { getHotVideos } from '@/apis/videos/getHotVideos';
import { getPercents } from '@/apis/videos/getPercents';
import { VideoItem } from '@/types/videos';
import DefaultHeader from '@/components/header/DefaultHeader';
import FilterBar from '@/components/ui/filterBar.tsx';
import Desktop from '@/components/videos/organisms/VideoLists.desktop';
import Mobile from '@/components/videos/organisms/VideoLists.mobile';
import Footer from '@/components/footer';

const Video = () => {
  const [videos, setVideos] = useState<VideoItem[]>([]);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    (async () => {
      try {
        // 1) TOP 10 영상 조회
        const all = await getHotVideos(10);

        // 2) TOP 10 영상의 신뢰도 조회
        const ids = all.map((v) => v.id);
        const percents = ids.length ? await getPercents(ids) : [];
        const merged: VideoItem[] = all.map((v) => {
          const p = percents.find((r) => r.videoId === v.id);
          const raw = p?.totalConfidenceScore ?? null;
          const score =
            raw === null ? null : typeof raw === 'number' ? raw : Number(raw);

          if (
            p?.status === 'COMPLETED' &&
            score !== null &&
            !Number.isNaN(score)
          ) {
            return { ...v, gradePercent: score, gradeStatus: 'COMPLETED' };
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
        console.error('[Videos] error:', err?.response ?? err);
        setError(err?.message ?? '영상 목록을 불러오지 못했습니다');
      }
    })();
  }, []);

  return (
    <>
      <DefaultHeader isLoggedIn={false} />
      <div className="flex min-h-screen w-full flex-col items-center gap-8">
        <FilterBar />
        <h3 className="text-Black_normal mt-4 ml-24 self-start text-lg font-semibold">
          오늘의 인기 영상 TOP 10
        </h3>
        <div className="hidden md:block">
          <Desktop videos={videos} />
        </div>
        <div className="block md:hidden">
          <Mobile videos={videos} />
        </div>
      </div>
      <Footer />
    </>
  );
};

export default Video;
