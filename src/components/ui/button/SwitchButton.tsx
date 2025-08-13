import React from 'react';
import clsx from 'clsx';
import { Button } from './index';

type Option = { label: string; value: string };
type Props = {
  value: string;
  onChange: (val: string) => void;
  options: Option[];
  className?: string;
};

const SwitchButton = ({ value, onChange, options, className }: Props) => {
  return (
    <div
      role="tablist"
      aria-label="정렬 선택"
      className={clsx(
        'inline-flex items-center gap-1 rounded-xl bg-gray-100 p-1',
        className,
      )}
    >
      {options.map((opt) => {
        const active = value === opt.value;
        return (
          <Button
            key={opt.value}
            variant="outline"
            color="gray"
            size="xs"
            aria-pressed={active}
            role="tab"
            onClick={() => onChange(opt.value)}
            className={clsx(
              'rounded-lg border-0 px-4 py-2 font-medium shadow-none',
              active
                ? 'bg-white text-black'
                : 'text-gray-strong bg-transparent hover:bg-white/60 active:bg-white/80',
            )}
          >
            {opt.label}
          </Button>
        );
      })}
    </div>
  );
};

export default SwitchButton;
