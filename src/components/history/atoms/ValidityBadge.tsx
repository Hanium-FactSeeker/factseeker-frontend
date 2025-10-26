import Image from 'next/image';
import type { ValidityType } from '@/types/validity';

interface ValidityBadgeProps {
  type: ValidityType;
  percent: number;
  className?: string;
}

const ValidityBadge = ({ type, percent, className = '' }: ValidityBadgeProps) => {
  const getBadgeColor = (type: ValidityType) => {
    switch (type) {
      case 'true1':
        return 'bg-green-500';
      case 'true2':
        return 'bg-green-400';
      case 'true3':
        return 'bg-yellow-400';
      case 'true4':
        return 'bg-orange-400';
      case 'true5':
        return 'bg-red-500';
      case 'false':
        return 'bg-red-600';
      default:
        return 'bg-gray-400';
    }
  };

  return (
    <div className={`relative ${className}`}>
      <div
        className={`flex h-6 w-16 items-center justify-center rounded-full ${getBadgeColor(type)}`}
      >
        <span className="text-xs font-bold text-white">경계 필요</span>
      </div>
    </div>
  );
};

export default ValidityBadge;
