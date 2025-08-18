'use client';

import { useMemo, useState } from 'react';
import Link from 'next/link';
import PoliticianImage from '@/components/ui/profile/PoliticianImage';
import ReliabilityStat from '@/components/ui/validity';
import VideoRow from '@/components/politician/molecules/VideoRow';
import SwitchButton from '@/components/ui/button/SwitchButton';
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

export default function PoliticianDetailDesktop({
  politician,
  videos,
  updatedAt,
}: Props) {
  const imgSrc = politician.img ?? politician.figureImg ?? '';

  const [tab, setTab] = useState<'news' | 'youtube'>('youtube');
  const [page, setPage] = useState(1);
  const pageSize = 5;
  const totalPages = Math.max(1, Math.ceil(videos.length / pageSize));
  const pageVideos = useMemo(
    () => videos.slice((page - 1) * pageSize, page * pageSize),
    [page, videos],
  );
  const goPrev = () => setPage((p) => Math.max(1, p - 1));
  const goNext = () => setPage((p) => Math.min(totalPages, p + 1));

  return (
    <section className="border-gray-normal w-full rounded-2xl border bg-white p-6">
      <div className="mb-4">
        <Link
          href="/politician"
          className="text-sm font-medium text-gray-500 hover:underline"
        >
          {'< 다시 선택'}
        </Link>
      </div>

      <div className="grid w-full grid-cols-[320px_minmax(0,1fr)] gap-8">
        <aside className="rounded-2xl border border-gray-200 p-5">
          <p className="mb-4 text-center text-sm text-gray-500">선택 인물</p>
          <div className="mb-4 flex items-center justify-center">
            <div className="relative h-20 w-20">
              <PoliticianImage src={imgSrc} alt={`${politician.name} 이미지`} />
            </div>
          </div>
          <p className="text-black-normal text-center text-lg font-bold">
            {politician.name}
          </p>
          <p className="text-black-normal mb-4 text-center text-sm">
            {politician.party}
          </p>

          <div className="mb-6 flex flex-col gap-2">
            <ReliabilityStat
              iconWidth={18}
              iconHeight={18}
              name="팩씨"
              value={politician.stats.fact}
            />
            <ReliabilityStat
              iconWidth={18}
              iconHeight={18}
              name="GPT"
              value={politician.stats.gpt}
            />
            <ReliabilityStat
              iconWidth={18}
              iconHeight={18}
              name="Claude"
              value={politician.stats.claude}
            />
          </div>

          <SwitchButton
            value={tab}
            onChange={(val) => setTab(val as 'news' | 'youtube')}
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

        <section className="min-w-0 rounded-2xl border border-gray-200">
          <div className="flex items-center justify-between border-b border-gray-200 px-6 py-4">
            <h3 className="text-black-normal text-base font-semibold">
              {politician.name} 관련 {tab === 'youtube' ? '영상' : '뉴스'}
            </h3>
            {updatedAt && <p className="text-xs text-gray-500">{updatedAt}</p>}
          </div>

          {tab === 'youtube' ? (
            <>
              <div className="px-2">
                {pageVideos.map((v) => (
                  <VideoRow key={v.id} video={v} />
                ))}
              </div>

              <div className="flex items-center justify-center gap-4 border-t border-gray-200 px-6 py-4">
                <button
                  onClick={goPrev}
                  className="rounded-md px-2 py-1 text-sm text-gray-600 hover:bg-gray-100 disabled:opacity-40"
                  disabled={page === 1}
                >
                  이전
                </button>
                <div className="flex items-center gap-2">
                  {Array.from({ length: totalPages }).map((_, i) => {
                    const n = i + 1;
                    const active = n === page;
                    return (
                      <button
                        key={n}
                        onClick={() => setPage(n)}
                        className={`h-6 w-6 rounded-full text-xs ${
                          active
                            ? 'bg-black text-white'
                            : 'text-gray-700 hover:bg-gray-100'
                        }`}
                      >
                        {n}
                      </button>
                    );
                  })}
                </div>
                <button
                  onClick={goNext}
                  className="rounded-md px-2 py-1 text-sm text-gray-600 hover:bg-gray-100 disabled:opacity-40"
                  disabled={page === totalPages}
                >
                  다음
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
