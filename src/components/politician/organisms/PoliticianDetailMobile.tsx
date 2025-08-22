'use client';

import { useMemo, useState } from 'react';
import Link from 'next/link';
import PoliticianImage from '@/components/ui/profile/PoliticianImage';
import ReliabilityStat from '@/components/ui/validity';
import SwitchButton from '@/components/ui/button/SwitchButton';
import VideoCard from '@/components/politician/molecules/VideoCard';
import type { VideoItem } from '@/constants/videoList';
import SearchInput from '@/components/ui/search';

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
  updatedAt?: string;
}

export default function PoliticianDetailMobile({ politician, videos, updatedAt }: Props) {
  const imgSrc = politician.img ?? politician.figureImg ?? '';

  const [tab, setTab] = useState<'news' | 'youtube'>('youtube');
  const [page, setPage] = useState(1);
  const pageSize = 5;

  const [keyword, setKeyword] = useState('');

  const list = tab === 'youtube' ? videos : [];
  const slides: VideoItem[][] = useMemo(() => {
    const chunks: VideoItem[][] = [];
    for (let i = 0; i < list.length; i += pageSize) {
      chunks.push(list.slice(i, i + pageSize));
    }
    return chunks.length ? chunks : [[]];
  }, [list]);

  return (
    <section className="w-full md:hidden">
      <div className="mb-4">
        <SearchInput
          placeHolder="순위에 없는 다른 정치인도 검색해 보세요"
          value={keyword}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) => setKeyword(e.target.value)}
          onClick={() => {}}
        />
      </div>

      <div className="mt-6 mb-2 flex items-center justify-end">
        {updatedAt && <p className="text-[11px] text-gray-500">{updatedAt}</p>}
      </div>

      <div className="rounded-2xl border border-gray-200 bg-white p-5">
        <div className="mb-3">
          <Link href="/politician" className="text-sm font-medium text-gray-500 hover:underline">
            {'< 다시 선택'}
          </Link>
        </div>

        <div className="mb-5 flex items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="relative h-16 w-16 shrink-0">
              <PoliticianImage src={imgSrc} alt={`${politician.name} 이미지`} />
            </div>
            <div className="min-w-0">
              <p className="truncate text-base font-bold text-black-normal">{politician.name}</p>
              <p className="mt-1 truncate text-xs text-black-normal">{politician.party}</p>
            </div>
          </div>

          <div className="flex min-w-[150px] flex-col gap-2 text-left">
            <ReliabilityStat iconWidth={16} iconHeight={16} name="팩씨" value={politician.stats.fact} />
            <ReliabilityStat iconWidth={16} iconHeight={16} name="GPT" value={politician.stats.gpt} />
            <ReliabilityStat iconWidth={16} iconHeight={16} name="Claude" value={politician.stats.claude} />
          </div>
        </div>

        <SwitchButton
          value={tab}
          onChange={(val) => {
            setTab(val as 'news' | 'youtube');
            setPage(1);
          }}
          options={[
            { label: '뉴스기사 모아보기', value: 'news' },
            { label: '유튜브 모아보기', value: 'youtube' },
          ]}
          className="w-full justify-between"
        />
        <style jsx>{`
          [role='tablist'] button { width: auto !important; flex: 0 0 auto !important; }
        `}</style>
      </div>

      {tab === 'youtube' ? (
        <div className="mt-4">
          <Swiper
            className="video-pager"
            modules={[Navigation, Pagination]}
            navigation
            pagination={{ clickable: true }}
            spaceBetween={8}
            slidesPerView={1}
            onSlideChange={(s) => setPage(s.activeIndex + 1)}
          >
            {slides.map((chunk, i) => (
              <SwiperSlide key={i}>
                <div className="grid grid-cols-1 gap-3">
                  {chunk.map((v) => (
                    <VideoCard key={v.id} video={v} />
                  ))}
                </div>
              </SwiperSlide>
            ))}
          </Swiper>

          <style jsx global>{`
            .video-pager { padding-bottom: 16px; }
            .video-pager .swiper-pagination { position: static !important; }
            .video-pager .swiper-pagination-bullet {
              width: 6px; height: 6px; background: #d1d5db; opacity: 1;
            }
            .video-pager .swiper-pagination-bullet-active { background: #111827; }
            .video-pager .swiper-button-prev,
            .video-pager .swiper-button-next {
              color: #374151; width: 24px; height: 24px; top: auto; bottom: 0;
            }
            .video-pager .swiper-button-prev:after,
            .video-pager .swiper-button-next:after { font-size: 18px; }
            .video-pager .swiper-button-disabled { opacity: .35; }
          `}</style>
        </div>
      ) : (
        <div className="mt-6 flex h-[200px] items-center justify-center text-xs text-gray-500">
          뉴스 데이터 준비 중입니다.
        </div>
      )}
    </section>
  );
}
