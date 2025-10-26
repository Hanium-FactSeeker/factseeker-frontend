import Image from 'next/image';
import ValidityBadge from '../atoms/ValidityBadge';
import PoliticianImage from '@/components/ui/profile/PoliticianImage';
import X from '@/assets/logo/logo_x.svg';
import Youtube from '@/assets/logo/logo_youtube.svg';
import Facebook from '@/assets/logo/logo_facebook.svg';
import type { SnsHistoryItem } from '@/types/history';
import type { SnsType } from '@/types/logo';

interface SnsCardProps {
  snsItem: SnsHistoryItem;
  className?: string;
}

const SNS_MAP: Record<SnsType, React.FC<React.SVGProps<SVGSVGElement>>> = {
  x: X,
  youtube: Youtube,
  facebook: Facebook,
};

const SnsCard = ({ snsItem, className = '' }: SnsCardProps) => {
  const SnsLogo = SNS_MAP[snsItem.snsType];

  const handleClick = () => {
    if (snsItem.url) {
      window.open(snsItem.url, '_blank', 'noopener,noreferrer');
    }
  };

  return (
    <div
      className={`border-gray-normal flex h-[240px] w-full cursor-pointer gap-4 rounded-xl border bg-white p-4 transition-shadow hover:shadow-md ${className}`}
      onClick={handleClick}
    >
      <div className="relative flex-shrink-0">
        <PoliticianImage
          src={snsItem.politicianImage}
          alt={snsItem.politicianName}
          className="relative h-[120px] w-[120px]"
        />
        {snsItem.validity && snsItem.validityPercent && (
          <ValidityBadge
            type={snsItem.validity}
            percent={snsItem.validityPercent}
            className="absolute -top-2 -left-2"
          />
        )}
      </div>

      <div className="flex h-full min-w-0 flex-1 flex-col justify-between">
        <div className="flex-1">
          <div className="mb-2 flex items-center gap-2">
            <SnsLogo className="block h-5 w-10" />
            <span className="text-gray-strong text-xs">{snsItem.snsType.toUpperCase()}</span>
          </div>

          <h3 className="text-black-normal mb-2 text-sm font-bold">{snsItem.politicianName}</h3>
          <p className="text-black-normal mb-1 text-xs">{snsItem.politicianParty}</p>
          <p className="text-primary-normal mb-2 text-xs font-bold">
            신뢰성: {snsItem.validityPercent || 0}%
          </p>

          <p className="line-clamp-3 text-xs leading-4 break-all">{snsItem.post || ''}</p>
        </div>

        <div className="mt-auto">
          <p className="text-primary-normal mb-1 text-xs font-normal">
            해당 SNS 게시물로 이동 &gt;
          </p>
          <div className="text-gray-strong text-xs">{snsItem.date}</div>
        </div>
      </div>
    </div>
  );
};

export default SnsCard;
