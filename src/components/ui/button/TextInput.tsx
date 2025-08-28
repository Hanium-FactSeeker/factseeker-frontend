'use client';

import React from 'react';
import clsx from 'clsx';
import { TextInputProps } from './types';

const sizeMap = {
  sm: 'h-10 md:h-10 text-sm md:text-sm px-3 md:px-3 rounded-lg md:rounded-lg',
  md: 'h-12 md:h-12 text-base md:text-base px-4 md:px-5 rounded-xl md:rounded-2xl',
  lg: 'h-14 md:h-16 text-base md:text-lg px-5 md:px-6 rounded-[20px] md:rounded-[24px]',
};

export default function TextInput({
  className = '',
  iconLeft,
  iconRight,
  inputSize = 'md',
  fullWidth,
  ...props
}: TextInputProps) {
  const widthClass = fullWidth ? 'w-full' : 'w-full md:w-96';

  return (
    <div
      className={clsx(
        'relative flex items-center gap-2 md:gap-3',
        'bg-gray-light text-foreground',
        widthClass,
        sizeMap[inputSize],
        className,
      )}
    >
      {iconLeft && (
        <div className="text-gray-strong flex items-center justify-center">
          {iconLeft}
        </div>
      )}

      <input
        {...props}
        className={clsx(
          'text-foreground placeholder:text-gray-strong flex-1 bg-transparent',
          'appearance-none selection:bg-transparent focus:ring-0 focus:outline-none',
        )}
      />

      {iconRight && (
        <div className="text-gray-strong flex items-center justify-center">
          {iconRight}
        </div>
      )}
    </div>
  );
}
