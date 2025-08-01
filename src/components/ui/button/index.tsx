import React from 'react';
import clsx from 'clsx';
import { ButtonProps, ButtonColor } from './types';

const colorMap: Record<ButtonColor, string> = {
  default: 'bg-gray-light text-black-normal hover:bg-gray-normal',
  kakao: 'bg-[#FEE500] text-black-normal hover:bg-[#ffe953]',
  naver: 'bg-[#03C75A] text-white hover:bg-[#03C75A]',
  black: 'bg-black-normal text-white hover:bg-black-alternative',
  gray: 'bg-gray-normal text-black-normal hover:bg-gray-strong',
  purple: 'bg-primary-normal text-white hover:bg-primary-light',
};

const outlineMap: Record<ButtonColor, string> = {
  default:
    'border border-gray-400 text-black hover:bg-gray-light active:bg-gray-normal transition-colors',
  kakao:
    'border text-black hover:bg-[#fee500]/60 active:bg-[#fee500]/90 transition-colors',
  naver:
    'border border-green-500 text-green-500 hover:bg-[#03C75A]/10 active:bg-[#03C75A]/20 transition-colors',
  black:
    'border border-black text-black hover:bg-black-normal/10 active:bg-black-normal/20 transition-colors',
  gray: 'border border-gray-300 text-black hover:border-gray-strong active:bg-gray-strong transition-colors',
  purple:
    'border border-primary-normal text-primary-normal hover:bg-primary-light/10 active:bg-primary-normal/10 transition-colors',
};

const sizeMap = {
  xxs: 'text-xs px-3 py-2 md:text-sm md:px-3 md:py-2 rounded font-medium ',
  xs: 'text-xs px-3 py-2 md:px-5 md:py-3 rounded font-semibold ',
  sm: 'text-sm px-3 py-2 md:px-5 md:py-2 rounded font-semibold ',
  md: 'text-sm px-6 py-2 md:px-6 md:py-2 rounded font-semibold ',
  lg: 'text-sm px-8 rounded py-3 md:text-lg md:px-8 md:rounded-xl font-semibold ',
};

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      children,
      variant = 'filled',
      color = 'default',
      size = 'md',
      iconLeft,
      iconRight,
      fullWidth,
      loading,
      disabled,
      className,
      ...props
    },
    ref,
  ) => {
    const base =
      'inline-flex items-center gap-2 justify-center rounded-lg transition focus:outline-none cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed';
    let style = '';

    if (variant === 'filled') {
      style = colorMap[color];
    } else if (variant === 'outline') {
      style = outlineMap[color] ?? outlineMap.default;
    }

    return (
      <button
        ref={ref}
        type={props.type || 'button'}
        className={clsx(
          base,
          style,
          sizeMap[size],
          { 'w-full': fullWidth },
          className,
        )}
        disabled={disabled || loading}
        {...props}
      >
        {iconLeft && <span>{iconLeft}</span>}
        {loading ? <span className="animate-spin">⏳</span> : children}
        {iconRight && <span>{iconRight}</span>}
      </button>
    );
  },
);

Button.displayName = 'Button';
