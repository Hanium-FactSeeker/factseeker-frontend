import ReliabilityStat from '@/components/ui/validity';
import PoliticianImage from '../../ui/profile/PoliticianImage';
import Link from 'next/link';

const PoliticianSection = () => {
  return (
    <div className="flex h-40 w-[90%] flex-col items-center md:h-auto md:w-[759px]">
      <div className="mb-3 flex w-full items-center justify-between px-4 md:px-8">
        <p className="text-primary-normal text-md font-extrabold md:text-xl">
          현재 신뢰도 1위
        </p>
        <Link
          href={'/politician'}
          className="z-50 -mb-3 flex text-xs font-medium hover:cursor-pointer md:text-sm"
        >
          정치인 신뢰도 분석 바로가기 &gt;
        </Link>
      </div>
      <div className="border-primary-normal flex h-56 w-full items-center justify-around rounded-xl border bg-white">
        <div>
          <PoliticianImage
            src=""
            alt="정치인이미지"
            className="relative h-18 w-18 md:h-40 md:w-40"
          />
        </div>
        <div className="flex flex-col items-center gap-1 md:gap-3">
          <p className="text-black-normal text-md font-bold md:text-2xl">
            이국민
          </p>
          <p className="text-black-normal text-sm font-normal md:text-base">
            민주국민정당
          </p>
        </div>
        <div className="flex flex-col gap-2">
          <ReliabilityStat
            iconWidth={30}
            iconHeight={30}
            name={'팩씨'}
            value={80}
          />
          <ReliabilityStat
            iconWidth={20}
            iconHeight={20}
            name={'GPT'}
            value={70}
          />
          <ReliabilityStat
            iconWidth={20}
            iconHeight={20}
            name={'Claude'}
            value={60}
          />
        </div>
      </div>
    </div>
  );
};

export default PoliticianSection;
