'use client';

import { useMemo, useState } from 'react';
import Link from 'next/link';
import PoliticianImage from '@/components/ui/profile/PoliticianImage';
import ReliabilityStat from '@/components/ui/validity';
import SwitchButton from '@/components/ui/button/SwitchButton';
import VideoCard from '@/components/politician/molecules/VideoCard';
import type { VideoItem } from '@/constants/videoList';
import { BiLeftArrow, BiRightArrow } from 'react-icons/bi';
import SearchInput from '@/components/ui/search';

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

  const [keyword, setKeyword] = useState('');

  return (
    <section className="w-full md:hidden">
      <div className="mb-4">
        <SearchInput
          placeHolder="순위에 없는 다른 정치인도 검색해 보세요"
          value={keyword}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
            setKeyword(e.target.value)
          }
          onClick={() => {}}
        />
      </div>

      <div className="mt-6 mb-2 flex items-center justify-end ">
        {updatedAt && <p className="text-[11px] text-gray-normal">{updatedAt}</p>}
      </div>

      <div className="gap-3 rounded-2xl bg-white p-5">
        <div className='mb-5 rounded-2xl border border-gray-200 p-4'>
          <div className="mb-3">
          <Link
            href="/politician"
            className="text-sm font-medium text-gray-500 hover:underline"
          >
            {'< 다시 선택'}
          </Link>
        </div>

        <div className="mb-5 flex items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="relative h-16 w-16 shrink-0">
              <PoliticianImage src={imgSrc} alt={`${politician.name} 이미지`} />
            </div>
            <div className="min-w-0">
              <p className="text-black-normal truncate text-base font-bold">
                {politician.name}
              </p>
              <p className="text-black-normal mt-1 truncate text-xs">
                {politician.party}
              </p>
            </div>
          </div>

          <div className="flex min-w-[150px] flex-col gap-2 text-left">
            <ReliabilityStat
              iconWidth={16}
              iconHeight={16}
              name="팩씨"
              value={politician.stats.fact}
            />
            <ReliabilityStat
              iconWidth={16}
              iconHeight={16}
              name="GPT"
              value={politician.stats.gpt}
            />
            <ReliabilityStat
              iconWidth={16}
              iconHeight={16}
              name="Claude"
              value={politician.stats.claude}
            />
          </div>
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
      </div>

      {tab === 'youtube' ? (
        <>
          <div className="grid grid-cols-1 gap-3">
            {pageVideos.map((v) => (
              <VideoCard key={v.id} video={v} />
            ))}
          </div>

          <div className="mt-4 flex items-center justify-between">
            <button
              onClick={goPrev}
              className="rounded-md p-2 text-gray-600 hover:bg-gray-100 disabled:opacity-40"
              disabled={page === 1}
              aria-label="이전 페이지"
            >
              <BiLeftArrow className="h-4 w-4" />
            </button>

            <div className="flex items-center gap-2">
              {Array.from({ length: totalPages }).map((_, i) => {
                const n = i + 1;
                const active = n === page;
                return (
                  <button
                    key={n}
                    onClick={() => setPage(n)}
                    aria-label={`페이지 ${n}`}
                    className={`h-2 w-2 rounded-full ${active ? 'bg-black' : 'bg-gray-300'}`}
                  />
                );
              })}
            </div>

            <button
              onClick={goNext}
              className="rounded-md p-2 text-gray-600 hover:bg-gray-100 disabled:opacity-40"
              disabled={page === totalPages}
              aria-label="다음 페이지"
            >
              <BiRightArrow className="h-4 w-4" />
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
