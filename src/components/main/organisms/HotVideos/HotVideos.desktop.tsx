'use client';

import { Button } from '@/components/ui/button';
import { useRouter } from 'next/navigation';
import MainVideoList from '../../molecules/MainVideoItem.desktop';
import FactBadge from '@/components/ui/factBadge';
import { HotVideosProps } from '@/types/videos';
import { percentToValidity } from '@/utils/calculateValidity';

const DesktopHotVideosSection = ({ videos }: HotVideosProps) => {
  const router = useRouter();

  const slicedVideos = videos.slice(0, 5);
  const top = videos[0];

  const handleGoReport = () => {
    const videoId = encodeURIComponent(slicedVideos[0]?.id ?? '');
    router.push(`/report?videoId=${videoId}`);
  };

  return (
    <div className="mt-13 flex px-2">
      <div className="flex basis-1/3 flex-col items-center gap-y-4">
        <p className="text-black-normal ml-9 self-start text-2xl font-extrabold">
          Top1
        </p>
        <div className="relative">
          <img
            src={slicedVideos[0]?.thumbnail}
            alt="썸네일"
            className="h-42 w-62 object-cover"
          />
          <div className="absolute top-0 left-0 z-10">
            {top?.gradeStatus === 'COMPLETED' &&
            typeof top.gradePercent === 'number' ? (
              <FactBadge
                percent={top.gradePercent}
                width={90}
                height={110}
                type={percentToValidity(top.gradePercent)}
              />
            ) : top?.gradeStatus === 'PENDING' ||
              top?.gradeStatus === 'FAILED' ? (
              <FactBadge
                percent={0}
                width={90}
                height={110}
                type={percentToValidity(0)}
              />
            ) : null}
          </div>
        </div>
        <p className="mt-2 w-64 text-xl font-bold">{slicedVideos[0]?.title}</p>

        <div className="flex gap-2">
          <a
            href={slicedVideos[0]?.link}
            target="_blank"
            rel="noopener noreferrer"
          >
            <Button
              variant="filled"
              color="gray"
              size="md"
              className="mt-2 w-28"
            >
              원문 보기
            </Button>
          </a>

          <Button
            variant="filled"
            color="purple"
            size="md"
            className="mt-2 w-32"
            onClick={handleGoReport}
          >
            리포트 분석
          </Button>
        </div>
      </div>
      <div className="mx-6 w-px self-stretch bg-gray-200" />
      <div className="flex basis-2/3 flex-col gap-y-3">
        <p className="text-black-normal ml-4 text-xl font-bold">Top 2 ~ 5</p>
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
