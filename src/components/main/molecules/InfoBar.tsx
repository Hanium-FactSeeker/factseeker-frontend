'use client';

import { useRotatingKeyword } from '@/hooks/useRotatingKeyword';
import { KEYWORDS } from '@/constants/hotKeywords';

/**
 * InfoBar 컴포넌트
 *
 * 메인페이지에서 상단 정보를 표시하는 컴포넌트입니다.
 * - 좌측에는 업데이트 시간을 표시
 * - 우측에는 "실시간 검색어" 제목과 현재 순위/키워드 목록을 표시
 *
 * 1. **업데이트 시간 영역**
 *    - `업데이트 시간` 라벨과 시간 값(`00:00:00 `)형식으로 표시
 *    - 백엔드 api 연결 시 변경 예정
 *
 *
 * 2. **실시간 검색어 박스**
 * - `KEYWORDS` 배열(상위 5개 검색어)을 받아 2.5초마다 순서대로 전환함
 **/
const InfoBar = () => {
  const { idx, transform, rowHeight } = useRotatingKeyword(KEYWORDS, {
    intervalMs: 2500,
    rowHeight: 24,
  });
  return (
    <div className="flex w-full items-center justify-between px-4 py-2 md:px-10">
      <div className="text-primary-navy flex gap-2 text-xs font-medium md:text-sm">
        <span>업데이트 시간</span>
        <span>20:00:00</span>
      </div>

      <div className="flex w-50 items-center gap-3 rounded-xl border-1 border-gray-200 bg-white p-2 md:w-80 md:gap-4 md:p-4">
        <span className="text-xs font-semibold md:text-sm">실시간 검색어</span>

        <div
          className="relative h-6 overflow-hidden md:h-6"
          style={{ width: 180 }}
          aria-live="polite"
        >
          <div
            className="transition-transform duration-500 ease-out will-change-transform"
            style={transform}
          >
            {KEYWORDS.map((kw, i) => (
              <div
                key={kw}
                className="flex h-6 items-center justify-between text-xs md:text-sm"
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
