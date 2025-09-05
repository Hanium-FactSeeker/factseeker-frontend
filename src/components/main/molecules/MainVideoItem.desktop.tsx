import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import FactBadge from '@/components/ui/factBadge';
import { VideoItem } from '@/types/videos';
import { percentToValidity } from '@/utils/calculateValidity';

interface videoListProps {
  idx: number;
  video: VideoItem;
}

/**
 * @component VideoList
 * @description
 *  - 오늘의 TOP 10 정치 유튜브 등 Top2~5 구간에 반복적으로 사용되는 동영상 리스트 아이템
 *
 * @param {number} idx 리스트의 index (key로 사용)
 * @param {Video} video 동영상 정보 객체 (grade, gradePercent, title, thumbnail 등)
 *
 * @example
 * <VideoList idx={1} video={videoObj} />
 *
 * @style
 * - flex 레이아웃으로 뱃지, 제목, 썸네일 순서로 배치
 * - 마지막 아이템이 아니면 border-bottom 표시
 *
 * @see FactBadge - 신뢰도 등급을 표시하는 Atom 뱃지 컴포넌트
 * @see Video - videoList 데이터 타입
 */
const MainVideoItemDesktop = ({ idx, video }: videoListProps) => {
  const router = useRouter();

  const badgePercent =
    video?.gradeStatus === 'COMPLETED' &&
    typeof video?.gradePercent === 'number'
      ? video.gradePercent
      : 0;

  const handleGoReport = () => {
    const videoId = encodeURIComponent(video?.id ?? '');
    router.push(`/report?videoId=${videoId}`);
  };

  return (
    <div
      key={idx}
      className="flex items-center gap-x-4 border-b border-gray-200 py-3 last:border-b-0"
    >
      <div>
        <FactBadge
          percent={badgePercent}
          width={70}
          height={90}
          type={percentToValidity(badgePercent)}
        />
      </div>

      {/* 제목 */}
      <div className="flex flex-col">
        <p className="text-black-normal w-80 flex-1 text-lg font-bold break-keep">
          {video?.title}
        </p>
        <div className="mt-2 flex gap-2">
          <a href={video?.link} target="_blank" rel="noopener noreferrer">
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
      {/* 썸네일 */}
      <div className="flex h-auto w-36 overflow-hidden">
        <img
          src={video.thumbnail}
          alt="썸네일"
          className="h-full w-full object-cover"
        />
      </div>
    </div>
  );
};

export default MainVideoItemDesktop;
