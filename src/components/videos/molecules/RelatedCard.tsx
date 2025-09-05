import { Button } from '@/components/ui/button';
import { VideoItem } from '@/types/videos';
import { useRouter } from 'next/navigation';

/**
 * 개별 연관 영상을 카드 형태로 보여주는 컴포넌트
 *
 * - 썸네일 클릭 시 새 탭에서 영상 링크로 이동합니다.
 * - 영상 제목은 최대 두 줄까지만 표시되며 말줄임 처리를 했습니다.
 */
const RelatedCard = ({ item }: { item: VideoItem }) => {
  const router = useRouter();

  const handleGoReport = () => {
    const analysisId = encodeURIComponent(item?.id || '');
    router.push(`/report?analysisId=${analysisId}`);
  };

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
        {item?.title}
      </p>
      <hr className="text-gray-normal w-44 md:w-72" />
      <div className="mt-2 mb-10 flex w-44 justify-between md:w-72">
        <div className="text-xs font-medium text-gray-500 md:min-w-30 md:text-sm md:font-semibold">
          {item?.channelName}
        </div>

        <Button
          variant="outline"
          color="purple"
          size="sm"
          onClick={handleGoReport}
        >
          리포트 분석
        </Button>
      </div>
    </div>
  );
};

export default RelatedCard;
