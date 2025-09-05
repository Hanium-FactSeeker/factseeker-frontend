'use client';

import { Button } from '@/components/ui/button';
import clsx from 'clsx';

type Props = {
  keywords: string[];
  selected: string | null;
  onSelect: (k: string) => void;
};

/**
 * 키워드 리스트 컴포넌트
 *
 * - 키워드 목록을 그리드(컬럼 3)으로 보여줍니다.
 * - 데스크톱과 모바일에서 버튼 크기와 스타일이 다르도록 tailwindCSS 유틸리티 클래스를 사용하여 구현했습니다.
 */
export const KeywordList = ({ keywords, selected, onSelect }: Props) => {
  return (
    <div className="grid auto-rows-[48px] grid-cols-3 gap-4">
      {keywords.map((k, idx) => {
        const isSelected = selected === k;
        return (
          <div key={`${k}-${idx}`} className="flex justify-center">
            {/* PC UI */}
            <div className="hidden md:block">
              <Button
                variant="outline"
                color="gray"
                size="sm"
                onClick={() => onSelect(k)}
                aria-pressed={isSelected}
                className={clsx(
                  'hover:border-primary-normal rounded-xl transition-all',
                  isSelected && 'border-primary-normal whitespace-nowrap shadow-md',
                )}
              >
                {k}
              </Button>
            </div>
            {/* 모바일 UI */}
            <div className="block md:hidden">
              <Button
                key={k}
                variant="outline"
                color="gray"
                size="xs"
                onClick={() => onSelect(k)}
                aria-pressed={isSelected}
                className={clsx(
                  'hover:border-primary-normal rounded-xl whitespace-nowrap transition-all',
                  isSelected && 'border-primary-normal whitespace-nowrap shadow-md',
                )}
              >
                {k}
              </Button>
            </div>
          </div>
        );
      })}
    </div>
  );
};
