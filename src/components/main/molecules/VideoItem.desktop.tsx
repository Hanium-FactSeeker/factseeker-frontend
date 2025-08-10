import FactBadge from '@/components/ui/factBadge';
import { BadgeType } from '@/types/validity';
import { VideoItem } from '@/types/videos';

interface videoListProps {
  idx: number;
  video: VideoItem;
}

/**
 * @component VideoList
 * @description
 *  - 오늘의 TOP 20 정치 유튜브 등 Top2~5 구간에 반복적으로 사용되는 동영상 리스트 아이템 컴포넌트입니다.
 *  - 신뢰도 뱃지(FactBadge), 영상 제목, 썸네일을 가로로 배치하며, 한 줄에 한 개의 동영상 정보를 보여줍니다.
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
const VideoItemDesktop = ({ idx, video }: videoListProps) => {
  return (
    <div
      key={idx}
      className="flex items-center gap-x-4 border-b border-gray-200 py-3 last:border-b-0"
    >
      <div>
        <FactBadge
          percent={video?.gradePercent}
          width={68}
          height={77}
          type={video?.grade as BadgeType}
          textSize="xs"
        />
      </div>

      {/* 제목 */}
      <a href={video?.link} target="_blank" className="flex">
        <p className="text-black-normal w-90 flex-1 text-base font-bold break-keep">
          {video.title}
        </p>
        {/* 썸네일 */}
        <div className="flex h-20 w-36 overflow-hidden">
          <img
            src={video.thumbnail}
            alt="썸네일"
            className="h-full w-full object-cover"
          />
        </div>
      </a>
    </div>
  );
};

export default VideoItemDesktop;
