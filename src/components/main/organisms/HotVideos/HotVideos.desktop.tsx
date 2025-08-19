'use client';

import MainVideoList from '../../molecules/MainVideoItem.desktop';
import FactBadge from '@/components/ui/factBadge';
import { ValidityType } from '@/types/validity';
import { HotVideosProps } from '@/types/videos';

const DesktopHotVideosSection = ({ videos }: HotVideosProps) => {
  const slicedVideos = videos.slice(0, 5);

  return (
    <div className="mt-13 flex px-2">
      <div className="flex basis-1/3 flex-col items-center gap-y-4">
        <p className="text-black-normal ml-9 self-start text-2xl font-extrabold">
          Top1
        </p>
        <a
          href={videos[0]?.link}
          target="_blank"
          className="relative flex h-36 w-64 items-center justify-center"
        >
          <img
            src={slicedVideos[0]?.thumbnail}
            alt="썸네일"
            className="h-full w-full object-cover"
          />
          <div className="absolute top-0 left-0 z-10">
            <FactBadge
              percent={slicedVideos[0]?.gradePercent}
              width={90}
              height={110}
              type={slicedVideos[0]?.grade as ValidityType}
            />

            <p className="mt-12 w-64 text-xl font-bold">
              {slicedVideos[0]?.title}
            </p>
          </div>
        </a>
      </div>
      <div className="mx-6 w-px self-stretch bg-gray-200" />
      <div className="flex basis-2/3 flex-col gap-y-3">
        <p className="text-black-normal text-xl font-bold">Top 2 ~ 5</p>
        <div className="h-36 flex-1 items-center justify-center">
          {slicedVideos.slice(1, 5).map((slicedVideos, idx) => (
            <MainVideoList key={idx} idx={idx} video={slicedVideos} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default DesktopHotVideosSection;
