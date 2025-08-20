'use client';

import { useMemo, useState } from 'react';
import Link from 'next/link';
import PoliticianImage from '@/components/ui/profile/PoliticianImage';
import VideoRow from '@/components/politician/molecules/VideoRow';
import SwitchButton from '@/components/ui/button/SwitchButton';
import type { VideoItem } from '@/constants/videoList';
import { BiLeftArrow, BiRightArrow } from 'react-icons/bi';

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

export default function PoliticianDetailDesktop({
  politician,
  videos,
  updatedAt,
}: Props) {
  const imgSrc = politician.img ?? politician.figureImg ?? '';
  const [tab, setTab] = useState<'news' | 'youtube'>('youtube');
  const [page, setPage] = useState(1);
  const pageSize = 5;

  const list = tab === 'youtube' ? videos : [];
  const totalPages = Math.max(1, Math.ceil(list.length / pageSize));
  const pageVideos = useMemo(
    () => list.slice((page - 1) * pageSize, page * pageSize),
    [list, page],
  );

  const goPrev = () => setPage((p) => Math.max(1, p - 1));
  const goNext = () => setPage((p) => Math.min(totalPages, p + 1));

  const cumulative = `${Math.round(politician.stats.fact ?? 0)}%`;

  return (
    <section className="w-full rounded-2xl border border-gray-200 bg-white p-6">
      <div className="mb-5">
        <Link
          href="/politician"
          className="text-sm font-medium text-gray-500 hover:underline"
        >
        </Link>
      </div>

      <div className="grid grid-cols-[40%_60%] gap-2">
        <aside className="w-full max-w-[360px] justify-self-center rounded-[12px] p-6">
          <div className="mb-6 rounded-2xl border border-gray-200 p-5">
            <p className="text-black-normal mb-4 text-center text-xl font-extrabold">
              선택 인물
            </p>

            <div className="mb-5 flex items-center justify-center gap-4">
              <div className="relative h-20 w-20 shrink-0">
                <PoliticianImage
                  src={imgSrc}
                  alt={`${politician.name} 이미지`}
                />
              </div>
              <div className="min-w-0">
                <p className="text-black-normal truncate text-lg font-bold">
                  {politician.name}
                </p>
                <p className="text-black-normal mt-1 truncate text-sm">
                  {politician.party}
                </p>
              </div>
            </div>

            <div className="rounded-x text-black-normal mb-6 py-3 text-center text-sm">
              <span className="font-medium">누적 신뢰도: </span>
              <span className="font-bold">{cumulative}</span>
            </div>
          </div>

          <SwitchButton
            value={tab}
            onChange={(val) => {
              setTab(val as 'news' | 'youtube');
              setPage(1);
            }}
            options={[
              { label: '뉴스기사 모아보기', value: 'news' },
              { label: '유튜브 모아보기', value: 'youtube' },
            ]}
            className="w-full justify-between"
          />
          <style jsx>{`
            [role='tablist'] button {
              width: auto !important;
              flex: 0 0 auto !important;
            }
          `}</style>
        </aside>

        <section className="min-w-0">
          <div className="flex items-center justify-end border-b border-gray-200 px-6 py-4">
            {updatedAt && <p className="text-xs text-gray-500">{updatedAt}</p>}
          </div>

          {tab === 'youtube' ? (
            <>
              <div className="px-4">
                {pageVideos.map((v, i) => (
                  <VideoRow key={`${v.id}-${i}`} video={v} />
                ))}
              </div>

              <div className="flex items-center justify-between border-t border-gray-200 px-6 py-4">
                <button
                  onClick={goPrev}
                  className="rounded-md p-2 text-gray-600 hover:bg-gray-100 disabled:opacity-40"
                  disabled={page === 1}
                >
                  <BiLeftArrow className="h-5 w-5" />
                </button>

                <div className="flex items-center gap-3">
                  {Array.from({ length: totalPages }).map((_, i) => {
                    const n = i + 1;
                    const active = n === page;
                    return (
                      <button
                        key={n}
                        onClick={() => setPage(n)}
                        className={`h-2.5 w-2.5 rounded-full transition-colors ${
                          active ? 'bg-black' : 'bg-gray-300'
                        }`}
                      />
                    );
                  })}
                </div>

                <button
                  onClick={goNext}
                  className="rounded-md p-2 text-gray-600 hover:bg-gray-100 disabled:opacity-40"
                  disabled={page === totalPages}
                >
                  <BiRightArrow className="h-5 w-5" />
                </button>
              </div>
            </>
          ) : (
            <div className="flex h-[320px] items-center justify-center text-sm text-gray-500">
              뉴스 데이터 준비 중입니다.
            </div>
          )}
        </section>
      </div>
    </section>
  );
}
