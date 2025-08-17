'use client';

import { BadgeType } from '@/types/validity';
import { HotVideosProps } from '@/types/videos';

import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination } from 'swiper/modules';
import VideoItemMobile from '../../molecules/MainVideoItem.mobile';
import Link from 'next/link';

const MobileHotVideosSection = ({ videos }: HotVideosProps) => {
  const slicedVideos = videos.slice(0, 6);

  return (
    <div className="mt-4 flex px-2">
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
        {slicedVideos.map((item, idx) => (
          <SwiperSlide key={idx} className={`${idx === 0 ? 'ml-[1%]' : ''}`}>
            {idx === slicedVideos.length - 1 ? (
              <div className="flex h-52 w-36 flex-col justify-center text-sm font-semibold">
                <p>인기 영상을 </p>
                <p> 더 보고 싶다면? </p>
                <Link
                  className="text-primary-normal mt-2 font-bold"
                  href={'/videos'}
                >
                  바로가기 &gt;
                </Link>
              </div>
            ) : (
              <VideoItemMobile idx={idx} video={item} />
            )}
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default MobileHotVideosSection;
