'use client';

import { forwardRef, type InputHTMLAttributes, type ReactNode } from 'react';
import clsx from 'clsx';

const sizeMap = {
  sm: 'h-10 text-sm px-3 rounded-lg',
  md: 'h-12 text-base px-4 rounded-xl',
  lg: 'h-14 text-base px-5 rounded-[20px]',
} as const;

type SizeKey = keyof typeof sizeMap;

export interface SearchInputProps
  extends InputHTMLAttributes<HTMLInputElement> {
  inputSize?: SizeKey;
  fullWidth?: boolean;
  iconRight?: ReactNode;
  iconLeft?: ReactNode;
}

const SearchInput = forwardRef<HTMLInputElement, SearchInputProps>(
  (
    {
      className = '',
      inputSize = 'md',
      fullWidth,
      iconLeft,
      iconRight,
      ...props
    },
    ref,
  ) => {
    return (
      <div
        className={clsx(
          'border-gray-normal relative flex items-center gap-2 border bg-white',
          sizeMap[inputSize],
          fullWidth ? 'w-full' : 'w-96',
          'rounded-xl',
          className,
        )}
      >
        {iconLeft && <div className="flex items-center pl-3">{iconLeft}</div>}

        <input
          ref={ref}
          {...props}
          className={clsx(
            'text-black-normal placeholder-gray-strong flex-1 bg-transparent outline-none',
            iconLeft && 'pl-1',
            iconRight && 'pr-1',
          )}
        />

        {iconRight && <div className="flex items-center pr-3">{iconRight}</div>}
      </div>
    );
  },
);

SearchInput.displayName = 'SearchInput';

export default SearchInput;
