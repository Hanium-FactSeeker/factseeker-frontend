import { ButtonHTMLAttributes, ReactNode } from 'react';

export type ButtonVariant = 'filled' | 'outline';
export type ButtonColor =
  | 'default'
  | 'kakao'
  | 'naver'
  | 'black'
  | 'gray'
  | 'purple';
export type ButtonSize = 'xxs' | 'xs' | 'sm' | 'md' | 'lg';

export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  children?: ReactNode;
  variant?: ButtonVariant;
  color?: ButtonColor;
  size?: ButtonSize;
  iconLeft?: ReactNode;
  iconRight?: ReactNode;
  fullWidth?: boolean;
  loading?: boolean;
}
