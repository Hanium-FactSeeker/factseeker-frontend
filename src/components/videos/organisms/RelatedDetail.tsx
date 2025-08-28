'use client';

import { useEffect, useMemo, useRef, useState } from 'react';
import { VideoSummary } from '../molecules/VideoSummary';
import { KeywordList } from '../molecules/KeywordList';
import RelatedVideoPanel from '../organisms/RelatedVideoPanel';
import { getRelatedKeywords } from '@/apis/videos/getRelatedKeywords';
import { getVideosByKeyword } from '@/apis/videos/getVideosByKeyword';
import type { VideoItem } from '@/types/videos';

type Props = {
  videoId: string;
  initialVideo?: { id: string; title?: string; thumbnail?: string };
};

const RelatedDesktopLayout = ({ videoId, initialVideo }: Props) => {
  const [keywords, setKeywords] = useState<string[]>([]);
  const [selected, setSelected] = useState<string | null>(null);

  const [kwLoading, setKwLoading] = useState(true);
  const [kwError, setKwError] = useState<string | null>(null);

  const [relItems, setRelItems] = useState<VideoItem[] | undefined>(undefined);
  const [relLoading, setRelLoading] = useState(false);
  const [relError, setRelError] = useState<string | null>(null);

  // 간단 캐시 (키워드 → 결과)
  const cacheRef = useRef<Map<string, VideoItem[]>>(new Map());

  // 키워드 목록 가져오기
  useEffect(() => {
    if (!videoId) {
      setKwLoading(false);
      setKwError('videoId가 없습니다.');
      setKeywords([]);
      return;
    }

    let cancelled = false;

    (async () => {
      setKwLoading(true);
      setKwError(null);
      try {
        const ks = await getRelatedKeywords(videoId);
        if (!cancelled) {
          setKeywords(ks);
        }
      } catch (e: any) {
        if (!cancelled)
          setKwError(e?.message ?? '키워드를 불러오지 못했습니다.');
      } finally {
        if (!cancelled) setKwLoading(false);
      }
    })();

    return () => {
      cancelled = true;
    };
  }, [videoId]);

  // 키워드 선택 시 연관 영상 조회
  useEffect(() => {
    if (!selected) {
      setRelItems(undefined);
      setRelError(null);
      setRelLoading(false);
      return;
    }

    // 캐시에 있으면 사용
    const cached = cacheRef.current.get(selected);
    if (cached) {
      setRelItems(cached);
      setRelError(null);
      setRelLoading(false);
      return;
    }

    let cancelled = false;
    setRelLoading(true);
    setRelError(null);

    (async () => {
      try {
        const items = await getVideosByKeyword(selected);
        if (!cancelled) {
          cacheRef.current.set(selected, items);
          setRelItems(items);
        }
      } catch (e: any) {
        if (!cancelled) {
          setRelError(
            e?.response?.data?.message ?? e?.message ?? '연관 영상 조회 실패',
          );
          setRelItems([]);
        }
      } finally {
        if (!cancelled) setRelLoading(false);
      }
    })();

    return () => {
      cancelled = true;
    };
  }, [selected]);

  const summary = useMemo(
    () => ({
      id: initialVideo?.id ?? videoId,
      title: initialVideo?.title ?? '(제목 없음)',
      thumbnail: initialVideo?.thumbnail ?? '',
      link: `https://www.youtube.com/watch?v=${initialVideo?.id ?? videoId}`,
      channelName: '',
    }),
    [initialVideo?.id, initialVideo?.thumbnail, initialVideo?.title, videoId],
  );

  return (
    <div className="mt-6 flex w-full flex-col gap-2 p-4 md:w-[1100px] md:flex-row md:gap-6">
      {/* 좌측: 요약 + 키워드 */}
      <div className="flex flex-col items-center gap-4 md:w-[60%]">
        <VideoSummary video={summary} />
        <hr className="border-gray-normal w-full" />

        <h4 className="text-sm font-medium md:text-lg">연관 키워드</h4>
        <div className="border-gray-normal flex w-full items-center justify-center rounded-2xl border p-4 md:h-70">
          {kwLoading ? (
            <div className="py-8 text-sm opacity-70">키워드를 불러오는 중…</div>
          ) : kwError ? (
            <div className="py-8 text-sm text-red-400">{kwError}</div>
          ) : keywords.length === 0 ? (
            <div className="py-8 text-sm opacity-70">키워드가 없습니다.</div>
          ) : (
            <KeywordList
              keywords={keywords}
              selected={selected}
              onSelect={(k) => setSelected((prev) => (prev === k ? null : k))}
            />
          )}
        </div>
      </div>

      {/* 우측: 관련 영상 패널 */}
      <div className="flex w-full flex-col justify-center md:w-[40%]">
        <RelatedVideoPanel
          items={relItems}
          loading={relLoading}
          error={relError}
          keyword={selected}
        />
      </div>
    </div>
  );
};

export default RelatedDesktopLayout;
