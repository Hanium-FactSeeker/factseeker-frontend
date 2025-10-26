import PoliticianImage from '@/components/ui/profile/PoliticianImage';
import ValidityBadge from '../atoms/ValidityBadge';
import type { PoliticianHistoryItem } from '@/types/history';

interface PoliticianCardProps {
  politician: PoliticianHistoryItem;
  className?: string;
}

const PoliticianCard = ({ politician, className = '' }: PoliticianCardProps) => {
  return (
    <div
      className={`border-gray-normal flex h-[240px] w-full gap-4 rounded-xl border bg-white p-4 transition-shadow hover:shadow-md ${className}`}
    >
      <div className="relative flex-shrink-0">
        <PoliticianImage
          src={politician.politicianImage}
          alt={politician.politicianName}
          className="relative h-[120px] w-[120px]"
        />
        {politician.validity && politician.validityPercent && (
          <ValidityBadge
            type={politician.validity}
            percent={politician.validityPercent}
            className="absolute -top-2 -left-2"
          />
        )}
      </div>

      <div className="flex h-full min-w-0 flex-1 flex-col justify-between">
        <div className="flex-1">
          <span className="text-gray-strong mb-1 block text-xs">정치인</span>
          <h3 className="text-black-normal mb-2 text-sm font-bold">{politician.politicianName}</h3>
          <p className="text-black-normal mb-1 text-xs">{politician.politicianParty}</p>
          <p className="text-primary-normal mb-2 text-xs font-bold">
            현재 누적 신뢰도: {politician.trustScore || 0}%
          </p>
        </div>

        <div className="text-gray-strong mt-auto text-xs">{politician.date}</div>
      </div>
    </div>
  );
};

export default PoliticianCard;
