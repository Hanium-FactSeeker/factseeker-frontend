import Image from 'next/image';
import { BadgeType } from '@/types/validity';

interface FactBadgeProps {
  type: BadgeType;
  percent: string;
  width?: number;
  height?: number;
  className?: string;
  textSize?: 'xs' | 'sm';
}

/**
 * 신뢰도 등급별 SVG 컴포넌트 객체
 *
 * api 연결 시 신뢰도 등급 데이터에 따라 변경이 필요할 수 있습니다.
 * @type {Record<BadgeType, React.FC<React.SVGProps<SVGSVGElement>>>}
 */
const SVG_MAP: Record<BadgeType, string> = {
  true1: '/validity/true1.svg',
  true2: '/validity/true2.svg',
  true3: '/validity/true3.svg',
  true4: '/validity/true4.svg',
  true5: '/validity/true5.svg',
};

const FactBadge = ({
  type,
  percent,
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
        unoptimized // SVG는 최적화 대상 아님 → 켜두면 안전
        priority={false}
      />
      <span
        className={`absolute top-[6%] left-1/2 -translate-x-1/2 font-bold text-white ${textClass} w-full text-center drop-shadow-[0_0_4px_rgba(0,0,0,0.2)]`}
      >
        {percent}
      </span>
    </div>
  );
};

export default FactBadge;
