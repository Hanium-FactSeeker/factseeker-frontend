'use client';

import { useMemo, useState } from 'react';
import Link from 'next/link';
import PoliticianImage from '@/components/ui/profile/PoliticianImage';
import ReliabilityStat from '@/components/ui/validity';
import SwitchButton from '@/components/ui/button/SwitchButton';
import VideoCard from '@/components/politician/molecules/VideoCard';
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

export default function PoliticianDetailMobile({
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

  const pageVideos = useMemo(() => {
    const start = (page - 1) * pageSize;
    return list.slice(start, start + pageSize);
  }, [list, page]);

  const goPrev = () => setPage((p) => Math.max(1, p - 1));
  const goNext = () => setPage((p) => Math.min(totalPages, p + 1));

  return (
    <section className="w-full md:hidden">
      <div className="mb-3">
        <Link href="/politician" className="text-sm font-medium text-gray-500 hover:underline">
          {'< 다시 선택'}
        </Link>
      </div>

      <div className="rounded-2xl border border-gray-normal bg-white p-5">
        <p className="mb-3 text-center text-xs text-gray-500">선택 인물</p>
        <div className="mb-3 flex items-center justify-center">
          <div className="relative h-16 w-16">
            <PoliticianImage src={imgSrc} alt={`${politician.name} 이미지`} />
          </div>
        </div>
        <p className="text-center text-base font-bold text-black-normal">{politician.name}</p>
        <p className="mb-4 text-center text-xs text-black-normal">{politician.party}</p>

        <div className="mb-4 flex flex-col gap-2">
          <ReliabilityStat iconWidth={16} iconHeight={16} name="팩씨" value={politician.stats.fact} />
          <ReliabilityStat iconWidth={16} iconHeight={16} name="GPT" value={politician.stats.gpt} />
          <ReliabilityStat iconWidth={16} iconHeight={16} name="Claude" value={politician.stats.claude} />
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
          [role='tablist'] button { width: auto !important; flex: 0 0 auto !important; }
        `}</style>
      </div>

      <div className="mt-6 mb-2 flex items-center justify-between">
        <h3 className="text-sm font-semibold text-black-normal">
          {politician.name} 관련 {tab === 'youtube' ? '영상' : '뉴스'}
        </h3>
        {updatedAt && <p className="text-[11px] text-gray-500">{updatedAt}</p>}
      </div>

      {tab === 'youtube' ? (
        <>
          <div className="grid grid-cols-1 gap-3">
            {pageVideos.map((v) => (
              <VideoCard key={v.id} video={v} />
            ))}
          </div>

          <div className="mt-4 flex items-center justify-center gap-3">
            <button
              onClick={goPrev}
              className="rounded-md px-2 py-1 text-xs text-gray-600 hover:bg-gray-100 disabled:opacity-40"
              disabled={page === 1}
            >
              이전
            </button>
            <div className="flex items-center gap-1">
              {Array.from({ length: totalPages }).map((_, i) => {
                const n = i + 1;
                const active = n === page;
                return (
                  <button
                    key={n}
                    onClick={() => setPage(n)}
                    className={`h-6 w-6 rounded-full text-[11px] ${
                      active ? 'bg-black text-white' : 'text-gray-700 hover:bg-gray-100'
                    }`}
                  >
                    {n}
                  </button>
                );
              })}
            </div>
            <button
              onClick={goNext}
              className="rounded-md px-2 py-1 text-xs text-gray-600 hover:bg-gray-100 disabled:opacity-40"
              disabled={page === totalPages}
            >
              다음
            </button>
          </div>
        </>
      ) : (
        <div className="mt-6 flex h-[200px] items-center justify-center text-xs text-gray-500">
          뉴스 데이터 준비 중입니다.
        </div>
      )}
    </section>
  );
}
