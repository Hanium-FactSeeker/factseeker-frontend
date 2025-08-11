export type LogoType = 'main' | 'hero';
export type ReliabilityName = '팩씨' | 'GPT' | 'Claude';
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
