'use client';

import React, { useMemo } from 'react';

type ClaimTabsProps = {
  count: number;
  activeIdx: number;
  onChange: (index: number) => void;
};

const MAX_PER_ROW_MOBILE = 5;

/**
 * 주장의 개수에 따라 표시하는 탭의 개수가 결정됩니다
 * - 모바일: 주장 리스트를 2줄(최대 5개 + 나머지)에 걸쳐 보여줍니다
 * - 데스크톱: 주장 리스트를 한 줄에 모두 보여줍니다
 */
export const ClaimTabs = ({ count, activeIdx, onChange }: ClaimTabsProps) => {
  const labels = useMemo(
    () => Array.from({ length: Math.max(0, count) }, (_, i) => `주장 ${i + 1}`),
    [count],
  );

  const firstRow = useMemo(() => labels.slice(0, MAX_PER_ROW_MOBILE), [labels]);
  const secondRow = useMemo(() => labels.slice(MAX_PER_ROW_MOBILE), [labels]);

  const btnClass = (isActive: boolean) =>
    `px-2 text-xs font-medium transition md:px-4 md:text-base ${
      isActive
        ? 'bg-primary-light h-7 rounded-t-lg text-white md:h-14'
        : 'bg-transparent text-gray-800 hover:text-purple-500 h-7 md:h-10'
    }`;

  if (count <= 0) return null;

  return (
    <div className="flex w-full flex-col items-center">
      {/* 모바일: 두 줄 */}
      <div className="w-[90%] rounded-t-xl bg-white px-2 md:hidden">
        <div className="flex flex-col items-center gap-1">
          {firstRow.length > 0 && (
            <div className="flex h-8 items-end gap-2">
              {firstRow.map((label, idx) => {
                const index = idx;
                const isActive = activeIdx === index;
                return (
                  <button
                    key={index}
                    onClick={() => onChange(index)}
                    className={btnClass(isActive)}
                  >
                    {label}
                  </button>
                );
              })}
            </div>
          )}

          {secondRow.length > 0 && (
            <div className="flex h-8 items-end gap-2 self-start px-4">
              {secondRow.map((label, idx) => {
                const index = idx + MAX_PER_ROW_MOBILE;
                const isActive = activeIdx === index;
                return (
                  <button
                    key={index}
                    onClick={() => onChange(index)}
                    className={btnClass(isActive)}
                  >
                    {label}
                  </button>
                );
              })}
            </div>
          )}
        </div>
      </div>

      {/* PC: 한 줄 */}
      <div className="hidden h-10 w-[70%] items-end gap-3 rounded-t-xl bg-white px-2 md:flex">
        {labels.map((label, index) => {
          const isActive = activeIdx === index;
          return (
            <button key={index} onClick={() => onChange(index)} className={btnClass(isActive)}>
              {label}
            </button>
          );
        })}
      </div>
    </div>
  );
};

export default ClaimTabs;
