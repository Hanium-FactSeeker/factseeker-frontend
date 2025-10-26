'use client';

import { Button } from '@/components/ui/button';
import FactMark from '@/components/ui/factMark';
import type { VideoItem } from '@/types/videos';
import { useRouter } from 'next/navigation';
import { percentToValidity } from '@/utils/calculateValidity';
import { useVideoTracking } from '@/hooks/gtm/useVideoTracking';

interface VideoItemProps {
  idx: number;
  video: VideoItem;
}

const VideoItemMobile = ({ idx, video }: VideoItemProps) => {
  const router = useRouter();
  const { trackTrendingClick, trackRelatedClick, trackReportClick } = useVideoTracking();

  const goRelated = () => {
    trackRelatedClick(video.title ?? '(no title)');
    const params = new URLSearchParams({
      title: video.title ?? '',
      thumb: video.thumbnail ?? '',
    });
    router.push(`/videos/related/${video.id}?${params.toString()}`);
  };

  const handleGoReport = () => {
    trackReportClick(video.title ?? '(no title)');

    const videoId = encodeURIComponent(video?.id ?? '');
    router.push(`/report?videoId=${videoId}`);
  };

  return (
    <div className="border-gray-normal flex h-46 w-full gap-2 border-b">
      <div>
        <p className="text-black-normal mb-6 text-lg font-bold">Top {idx + 1}</p>
        <a
          href={video?.link}
          target="_blank"
          className="relative flex h-24 w-36 items-center justify-center"
          onClick={() => trackTrendingClick(video.title ?? '(no title)', video.gradePercent ?? 0)}
        >
          <img className="relative mb-2 h-32 w-34 rounded-xl" src={video?.thumbnail} />
          <div className="absolute -top-5 left-2 z-10">
            <FactMark width={60} height={60} type={percentToValidity(video?.gradePercent ?? 0)} />
          </div>
        </a>
      </div>
      <div className="mt-8 flex h-full w-32 flex-col gap-1">
        <p className="text-Black_normal line-clamp-3 h-12 w-full overflow-hidden text-xs leading-4 font-bold">
          {video.title}
        </p>
        <div className="text-Black_normal justify-center text-[10px] font-medium">
          {video?.channelName}
        </div>
        <div className="flex w-26 flex-col gap-2">
          <Button variant="outline" color="gray" size="xxs" onClick={goRelated}>
            연관 분석
          </Button>
          <Button variant="filled" color="purple" size="xxs" onClick={handleGoReport}>
            리포트 분석
          </Button>
        </div>
      </div>
    </div>
  );
};

export default VideoItemMobile;
