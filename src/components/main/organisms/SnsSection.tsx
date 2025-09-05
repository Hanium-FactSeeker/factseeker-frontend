'use client';

import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';

import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination } from 'swiper/modules';

import SnsCard from '@/components/ui/sns/SnsCard';
import SectionTitle from '@/components/ui/title/SectionTitle';
import { snsData } from '@/constants/snsData';
import type { SnsType } from '@/types/logo';

const SnsSection = () => {
  return (
    <div className="mx-auto h-auto w-[90%] overflow-hidden md:w-[1000px]">
      <SectionTitle link="/sns" title="오늘의 정치 SNS 모아보기 &gt;" />
      <Swiper
        spaceBetween={12}
        slidesPerView={1}
        navigation
        pagination={{ clickable: true }}
        modules={[Navigation, Pagination]}
        breakpoints={{
          0: { slidesPerView: 2, slidesPerGroup: 2 },
          640: { slidesPerView: 3, slidesPerGroup: 3 },
          1024: { slidesPerView: 4, slidesPerGroup: 4 },
        }}
      >
        {snsData.map((item, idx) => (
          <SwiperSlide key={idx} className={idx === 0 ? 'ml-[1%]' : ''}>
            <SnsCard
              name={item.name}
              party={item.party}
              type={item.type as SnsType}
              percentage={item.percentage}
              figureImg={item.figureImg ?? ''}
              url={item.url}
              post={item.post}
              postedAt={item.postedAt}
            />
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default SnsSection;
