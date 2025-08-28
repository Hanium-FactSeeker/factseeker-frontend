export type LogoType = 'main' | 'hero';
export type ReliabilityName = 'GPT' | 'Gemini' | '전체';
export type SnsType = 'facebook' | 'x' | 'youtube';

export interface LogoProps {
  type?: LogoType;
}

export interface ReliabilityStatProps {
  name: ReliabilityName;
  value: number;
  iconWidth?: number | string;
  iconHeight?: number | string;
  iconClassName?: string;
}

export interface IconProps {
  name: ReliabilityName;
  width?: number | string;
  height?: number | string;
  className?: string;
}
