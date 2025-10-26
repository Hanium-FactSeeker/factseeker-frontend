'use client';

import { useEffect } from 'react';
import PoliticianDetailDesktop from './PoliticianDetailDesktop';
import PoliticianDetailMobile from './PoliticianDetailMobile';
import { usePoliticianTracking } from '@/hooks/gtm/usePoliticianTracking';
import type { VideoItem } from '@/types/videos';

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
  const { trackPersonSearch } = usePoliticianTracking(props.politician.name);
  useEffect(() => {
    trackPersonSearch();
  }, [trackPersonSearch]);

  return (
    <div className="w-full">
      <PoliticianDetailMobile {...props} />
      <PoliticianDetailDesktop {...props} />
    </div>
  );
}
