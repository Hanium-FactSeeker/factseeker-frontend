'use client';

import ReliabilityStat from '@/components/ui/validity';
import PoliticianImage from '../../ui/profile/PoliticianImage';
import { useRotatingList } from '@/hooks/useRotatingList';
import { POLITICIANS } from '@/constants/politicians';
import Link from 'next/link';

const PoliticianSection = () => {
  const { idx, transform, rowHeight } = useRotatingList(POLITICIANS, {
    intervalMs: 3000,
    rowHeight: 224,
  });
  return (
    <div className="flex h-40 w-[90%] flex-col items-center md:h-auto md:w-[759px]">
      <div className="mb-3 flex w-full items-center justify-between px-4 md:px-8">
        <p className="text-primary-normal text-md font-extrabold md:text-xl">
          현재 신뢰도 {idx + 1}위
        </p>
        <Link
          href="/politician"
          className="z-50 -mb-3 flex text-xs font-medium hover:cursor-pointer md:text-sm"
        >
          정치인 신뢰도 분석 바로가기 &gt;
        </Link>
      </div>

      {/* 뷰포트(고정높이) */}
      <div className="relative h-56 w-full overflow-hidden rounded-xl border bg-white">
        {/* 슬라이더 트랙 */}
        <div
          className="transition-transform duration-500 ease-out will-change-transform"
          style={transform}
        >
          {POLITICIANS.map((p) => (
            <div
              key={p.name}
              className="flex h-56 w-full items-center justify-around"
              style={{ height: rowHeight }}
            >
              <div>
                <PoliticianImage
                  src={p.img}
                  alt={`${p.name} 이미지`}
                  className="relative h-18 w-18 md:h-40 md:w-40"
                />
              </div>

              <div className="flex flex-col items-center gap-1 md:gap-3">
                <p className="text-black-normal text-md font-bold md:text-2xl">
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
          ))}
        </div>
      </div>
    </div>
  );
};

export default PoliticianSection;
