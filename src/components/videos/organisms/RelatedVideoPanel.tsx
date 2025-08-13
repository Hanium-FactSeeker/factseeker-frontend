'use client';

import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';

import type { VideoItem } from '@/types/videos';
import RelatedCard from '../molecules/RelatedCard';

type Props = { items?: VideoItem[] };

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
