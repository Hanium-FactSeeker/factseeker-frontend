'use client';

import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';

import type { VideoItem } from '@/types/videos';
import RelatedCard from '../molecules/RelatedCard';

type Props = { items?: VideoItem[] };

/**
 * 연관 영상 조회 컴포넌트
 *
 * - 키워드가 선택되지 않았을 경우 '키워드를 선택해 주세요' 문구를 중앙에 표시했습니다.
 * - 선택된 키워드에 맞는 영상 목록을 캐러셀로 구현했습니다.
 * - Swiper 라이브러리를 사용해 네비게이션 및 페이지네이션 기능을 사용했습니다.
 */
const RelatedVideoPanel = ({ items }: Props) => {
  const data = items ?? [];

  return (
    <div className="border-gray-normal h-full min-h-44 rounded-2xl border">
      <h4 className="md:text-md self-start px-4 pt-4 text-sm font-medium md:px-6 md:pt-6">
        연관 영상
      </h4>

      {!data.length ? (
        <div className="flex h-40 items-center justify-center md:h-72">
          <span className="font-semibold text-gray-400 md:text-lg">
            키워드를 선택해 주세요
          </span>
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
              <SwiperSlide
                key={`${v.title}-${idx}`}
                className={`${idx === 0 ? 'ml-[1%]' : ''}`}
              >
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
