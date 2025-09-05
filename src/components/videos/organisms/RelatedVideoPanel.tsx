'use client';

import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';

import type { VideoItem } from '@/types/videos';
import RelatedCard from '../molecules/RelatedCard';

type Props = {
  items?: VideoItem[];
  loading?: boolean;
  error?: string | null;
  keyword?: string | null;
};

/**
 * 연관 영상 조회 컴포넌트
 *
 * - 키워드가 선택되지 않았을 경우 '키워드를 선택해 주세요' 문구를 중앙에 표시했습니다.
 * - 선택된 키워드에 맞는 영상 목록을 캐러셀로 구현했습니다.
 * - Swiper 라이브러리를 사용해 네비게이션 및 페이지네이션 기능을 사용했습니다.
 */
const RelatedVideoPanel = ({ items, loading, error, keyword }: Props) => {
  const data = items ?? [];
  return (
    <div className="border-gray-normal h-full min-h-44 rounded-2xl border">
      <div className="flex items-center justify-between px-4 pt-4 md:px-6 md:pt-6">
        <h4 className="md:text-md text-sm font-medium">연관 영상</h4>
        {keyword ? (
          <span className="rounded-full bg-gray-100 px-2 py-0.5 text-xs text-gray-600">
            {keyword}
          </span>
        ) : null}
      </div>

      {loading ? (
        <div className="flex h-40 items-center justify-center md:h-72">
          <span className="text-sm opacity-70">연관 영상을 불러오는 중…</span>
        </div>
      ) : error ? (
        <div className="flex h-40 items-center justify-center md:h-72">
          <span className="text-sm text-red-400">{error}</span>
        </div>
      ) : !data.length ? (
        <div className="flex h-40 items-center justify-center md:h-72">
          <span className="font-semibold text-gray-400 md:text-lg">키워드를 선택해 주세요</span>
        </div>
      ) : (
        <div className="px-4 pb-6">
          <Swiper
            spaceBetween={12}
            slidesPerView={1}
            slidesPerGroup={1}
            navigation
            pagination={{ clickable: true }}
            modules={[Navigation, Pagination]}
          >
            {data.map((v, idx) => (
              <SwiperSlide key={`${v.id}-${idx}`} className={`${idx === 0 ? 'ml-[1%]' : ''}`}>
                <RelatedCard item={v} />
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      )}
    </div>
  );
};

export default RelatedVideoPanel;
