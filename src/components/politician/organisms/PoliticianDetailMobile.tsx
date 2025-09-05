'use client';

import { useMemo, useState } from 'react';
import Link from 'next/link';
import PoliticianImage from '@/components/ui/profile/PoliticianImage';
import VideoRow from '@/components/politician/molecules/VideoRow';
import SwitchButton from '@/components/ui/button/SwitchButton';
import type { VideoItem } from '@/types/videos';
import { maskTail } from '@/utils/maskTail';

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
  news?: VideoItem[];
  updatedAt?: string;
  loadingCard?: boolean;
  loadingNews?: boolean;
  loadingVideos?: boolean;
}

export default function PoliticianDetailMobile({
  politician,
  videos,
  news,
  updatedAt,
  loadingCard,
  loadingNews,
  loadingVideos,
}: Props) {
  const imgSrc = politician.img ?? politician.figureImg ?? '';
  const [tab, setTab] = useState<'news' | 'youtube'>('youtube');

  const pageSize = 5;
  const list = tab === 'youtube' ? videos : (news ?? []);
  const pages: VideoItem[][] = useMemo(() => {
    const chunks: VideoItem[][] = [];
    for (let i = 0; i < list.length; i += pageSize) {
      chunks.push(list.slice(i, i + pageSize));
    }
    return chunks.length ? chunks : [[]];
  }, [list]);

  const cumulative = `${Math.round(politician.stats.fact ?? 0)}%`;

  return (
    <section className="mx-auto mt-4 w-full rounded-2xl border border-gray-200 bg-white px-4 py-4">
      <div className="mb-3">
        <Link href="/politician" className="text-sm font-medium text-gray-500 hover:underline">
          {'< 다시 선택'}
        </Link>
      </div>

      <div className="my-3 rounded-2xl border border-gray-200 p-4">
        <p className="text-black-normal mb-3 text-center text-lg font-extrabold">선택 인물</p>

        {loadingCard ? (
          <div className="mb-4 flex h-16 items-center justify-center text-sm text-gray-500">
            불러오는 중…
          </div>
        ) : (
          <div className="mb-4 flex items-center justify-center gap-3">
            <div className="relative h-16 w-16 shrink-0">
              <PoliticianImage src={imgSrc} alt={`${politician.name} 이미지`} />
            </div>
            <div className="min-w-0">
              <p className="text-black-normal truncate text-base font-bold">
                {maskTail(politician.name, 1)}
              </p>
              <p className="text-black-normal mt-1 truncate text-xs">{politician.party}</p>
            </div>
          </div>
        )}

        <div className="text-black-normal py-2 text-center text-sm">
          <span className="font-medium">누적 신뢰도: </span>
          <span className="font-bold">{cumulative}</span>
        </div>

        {updatedAt && <div className="mt-1 text-center text-xs text-gray-500">{updatedAt}</div>}
      </div>

      <SwitchButton
        value={tab}
        onChange={(val) => setTab(val as 'news' | 'youtube')}
        options={[
          { label: '뉴스기사 모아보기', value: 'news' },
          { label: '유튜브 모아보기', value: 'youtube' },
        ]}
        className="mb-3 flex w-full justify-center gap-2"
      />

      {/* 리스트 영역 */}
      {(tab === 'youtube' ? loadingVideos : loadingNews) ? (
        <div className="flex h-[280px] items-center justify-center text-sm text-gray-500">
          {tab === 'youtube' ? '영상 불러오는 중…' : '뉴스 불러오는 중…'}
        </div>
      ) : list.length ? (
        <div className="px-2">
          {pages[0].map((v) => (
            <VideoRow key={v.id} video={v} />
          ))}
        </div>
      ) : (
        <div className="flex h-[280px] items-center justify-center text-sm text-gray-500">
          {tab === 'youtube' ? '영상 데이터가 없습니다.' : '뉴스 데이터가 없습니다.'}
        </div>
      )}
    </section>
  );
}
