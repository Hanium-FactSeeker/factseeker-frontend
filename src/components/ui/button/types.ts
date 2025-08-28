import { ButtonHTMLAttributes, ReactNode, InputHTMLAttributes } from 'react';

export type ButtonVariant = 'filled' | 'outline';
export type ButtonColor =
  | 'default'
  | 'kakao'
  | 'naver'
  | 'black'
  | 'gray'
  | 'purple';
export type ButtonSize = 'xxs' | 'xs' | 'sm' | 'md' | 'lg';

export type InputSize = 'sm' | 'md' | 'lg';

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

export interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  iconLeft?: React.ReactNode;
  iconRight?: React.ReactNode;
  inputSize?: InputSize;
  fullWidth?: boolean;
}

export interface TextInputProps
  extends Omit<InputHTMLAttributes<HTMLInputElement>, 'size'> {
  className?: string;
  iconLeft?: ReactNode;
  iconRight?: ReactNode;
  inputSize?: InputSize;
  fullWidth?: boolean;
}

export interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  iconLeft?: ReactNode;
  iconRight?: ReactNode;
  inputSize?: 'sm' | 'md' | 'lg';
  fullWidth?: boolean;
}
