'use client';

import ReliabilityStat from '@/components/ui/validity';
import PoliticianImage from '../../ui/profile/PoliticianImage';
import FactMark from '@/components/ui/factMark';

type Stats = { fact: number; gpt: number; claude: number };
export type Politician = {
  name: string;
  party: string;
  img: string;
  stats: Stats;
};

const PoliticianItem = ({ p }: { p: Politician }) => {
  return (
    <div className="flex h-40 w-full items-center justify-center gap-4 md:h-56 md:gap-8">
      <div className="flex flex-col items-center gap-1 md:gap-2">
        <div className="relative">
          <PoliticianImage
            src={p.img}
            alt={`${p.name} 이미지`}
            className="h-16 w-16"
          />
          <div className="absolute right-7 bottom-10 z-10">
            <FactMark type={'true1'} width={50} height={50} />
          </div>
        </div>

        <p className="text-black-normal text-md font-bold md:text-xl">
          {p.name}
        </p>
        <p className="text-black-normal text-sm font-normal md:text-base">
          {p.party}
        </p>
      </div>

      <div className="flex flex-col gap-2">
        <ReliabilityStat
          iconWidth={30}
          iconHeight={30}
          name="팩씨"
          value={p.stats.fact}
        />
        <ReliabilityStat
          iconWidth={20}
          iconHeight={20}
          name="GPT"
          value={p.stats.gpt}
        />
        <ReliabilityStat
          iconWidth={20}
          iconHeight={20}
          name="Claude"
          value={p.stats.claude}
        />
      </div>
    </div>
  );
};

export default PoliticianItem;
