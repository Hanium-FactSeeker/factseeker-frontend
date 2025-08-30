'use client';

import { useEffect, useRef, useState } from 'react';
import { useRotatingList } from '@/hooks/useRotatingList';
import { getLatestTrends } from '@/apis/trend/getHotKeywords';

const InfoBar = () => {
  const [keywords, setKeywords] = useState<string[]>([]);
  const fetchedRef = useRef(false);

  useEffect(() => {
    if (fetchedRef.current) return;
    fetchedRef.current = true;

    (async () => {
      try {
        const ks = await getLatestTrends(5);
        setKeywords(ks);
      } catch (e) {
        console.error('[InfoBar] latest-trends error:', e);
      }
    })();
  }, []);

  const { transform, rowHeight } = useRotatingList(keywords, {
    intervalMs: 2500,
    rowHeight: 24,
  });

  return (
    <div className="text-black-normal flex w-full items-center justify-between px-4 md:px-10">
      <div className="text-primary-navy flex gap-2 text-[10px] font-medium md:text-sm">
        {/* <span>업데이트 시간</span>
        <span>{updatedAt || '--:--:--'}</span> */}
      </div>

      <div className="flex w-50 items-center rounded-xl border-1 border-gray-200 bg-white p-2 md:w-80 md:gap-4 md:p-4">
        <span className="w-full text-[10px] font-semibold md:w-1/2 md:text-sm">
          실시간 정치 트렌드
        </span>

        <div
          className="relative h-6 overflow-hidden md:h-6"
          style={{ width: 180 }}
          aria-live="polite"
        >
          <div
            className="transition-transform duration-500 ease-out will-change-transform"
            style={transform}
          >
            {keywords.map((kw, i) => (
              <div
                key={`${kw}-${i}`}
                className="flex h-6 items-center gap-4 text-xs md:w-full md:text-sm"
                style={{ height: rowHeight }}
              >
                <span className="font-bold tabular-nums">{i + 1}</span>
                <span className="mr-2 font-bold">{kw}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default InfoBar;
