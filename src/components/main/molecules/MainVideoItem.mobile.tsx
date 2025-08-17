import FactBadge from '@/components/ui/factBadge';
import { BadgeType } from '@/types/validity';
import { VideoItem } from '@/types/videos';

interface videoListProps {
  idx: number;
  video: VideoItem;
}

const MainVideoItemMobile = ({ idx, video }: videoListProps) => {
  return (
    <div className="flex h-52 w-36 flex-col gap-2">
      <p className="text-md font-bold">Top {idx + 1}</p>
      <div className="relative h-auto w-36" rel="noopener noreferrer">
        <img
          src={video?.thumbnail}
          alt="썸네일"
          className="h-full w-full object-cover"
        />
        <div className="absolute top-0 left-0 z-10">
          <FactBadge
            percent={video?.gradePercent}
            width={70}
            height={60}
            type={video?.grade as BadgeType}
            textSize="xs"
          />
        </div>
      </div>
      <a href={video?.link} className="w-36 text-sm font-semibold">
        {video?.title}
      </a>
    </div>
  );
};

export default MainVideoItemMobile;
