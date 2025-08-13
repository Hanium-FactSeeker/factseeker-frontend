import { Button } from '@/components/ui/button';
import FactMark from '@/components/ui/factMark';
import { ValidityType } from '@/types/validity';
import { VideoItem } from '@/types/videos';

interface VideoItemProps {
  idx: number;
  video: VideoItem;
}

const VideoItemMobile = ({ idx, video }: VideoItemProps) => {
  return (
    <div className="flex w-full gap-2">
      <div>
        <p className="text-black-normal mb-2 text-lg font-bold">
          Top {idx + 1}
        </p>
        <a
          href={video?.link}
          target="_blank"
          className="relative flex h-24 w-36 items-center justify-center"
        >
          <img
            className="mb-4 h-30 w-44 rounded-xl"
            src="https://placehold.co/176x104"
          />
          <div className="absolute right-0 bottom-4 z-10">
            <FactMark
              width={50}
              height={50}
              type={video?.grade as ValidityType}
            />
          </div>
        </a>
      </div>
      <div className="mt-8 flex h-full w-32 flex-col gap-1">
        <p className="text-Black_normal text-xs font-bold">{video.title}</p>
        <div className="text-Black_normal justify-center text-[10px] font-medium">
          {video?.channelName}
        </div>
        <Button
          fullWidth={false}
          variant="outline"
          color="gray"
          size="xxs"
          className="w-[80%]"
        >
          연관 분석하기
        </Button>
      </div>
    </div>
  );
};

export default VideoItemMobile;
