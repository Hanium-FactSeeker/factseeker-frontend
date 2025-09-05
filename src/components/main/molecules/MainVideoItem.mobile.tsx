import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import FactBadge from '@/components/ui/factBadge';
import type { VideoItem } from '@/types/videos';
import { percentToValidity } from '@/utils/calculateValidity';
import { useEffect } from 'react';

interface videoListProps {
  idx: number;
  video: VideoItem;
}

const MainVideoItemMobile = ({ idx, video }: videoListProps) => {
  const router = useRouter();

  const badgePercent =
    video?.gradeStatus === 'COMPLETED' && typeof video?.gradePercent === 'number'
      ? video.gradePercent
      : 0;

  const handleGoReport = () => {
    const videoId = encodeURIComponent(video?.id ?? '');
    router.push(`/report?videoId=${videoId}`);
  };

  return (
    <div className="flex h-64 w-40 flex-col gap-2">
      <p className="text-md text-black-normal font-bold">Top {idx + 1}</p>
      <div className="relative h-auto w-36" rel="noopener noreferrer">
        <img src={video?.thumbnail} alt="썸네일" className="h-full w-full object-cover" />
        <div className="absolute top-0 left-0 z-10">
          <FactBadge
            percent={badgePercent}
            width={70}
            height={90}
            type={percentToValidity(badgePercent)}
          />
        </div>
      </div>
      <p className="text-black-normal line-clamp-2 w-36 overflow-hidden text-sm font-semibold">
        {video?.title}
      </p>
      <div className="flex gap-2">
        <a href={video?.link} target="_blank" rel="noopener noreferrer">
          <Button variant="filled" color="gray" size="xs" className="mt-2 w-18">
            원문 보기
          </Button>
        </a>

        <Button
          variant="filled"
          color="purple"
          size="xs"
          className="mt-2 w-22"
          onClick={handleGoReport}
        >
          리포트 분석
        </Button>
      </div>
    </div>
  );
};

export default MainVideoItemMobile;
