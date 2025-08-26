import Image from 'next/image';
import { ValidityType } from '@/types/validity';

interface FactBadgeProps {
  type: ValidityType;
  percent: number;
  width?: number;
  height?: number;
  className?: string;
  textSize?: 'xs' | 'sm' | 'lg';
}

const SVG_MAP: Record<ValidityType, string> = {
  true1: '/badge/true1.svg',
  true2: '/badge/true2.svg',
  true3: '/badge/true3.svg',
  true4: '/badge/true4.svg',
  true5: '/badge/true5.svg',
  false: '/badge/true0.svg',
};

const sizeMap = {
  xs: { text: 'text-xs', top: 'top-[3%]' },
  sm: { text: 'text-sm', top: 'top-[3%]' },
  lg: { text: 'text-lg', top: 'top-[6%]' },
} as const;

const FactBadge = ({
  type,
  percent,
  width = 120,
  height = 140,
  textSize = 'sm',
  className = '',
}: FactBadgeProps) => {
  const { text, top } = sizeMap[textSize] ?? sizeMap.sm;

  return (
    <div className={`relative ${className}`} style={{ width, height }}>
      <Image
        src={SVG_MAP[type]}
        alt="validityBadge"
        width={width}
        height={height}
        unoptimized
        priority={false}
      />
      <span
        className={`absolute ${top} left-1/2 w-full -translate-x-1/2 text-center font-bold text-white ${text} drop-shadow-[0_0_4px_rgba(0,0,0,0.2)]`}
      >
        {percent}
      </span>
    </div>
  );
};

export default FactBadge;
