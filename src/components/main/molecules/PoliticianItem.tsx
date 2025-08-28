'use client';

import ReliabilityStat from '@/components/ui/validity';
import PoliticianImage from '../../ui/profile/PoliticianImage';
import FactMark from '@/components/ui/factMark';
import { percentToValidity, faceImgByPercent } from '@/utils/calculateValidity';
import { maskTail } from '@/utils/maskTail';

type Stats = { gpt: number; gemini: number; overall: number };

export type Politician = {
  name: string;
  party: string;
  img: string;
  stats: Stats;
};

const PoliticianItem = ({ p }: { p: Politician }) => {
  const overall = p.stats.overall ?? 0;
  const faceSrc = faceImgByPercent(overall);
  const badgeType = percentToValidity(overall);

  return (
    <div className="flex h-40 w-full items-center justify-center gap-4 md:h-56 md:gap-8">
      <div className="flex flex-col items-center gap-1 md:gap-2">
        <div className="relative">
          <PoliticianImage
            src={faceSrc}
            alt={`${p.name} 이미지`}
            className="h-16 w-16"
          />
          <div className="absolute right-7 bottom-10 z-10">
            <FactMark type={badgeType} width={50} height={50} />
          </div>
        </div>

        <p className="text-black-normal text-md font-bold md:text-xl">
          {maskTail(p.name, 1)}
        </p>
        <p className="text-black-normal text-sm font-normal md:text-base">
          {p.party}
        </p>
      </div>

      <div className="flex flex-col gap-2">
        <ReliabilityStat
          iconWidth={20}
          iconHeight={20}
          name="GPT"
          value={p.stats.gpt}
        />
        <ReliabilityStat
          iconWidth={20}
          iconHeight={20}
          name="Gemini"
          value={p.stats.gemini}
        />
        <ReliabilityStat
          iconWidth={20}
          iconHeight={20}
          name="전체"
          value={p.stats.overall}
        />
      </div>
    </div>
  );
};

export default PoliticianItem;
