'use client';

import React from 'react';
import { useRotatingList } from '@/hooks/useRotatingList';

type VerticalSliderProps<T> = {
  slides: T[][];
  cols: number;
  intervalMs?: number;
  rowHeight?: number;
  className?: string;
  slidePaddingClass?: string;
  renderItem: (item: T) => React.ReactNode;
};

/**
 * 세로 방향 자동 회전 슬라이더 컴포넌트.
 * 주어진 2차원 배열(slides)의 각 행을 하나의 슬라이드로 렌더링하고,
 * `intervalMs` 간격으로 다음 행으로 전환합니다.
 * 각 행의 높이는 `rowHeight`로 고정됩니다.
 *
 * @template T 항목 타입
 * @param {T[][]} props.slides 슬라이드로 표시할 행 단위 아이템 배열
 * @param {number} props.cols 한 슬라이드의 열 수 (예: 모바일 1, 데스크톱 3)
 * @param {number} [props.intervalMs=3000] 슬라이드 전환 간격(ms)
 * @param {number} [props.rowHeight=224] 각 슬라이드(행) 높이(px)
 * @param {string} [props.className] 바깥 컨테이너에 추가할 클래스
 * @param {string} [props.slidePaddingClass='gap-2 px-4'] 슬라이드 내부 여백/간격 클래스
 * @param {(item: T) => React.ReactNode} props.renderItem 개별 아이템 렌더러
 * @returns {JSX.Element} 세로 자동 슬라이더
 */
function VerticalSlider<T>({
  slides,
  cols,
  intervalMs = 3000,
  rowHeight = 224,
  className = '',
  slidePaddingClass = 'gap-2 px-4',
  renderItem,
}: VerticalSliderProps<T>) {
  const { transform, rowHeight: rh } = useRotatingList(slides, {
    intervalMs,
    rowHeight,
  });

  return (
    <div
      className={`border-gray-normal relative h-40 w-full overflow-hidden rounded-xl border bg-white md:h-56 ${className}`}
    >
      <div
        className="transition-transform duration-500 ease-out will-change-transform"
        style={transform}
      >
        {slides.map((group, i) => (
          <div
            key={`slide-${i}`}
            className={`grid h-auto w-full items-center md:h-56 ${slidePaddingClass}`}
            style={{
              height: rh,
              display: 'grid',
              gridTemplateColumns: `repeat(${cols}, minmax(0, 1fr))`,
            }}
          >
            {group.map((item, idx) => (
              <div key={idx} className="h-full w-full overflow-hidden">
                {renderItem(item)}
              </div>
            ))}

            {/* 부족한 칸 placeholder 채우기 */}
            {group.length < cols &&
              Array.from({ length: cols - group.length }).map((_, k) => (
                <div key={`ph-${k}`} className="h-full w-full" />
              ))}
          </div>
        ))}
      </div>
    </div>
  );
}

export default VerticalSlider;
