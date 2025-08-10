import SectionTitle from '@/components/ui/title/SectionTitle';
import Desktop from './HotVideos.desktop';
import Mobile from './HotVideos.mobile';
import { HotVideosProps } from '@/types/videos';

export default function HotVideos(videos: HotVideosProps) {
  return (
    <div className="w-[90%] md:w-[1000px]">
      <SectionTitle title="오늘의 TOP 20 정치 유튜브 &gt;" link="/videos" />
      <div className="hidden md:block">
        <Desktop {...videos} />
      </div>
      <div className="block md:hidden">
        <Mobile {...videos} />
      </div>
    </div>
  );
}
