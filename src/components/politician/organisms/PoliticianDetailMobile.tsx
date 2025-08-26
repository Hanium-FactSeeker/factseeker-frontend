'use client';

import { useMemo, useState } from 'react';
import PoliticianImage from '@/components/ui/profile/PoliticianImage';
import SwitchButton from '@/components/ui/button/SwitchButton';
import VideoCard from '@/components/politician/molecules/VideoCard';
import type { VideoItem } from '@/constants/videoList';

import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';

type Stat = { fact: number; gpt: number; claude: number };
type Politician = {
  name: string;
  party: string;
  img?: string;
  figureImg?: string;
  stats: Stat;
};

interface Props {
  politician: Politician;
  videos: VideoItem[];
  news?: VideoItem[];          // ⬅️ 모바일도 뉴스 받기
  updatedAt?: string;
}

export default function PoliticianDetailMobile({
  politician,
  videos,
  news = [],
  updatedAt,
}: Props) {
  const imgSrc = politician.img ?? politician.figureImg ?? '';
  const [tab, setTab] = useState<'news' | 'youtube'>('youtube');

  const pageSize = 5;
  const list = tab === 'youtube' ? videos : news;

  const slides: VideoItem[][] = useMemo(() => {
    const chunks: VideoItem[][] = [];
    for (let i = 0; i < list.length; i += pageSize) {
      chunks.push(list.slice(i, i + pageSize));
    }
    return chunks.length ? chunks : [[]];
  }, [list]);

  const cumulative = `${Math.round(politician.stats.fact ?? 0)}%`;

  return (
    <section className="w-full rounded-2xl border border-gray-200 bg-white p-4">
      {/* 상단 인물 요약 */}
      <div className="mb-4 rounded-2xl border border-gray-200 p-4">
        <p className="mb-3 text-center text-lg font-extrabold text-black-normal">선택 인물</p>

        <div className="mb-4 flex items-center justify-center gap-3">
          <div className="relative h-16 w-16 shrink-0">
            <PoliticianImage src={imgSrc} alt={`${politician.name} 이미지`} />
          </div>
          <div className="min-w-0">
            <p className="truncate text-base font-bold text-black-normal">{politician.name}</p>
            <p className="mt-0.5 truncate text-xs text-black-normal">{politician.party}</p>
          </div>
        </div>

        <div className="py-2 text-center text-xs text-black-normal">
          <span className="font-medium">누적 신뢰도: </span>
          <span className="font-bold">{cumulative}</span>
        </div>
      </div>

      {/* 탭 */}
      <div className="mb-3">
        <SwitchButton
          value={tab}
          onChange={(val) => setTab(val as 'news' | 'youtube')}
          options={[
            { label: '뉴스기사 모아보기', value: 'news' },
            { label: '유튜브 모아보기', value: 'youtube' },
          ]}
          className="w-full justify-between"
        />
      </div>

      {/* 업데이트 시간 */}
      <div className="flex items-center justify-end border-b border-gray-200 px-2 py-3">
        {updatedAt && <p className="text-[11px] text-gray-500">{updatedAt}</p>}
      </div>

      {/* 리스트: 두 탭 모두 스와이퍼 사용 */}
      {list.length ? (
        <div className="pt-2">
          <Swiper
            className="mobile-video-swiper"
            modules={[Navigation, Pagination]}
            navigation
            pagination={{ clickable: true }}
            slidesPerView={1}
            spaceBetween={8}
          >
            {slides.map((chunk, i) => (
              <SwiperSlide key={i}>
                <div className="px-2">
                  {chunk.map((v) => (
                    // ⬇️ 모바일은 카드가 커 보였으므로 compact 옵션으로 살짝 축소
                    <VideoCard key={v.id} video={v} compact />
                  ))}
                </div>
              </SwiperSlide>
            ))}
          </Swiper>

          <style jsx global>{`
            .mobile-video-swiper { padding-bottom: 16px; }
            .mobile-video-swiper .swiper-pagination {
              position: static !important;
              margin-top: 6px;
            }
            .mobile-video-swiper .swiper-pagination-bullet {
              width: 6px; height: 6px; background: #d1d5db; opacity: 1;
            }
            .mobile-video-swiper .swiper-pagination-bullet-active {
              background: #111827;
            }
            .mobile-video-swiper .swiper-button-prev,
            .mobile-video-swiper .swiper-button-next {
              color: #374151;
              width: 26px; height: 26px;
              top: auto; bottom: 0;
            }
            .mobile-video-swiper .swiper-button-prev { left: 12px; }
            .mobile-video-swiper .swiper-button-next { right: 12px; }
            .mobile-video-swiper .swiper-button-prev:after,
            .mobile-video-swiper .swiper-button-next:after { font-size: 16px; }
            .mobile-video-swiper .swiper-button-disabled { opacity: .35; }
          `}</style>
        </div>
      ) : (
        <div className="flex h-[260px] items-center justify-center text-xs text-gray-500">
          {tab === 'youtube' ? '영상 데이터가 없습니다.' : '뉴스 데이터가 없습니다.'}
        </div>
      )}
    </section>
  );
}
