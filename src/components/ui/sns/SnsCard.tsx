import PoliticianImage from '../profile/PoliticianImage';
import X from '@/assets/logo/logo_x.svg';
import Youtube from '@/assets/logo/logo_youtube.svg';
import Facebook from '@/assets/logo/logo_facebook.svg';
import type { SnsType } from '@/types/logo';
import clsx from 'clsx';
import { useSnsTracking } from '@/hooks/gtm/useSnsTracking';

const SNS_MAP: Record<SnsType, React.FC<React.SVGProps<SVGSVGElement>>> = {
  x: X,
  youtube: Youtube,
  facebook: Facebook,
};

interface SnsCardProps {
  type: SnsType;
  name: string;
  party: string;
  percentage: number;
  figureImg: string;
  className?: string;
  post?: string;
  postedAt?: string;
  url?: string;
}

const SnsCard = ({
  type,
  name,
  party,
  percentage,
  figureImg,
  className,
  post,
  url,
}: SnsCardProps) => {
  const SnsLogo = SNS_MAP[type] ?? X;

  const { trackSnsExternalClick } = useSnsTracking();

  const handleOpen = () => {
    if (!url || !url.trim()) return;
    trackSnsExternalClick(name, type);
    window.open(url, '_blank', 'noopener,noreferrer');
  };

  return (
    <div
      className={clsx(
        'border-gray-normal flex h-[248px] w-40 flex-col items-center gap-3 rounded-xl border bg-white py-2 md:h-[296px] md:w-56',
        className,
      )}
    >
      <div className="mt-2 flex h-8 shrink-0 items-center justify-center">
        <SnsLogo className="block h-6 w-12 md:h-8 md:w-16" />
      </div>

      <div className="flex gap-4">
        <PoliticianImage
          src={figureImg}
          alt={name}
          className="relative h-14 w-14 md:h-20 md:w-20"
        />
        <div className="flex flex-col gap-1">
          <p className="text-black-normal text-sm font-bold md:text-base">{name}</p>
          <p className="text-black-normal text-center text-xs font-normal md:text-xs">{party}</p>
          <p className="text-primary-normal text-xs font-bold md:text-sm">신뢰성: {percentage}</p>
        </div>
      </div>

      <div className="border-gray-normal w-11 border-b" />

      <p className="line-clamp-3 w-[8.5rem] text-center text-xs break-all md:w-[11.5rem] md:text-xs md:leading-6">
        {post ?? ''}
      </p>

      <p
        className="text-primary-normal text-xs font-normal hover:cursor-pointer md:text-sm"
        onClick={(e) => {
          e.stopPropagation();
          handleOpen();
        }}
      >
        해당 SNS 게시물로 이동 &gt;
      </p>
    </div>
  );
};

export default SnsCard;
