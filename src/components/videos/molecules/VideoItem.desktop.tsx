'use client';

import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import FactMark from '@/components/ui/factMark';
import { VideoItem } from '@/types/videos';
import { percentToValidity } from '@/utils/calculateValidity';

interface VideoItemProps {
  video: VideoItem;
}
const VideoItemDesktop = ({ video }: VideoItemProps) => {
  const router = useRouter();

  const goRelated = () => {
    const params = new URLSearchParams({
      title: video.title ?? '',
      thumb: video.thumbnail ?? '',
    });
    router.push(`/videos/related/${video.id}?${params.toString()}`);
  };

  const handleGoReport = () => {
    const videoId = encodeURIComponent(video?.id ?? '');
    router.push(`/report?videoId=${videoId}`);
  };

  return (
    <div className="border-primary-normal flex h-72 w-64 flex-col items-center justify-center gap-4 rounded-md border">
      <a
        href={video?.link}
        target="_blank"
        className="relative flex h-20 w-36 items-center justify-center"
      >
        <img className="h-20 w-36" src={video?.thumbnail} />
        <div className="absolute right-22 bottom-2 z-10">
          <FactMark
            width={70}
            height={90}
            type={percentToValidity(video?.gradePercent ?? 0)}
          />
        </div>
      </a>
      <p className="text-black-normal text-md line-clamp-2 h-12 w-54 overflow-hidden text-center font-bold text-ellipsis">
        {video?.title}
      </p>
      <div className="text-Black_normal justify-center text-sm font-medium">
        {video?.channelName}
      </div>
      <div className="flex gap-2">
        <Button variant="outline" color="gray" size="md" onClick={goRelated}>
          연관 분석
        </Button>
        <Button
          variant="filled"
          color="purple"
          size="md"
          onClick={handleGoReport}
        >
          리포트 분석
        </Button>
      </div>
    </div>
  );
};

export default VideoItemDesktop;
