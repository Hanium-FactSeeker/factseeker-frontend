'use client';

import { Button } from '@/components/ui/button';
import clsx from 'clsx';

export const KeywordList = ({
  keywords,
  selected,
  onSelect,
}: {
  keywords: string[];
  selected: string | null;
  onSelect: (k: string) => void;
}) => {
  return (
    <div className="grid grid-cols-3 gap-4">
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
                  isSelected &&
                    'border-primary-normal whitespace-nowrap shadow-sm md:px-8 md:py-4',
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
                  isSelected &&
                    'border-primary-normal px-4 py-4 whitespace-nowrap shadow-sm',
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
