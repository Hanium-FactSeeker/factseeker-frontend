'use client';

import Link from 'next/link';
import ReliabilityStat from '@/components/ui/validity';
import PoliticianImage from '@/components/ui/profile/PoliticianImage';

type Stat = { fact: number; gpt: number; claude: number };
type Item = { name: string; party: string; img: string; stats: Stat };

interface Props { item: Item }

export default function PoliticianItem({ item }: Props) {
  return (
    <Link
      href={`/politician/${encodeURIComponent(item.name)}`}
      className="flex w-full max-w-[320px] flex-col gap-3 rounded-xl border bg-white p-4 hover:shadow-md transition"
    >
      <div className="flex items-center gap-4">
        <div className="relative h-14 w-14 md:h-16 md:w-16">
          <PoliticianImage src={item.img} alt={`${item.name} 이미지`} className="h-full w-full" />
        </div>
        <div className="flex flex-col">
          <p className="text-black-normal text-base font-bold md:text-lg">{item.name}</p>
          <p className="text-black-normal text-sm font-normal md:text-base">{item.party}</p>
        </div>
      </div>

      <div className="flex flex-col gap-2 text-black-normal [&_svg]:shrink-0">
        <ReliabilityStat iconWidth={18} iconHeight={18} name="팩씨"   value={item.stats.fact} />
        <ReliabilityStat iconWidth={18} iconHeight={18} name="GPT"    value={item.stats.gpt} />
        <ReliabilityStat iconWidth={18} iconHeight={18} name="Claude" value={item.stats.claude} />
      </div>
    </Link>
  );
}
