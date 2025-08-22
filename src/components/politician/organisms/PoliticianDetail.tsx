'use client';

import PoliticianDetailDesktop from './PoliticianDetailDesktop';
import PoliticianDetailMobile from './PoliticianDetailMobile';
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

export default function PoliticianDetail(props: Props) {
  return (
    <div className="w-full">
      <PoliticianDetailMobile {...props} />
      <PoliticianDetailDesktop {...props} />
    </div>
  );
}
