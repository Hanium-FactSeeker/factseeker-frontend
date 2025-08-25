'use client';

import Link from 'next/link';
import PoliticianImage from '@/components/ui/profile/PoliticianImage';
import { FaStar } from 'react-icons/fa';
import { SiOpenai } from 'react-icons/si';
import { TbSunFilled } from 'react-icons/tb';

export type PoliticianTopItem = {
  id?: number;
  name: string;
  party?: string;
  profileImageUrl?: string | null;
  overallScore?: number;
  gptScore?: number;
  geminiScore?: number;
};

type Stat = { fact: number; gpt: number; claude: number };
type Item = {
  id?: number;
  name: string;
  party: string;
  img?: string | null;
  stats?: Stat;
  overallScore?: number;
  gptScore?: number;
  geminiScore?: number;
};

interface Props { item: Item }

export default function PoliticianItemDesktop({ item }: Props) {
  const raw = item.img ?? (item as any).profileImageUrl ?? '';
  const safeImg = raw && raw !== 'null' && raw !== 'undefined' ? raw : '';

  const stats = item.stats ?? {
    fact: Math.round(item.overallScore ?? 0),
    gpt: Math.round(item.gptScore ?? 0),
    claude: Math.round(item.geminiScore ?? 0),
  };

  return (
    <Link
      href={`/politician/${encodeURIComponent(item.name)}`}
      className="flex w-full flex-col rounded-xl bg-white p-3 transition hover:shadow-[0_2px_6px_rgba(0,0,0,0.08)]"
    >
      <div className="flex items-center gap-3">
        <div className="relative h-14 w-14 overflow-hidden rounded-full">
          <PoliticianImage src={safeImg} alt={`${item.name} 이미지`} />
        </div>
        <div className="leading-none">
          <p className="text-Black_normal text-[15px] font-bold">{item.name}</p>
          <p className="mt-1 text-Black_alternative text-[11px]">{item.party}</p>
        </div>
      </div>

      <div className="mt-3 flex items-start gap-2">
        <span className="mt-[2px] h-[56px] w-[2px] rounded bg-primary-normal" />
        <div className="space-y-2">
          <p className="flex items-center gap-1 text-[11px] font-light text-Black_alternative">
            <FaStar className="h-3 w-3 text-yellow-400" />
            팩씨 기준 신뢰도 {stats.fact}%
          </p>
          <p className="flex items-center gap-1 text-[11px] font-light text-Black_alternative">
            <SiOpenai className="h-3 w-3 text-black" />
            GPT 기준 신뢰도 {stats.gpt}%
          </p>
          <p className="flex items-center gap-1 text-[11px] font-light text-Black_alternative">
            <TbSunFilled className="h-3 w-3 text-red-400" />
            Claude 기준 신뢰도 {stats.claude}%
          </p>
        </div>
      </div>
    </Link>
  );
}
