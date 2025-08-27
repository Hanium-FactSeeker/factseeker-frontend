'use client';

import { useMemo, useState } from 'react';
import Link from 'next/link';
import PoliticianImage from '@/components/ui/profile/PoliticianImage';
import VideoRow from '@/components/politician/molecules/VideoRow';
import SwitchButton from '@/components/ui/button/SwitchButton';
import type { VideoItem } from '@/constants/videoList';
import { maskTail } from '@/utils/maskTail';
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
  news: VideoItem[];
  updatedAt?: string;
}

export default function PoliticianDetailDesktop({
  politician,
  videos,
  news,
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
    <section className="w-full rounded-2xl border border-gray-200 bg-white p-6">
      <div className="mb-5">
        <Link
          href="/politician"
          className="text-sm font-medium text-gray-500 hover:underline"
        >
          {'< 다시 선택'}
        </Link>
      </div>

      <div className="grid grid-cols-[40%_60%] gap-2">
        <aside className="w-full max-w-[360px] justify-self-center rounded-[12px] p-6">
          <div className="mb-6 rounded-2xl border border-gray-200 p-5">
            <p className="text-black-normal mb-4 text-center text-xl font-extrabold">
              선택 인물
            </p>

            <div className="mb-5 flex items-center justify-center gap-4">
              <div className="relative h-20 w-20 shrink-0">
                <PoliticianImage
                  src={imgSrc}
                  alt={`${politician.name} 이미지`}
                />
              </div>
              <div className="min-w-0">
                <p className="text-black-normal truncate text-lg font-bold">
                  {maskTail(politician.name, 1)}
                </p>
                <p className="text-black-normal mt-1 truncate text-sm">
                  {politician.party}
                </p>
              </div>
            </div>

            <div className="text-black-normal mb-6 py-3 text-center text-sm">
              <span className="font-medium">누적 신뢰도: </span>
              <span className="font-bold">{cumulative}</span>
            </div>
          </div>

          <SwitchButton
            value={tab}
            onChange={(val) => {
              setTab(val as 'news' | 'youtube');
            }}
            options={[
              { label: '뉴스기사 모아보기', value: 'news' },
              { label: '유튜브 모아보기', value: 'youtube' },
            ]}
            className="w-full justify-between"
          />
          <style jsx>{`
            [role='tablist'] button {
              width: auto !important;
              flex: 0 0 auto !important;
            }
          `}</style>
        </aside>

        <section className="min-w-0 rounded-[12px]">
          <div className="flex items-center justify-end border-b border-gray-200 px-6 py-4">
            {updatedAt && <p className="text-xs text-gray-500">{updatedAt}</p>}
          </div>

          {/* ✅ 두 탭 모두 Swiper로 통일 (스타일 그대로) */}
          {list.length ? (
            <div className="pt-2">
              <Swiper
                className="desktop-video-swiper"
                modules={[Navigation, Pagination]}
                navigation
                pagination={{ clickable: true }}
                slidesPerView={1}
                spaceBetween={8}
              >
                {slides.map((chunk, i) => (
                  <SwiperSlide key={i}>
                    <div className="px-4">
                      {chunk.map((v) => (
                        <VideoRow key={v.id} video={v} />
                      ))}
                    </div>
                  </SwiperSlide>
                ))}
              </Swiper>

              <style jsx global>{`
                .desktop-video-swiper {
                  padding-bottom: 20px;
                }
                .desktop-video-swiper .swiper-pagination {
                  position: static !important;
                  margin-top: 8px;
                }
                .desktop-video-swiper .swiper-pagination-bullet {
                  width: 7px;
                  height: 7px;
                  background: #d1d5db;
                  opacity: 1;
                }
                .desktop-video-swiper .swiper-pagination-bullet-active {
                  background: #111827;
                }
                .desktop-video-swiper .swiper-button-prev,
                .desktop-video-swiper .swiper-button-next {
                  color: #374151;
                  width: 28px;
                  height: 28px;
                  top: auto;
                  bottom: 0; /* ← 하단에 배치 */
                }
                .desktop-video-swiper .swiper-button-prev {
                  left: 14px;
                }
                .desktop-video-swiper .swiper-button-next {
                  right: 14px;
                }
                .desktop-video-swiper .swiper-button-prev:after,
                .desktop-video-swiper .swiper-button-next:after {
                  font-size: 18px;
                }
                .desktop-video-swiper .swiper-button-disabled {
                  opacity: 0.35;
                }
              `}</style>
            </div>
          ) : (
            <div className="flex h-[320px] items-center justify-center text-sm text-gray-500">
              {tab === 'youtube'
                ? '영상 데이터가 없습니다.'
                : '뉴스 데이터가 없습니다.'}
            </div>
          )}
        </section>
      </div>
    </section>
  );
}
