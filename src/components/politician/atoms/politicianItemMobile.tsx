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

export default function PoliticianItemMobile({ item }: Props) {
  return (
    <Link
      href={`/politician/${encodeURIComponent(item.name)}`}
      className="flex w-full items-center justify-between rounded-[12px] bg-white p-3 shadow-[0_1px_6px_rgba(0,0,0,0.06)]"
      style={{ border: '1px solid #ECEEF1' }}
    >
      <div className="flex min-w-0 items-center gap-6">
        <div className="relative h-11 w-11 flex-shrink-0 overflow-hidden rounded-full [&_img]:h-full [&_img]:w-full [&_img]:object-cover">
          <PoliticianImage src={item.img} alt={`${item.name} 이미지`} />
        </div>

        <div className="min-w-0 gap-4">
          <p className="text-Black_normal truncate text-[14px] font-bold">
            {item.name}
          </p>
          <span className="text-Black_alternative mt-2 inline-block text-[10px]">
            자세히 보기 &gt;
          </span>
        </div>
      </div>

      <div className="ml-3 flex w-[48%] flex-col gap-1">
        <p className="text-Black_alternative flex items-center justify-baseline gap-1 text-[10px] font-light">
          <FaStar className="h-3 w-3 text-yellow-400" />
          <span className="shrink-0">팩씨 기준 신뢰도 {item.stats.fact}%</span>
        </p>
        <p className="text-Black_alternative mt-2 flex items-center justify-baseline gap-1 text-[10px] font-light">
          <SiOpenai className="h-3 w-3 text-black" />
          <span className="shrink-0">GPT 기준 신뢰도 {item.stats.gpt}%</span>
        </p>
        <p className="text-Black_alternative mt-2 flex items-center justify-baseline gap-1 text-[10px] font-light">
          <TbSunFilled className="h-3 w-3 text-red-400" />
          <span className="shrink-0">
            Gemini 기준 신뢰도 {item.stats.claude}%
          </span>
        </p>
      </div>
    </Link>
  );
}
