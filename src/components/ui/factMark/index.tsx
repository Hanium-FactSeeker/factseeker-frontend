import Image from 'next/image';
import type { ValidityType } from '@/types/validity';

interface FactBadgeProps {
  type: ValidityType;
  width?: number;
  height?: number;
  className?: string;
  textSize?: 'xs' | 'sm';
}

/**
 * 신뢰도 등급별 SVG 컴포넌트 마크
 *
 * @type {Record<BadgeType, React.FC<React.SVGProps<SVGSVGElement>>>}
 */
const SVG_MAP: Record<ValidityType, string> = {
  true1: '/mark/true1.svg',
  true2: '/mark/true2.svg',
  true3: '/mark/true3.svg',
  true4: '/mark/true4.svg',
  true5: '/mark/true5.svg',
  false: '/mark/true0.svg',
};

const FactMark = ({
  type,
  width = 120,
  height = 140,
  textSize = 'sm',
  className = '',
}: FactBadgeProps) => {
  const textClass = textSize === 'xs' ? 'text-xs' : 'text-sm';
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
    </div>
  );
};

export default FactMark;
