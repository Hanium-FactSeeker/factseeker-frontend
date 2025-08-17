'use client';

import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import FactMark from '@/components/ui/factMark';
import { ValidityType } from '@/types/validity';
import { VideoItem } from '@/types/videos';

interface VideoItemProps {
  video: VideoItem;
}
const VideoItemDesktop = ({ video }: VideoItemProps) => {
  const router = useRouter();
  return (
    <div className="border-primary-normal flex h-72 w-64 flex-col items-center justify-center gap-4 rounded-md border">
      <a
        href={video?.link}
        target="_blank"
        className="relative flex h-20 w-36 items-center justify-center"
      >
        <img className="h-20 w-36" src="https://placehold.co/140x88" />
        <div className="absolute right-22 bottom-2 z-10">
          <FactMark
            width={70}
            height={90}
            type={video?.grade as ValidityType}
          />
        </div>
      </a>
      <p className="text-black-normal text-md line-clamp-2 h-12 w-54 overflow-hidden text-center font-bold text-ellipsis">
        {video?.title}
      </p>
      <div className="text-Black_normal justify-center text-sm font-medium">
        {video?.channelName}
      </div>

      <Button
        variant="outline"
        color="gray"
        size="md"
        onClick={() => router.push(`/videos/related/${video.id}`)}
      >
        연관 분석하기
      </Button>
    </div>
  );
};

export default VideoItemDesktop;
