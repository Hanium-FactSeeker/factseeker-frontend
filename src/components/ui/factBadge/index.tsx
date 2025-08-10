import { BadgeType } from '@/types/validity';

import True1 from '@/assets/validity/true1.svg';
import True2 from '@/assets/validity/true2.svg';
import True3 from '@/assets/validity/true3.svg';
import True4 from '@/assets/validity/true4.svg';
import True5 from '@/assets/validity/true5.svg';

interface FactBadgeProps {
  type: BadgeType;
  percent: string;
  width?: number | string;
  height?: number | string;
  className?: string;
  textSize?: 'xs' | 'sm';
}

/**
 * 신뢰도 등급별 SVG 컴포넌트 매핑 객체
 *
 * api 연결 시 신뢰도 등급 데이터에 따라 변경이 필요할 수 있습니다.
 * @type {Record<BadgeType, React.FC<React.SVGProps<SVGSVGElement>>>}
 */
const SVG_MAP: Record<BadgeType, React.FC<React.SVGProps<SVGSVGElement>>> = {
  true1: True1,
  true2: True2,
  true3: True3,
  true4: True4,
  true5: True5,
};

const FactBadge = ({
  type,
  percent,
  width = 120,
  height = 140,
  textSize = 'sm',
  className = '',
}: FactBadgeProps) => {
  const SvgBadge = SVG_MAP[type];
  const textClass = textSize === 'xs' ? 'text-xs' : 'text-sm';
  return (
    <div className={`relative ${className}`} style={{ width, height }}>
      <SvgBadge width={width} height={height} />
      <span
        className={`absolute top-[6%] left-1/2 -translate-x-1/2 font-bold text-white ${textClass} w-full text-center drop-shadow-[0_0_4px_rgba(0,0,0,0.2)]`}
      >
        {percent}
      </span>
    </div>
  );
};

export default FactBadge;
