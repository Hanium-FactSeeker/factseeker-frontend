import { Button } from '@/components/ui/button';
import { VideoItem } from '@/types/videos';

const RelatedCard = ({ item }: { item: VideoItem }) => {
  return (
    <div className="flex flex-col items-center gap-2 rounded-xl md:gap-4">
      <a href={item.link} target="_blank" className="block">
        <img
          src={item.thumbnail}
          alt={item.title}
          className="mt-4 h-24 w-44 rounded-lg object-cover md:h-40 md:w-72"
        />
      </a>
      <p className="line-clamp-2 w-44 text-sm font-semibold md:w-70">
        {item.title}
      </p>
      <hr className="text-gray-normal w-44 md:w-72" />
      <div className="mt-2 mb-10 flex w-44 items-center justify-between">
        <div className="text-xs font-medium text-gray-500 md:text-sm md:font-semibold">
          {item.channelName}
        </div>

        <Button variant="outline" color="purple" size="sm">
          분석하기
        </Button>
      </div>
    </div>
  );
};

export default RelatedCard;
