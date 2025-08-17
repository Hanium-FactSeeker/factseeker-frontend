'use client';

import PoliticianImage from '@/components/ui/profile/PoliticianImage';
import ReliabilityStat from '@/components/ui/validity';
import VideoCard from '@/components/politician/molecules/VideoRow';
import type { VideoItem } from '@/constants/videoList';

type Stat = { fact: number; gpt: number; claude: number };
type Politician = {
  name: string;
  party: string;
  img?: string;
  figureImg?: string;
  stats: Stat;
};

interface Props {
  politician: Politician;
  videos: VideoItem[];
  updatedAt?: string;
}

export default function PoliticianDetailMobile({ politician, videos, updatedAt }: Props) {
  const imgSrc = politician.img ?? politician.figureImg ?? '';

  return (
    <div className="md:hidden">
      {/* 상단 인물 카드 */}
      <div className="rounded-2xl border border-gray-normal bg-white p-4">
        <button className="mb-2 text-xs text-gray-500">{'< 다시 선택'}</button>

        <div className="flex items-center gap-4">
          <div className="relative h-16 w-16">
            <PoliticianImage src={imgSrc} alt={`${politician.name} 이미지`} />
          </div>
          <div className="min-w-0">
            <p className="truncate text-base font-bold text-black-normal">{politician.name}</p>
            <p className="truncate text-sm text-black-normal">{politician.party}</p>
          </div>
        </div>

        <div className="mt-4 grid grid-cols-1 gap-2">
          <ReliabilityStat iconWidth={16} iconHeight={16} name="팩씨" value={politician.stats.fact} />
          <ReliabilityStat iconWidth={16} iconHeight={16} name="GPT" value={politician.stats.gpt} />
          <ReliabilityStat iconWidth={16} iconHeight={16} name="Claude" value={politician.stats.claude} />
        </div>

        <div className="mt-4 grid grid-cols-2 gap-2">
          <button className="rounded-xl border border-gray-normal py-2 text-sm">뉴스기사 모아보기</button>
          <button className="rounded-xl border border-gray-normal py-2 text-sm">유튜브 모아보기</button>
        </div>
      </div>

      {/* 영상 섹션 */}
      <div className="mt-4">
        <div className="mb-2 flex items-center justify-between">
          <h3 className="text-base font-semibold text-black-normal">관련 영상</h3>
          {updatedAt && <p className="text-xs text-gray-500">{updatedAt}</p>}
        </div>

        <div className="grid grid-cols-1 gap-3">
          {videos.map((v) => (
            <VideoCard key={v.id} video={v} />
          ))}
        </div>
      </div>
    </div>
  );
}
