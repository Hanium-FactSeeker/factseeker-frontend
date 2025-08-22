'use client';

import Link from 'next/link';
import PoliticianImage from '@/components/ui/profile/PoliticianImage';
import { FaStar } from 'react-icons/fa';
import { SiOpenai } from 'react-icons/si';
import { TbSunFilled } from 'react-icons/tb';

type Stat = { fact: number; gpt: number; claude: number };
type Item = { name: string; party: string; img: string; stats: Stat };

interface Props {
  item: Item;
}

export default function PoliticianItemDesktop({ item }: Props) {
  // ✅ 기존 데스크톱 카드 스타일 "그대로"
  return (
    <Link
      href={`/politician/${encodeURIComponent(item.name)}`}
      className="flex w-full flex-col rounded-xl bg-white p-3 transition hover:shadow-[0_2px_6px_rgba(0,0,0,0.08)]"
    >
      <div className="flex items-center gap-2">
        <div className="relative h-10 w-10 overflow-hidden rounded-full [&_img]:h-full [&_img]:w-full [&_img]:object-cover">
          <PoliticianImage src={item.img} alt={`${item.name} 이미지`} />
        </div>
        <div className="leading-none">
          <p className="text-Black_normal text-[14px] font-bold">{item.name}</p>
          <p className="mt-1 text-Black_alternative text-[10px]">{item.party}</p>
        </div>
      </div>

      <div className="mt-2 flex items-start gap-2">
        <span className="mt-[2px] h-[56px] w-[2px] rounded bg-primary-normal" />
        <div className="space-y-2">
          <p className="flex items-center gap-1 text-[10px] font-light text-Black_alternative">
            <FaStar className="h-3 w-3 text-yellow-400" />
            팩씨 기준 신뢰도 {item.stats.fact}%
          </p>
          <p className="flex items-center gap-1 text-[10px] font-light text-Black_alternative">
            <SiOpenai className="h-3 w-3 text-black" />
            GPT 기준 신뢰도 {item.stats.gpt}%
          </p>
          <p className="flex items-center gap-1 text-[10px] font-light text-Black_alternative">
            <TbSunFilled className="h-3 w-3 text-red-400" />
            Claude 기준 신뢰도 {item.stats.claude}%
          </p>
        </div>
      </div>
    </Link>
  );
}
