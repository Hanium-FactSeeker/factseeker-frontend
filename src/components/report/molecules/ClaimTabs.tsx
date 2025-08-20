'use client';

import React, { useMemo, useState } from 'react';

export const ClaimTabs = () => {
  const claims = Array.from({ length: 10 }, (_, i) => `주장 ${i + 1}`);
  const [activeIndex, setActiveIndex] = useState(0);

  const firstRow = useMemo(() => claims.slice(0, 5), [claims]); // 1~5
  const secondRow = useMemo(() => claims.slice(5, 10), [claims]); // 6~10

  const btnClass = (isActive: boolean) =>
    `px-2 text-xs font-medium transition md:px-4 md:text-base ${
      isActive
        ? 'bg-primary-light h-7 rounded-t-lg text-white md:h-14'
        : 'h-5 bg-transparent text-gray-800 hover:text-purple-500 h-10'
    }`;

  return (
    <div className="flex w-full flex-col items-center">
      {/* 모바일 레이아웃 */}
      <div className="w-[90%] rounded-t-xl bg-white px-2 md:hidden">
        <div className="flex flex-col items-center gap-1">
          {/* 1~5 */}
          <div className="flex h-8 items-end gap-2">
            {firstRow.map((claim, idx) => {
              const index = idx;
              const isActive = activeIndex === index;
              return (
                <button
                  key={index}
                  onClick={() => setActiveIndex(index)}
                  className={btnClass(isActive)}
                >
                  {claim}
                </button>
              );
            })}
          </div>

          {/* 6~10 */}
          <div className="flex h-8 items-end gap-2">
            {secondRow.map((claim, idx) => {
              const index = idx + 5;
              const isActive = activeIndex === index;
              return (
                <button
                  key={index}
                  onClick={() => setActiveIndex(index)}
                  className={btnClass(isActive)}
                >
                  {claim}
                </button>
              );
            })}
          </div>
        </div>
      </div>

      {/* PC 레이아웃 */}
      <div className="hidden h-10 w-[70%] items-end gap-3 rounded-t-xl bg-white px-2 md:flex">
        {claims.map((claim, index) => {
          const isActive = activeIndex === index;
          return (
            <button
              key={index}
              onClick={() => setActiveIndex(index)}
              className={btnClass(isActive)}
            >
              {claim}
            </button>
          );
        })}
      </div>
    </div>
  );
};

export default ClaimTabs;
