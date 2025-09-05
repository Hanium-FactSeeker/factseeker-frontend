import FactBadge from '@/components/ui/factBadge';
import { percentToValidity } from '@/utils/calculateValidity';

interface ReportTitleProps {
  totalScore: number;
}

const ReportTitle = ({ totalScore }: ReportTitleProps) => {
  return (
    <div className="flex h-40 w-[80%] flex-col justify-center md:w-[70%]">
      <div className="grid w-full grid-cols-[auto_1fr_auto] items-center">
        {/* 실제 배지: 왼쪽 */}
        <div className="-translate-y-2 md:-translate-y-3">
          <FactBadge
            percent={totalScore}
            width={70}
            className="block md:hidden"
            textSize="xs"
            type={percentToValidity(totalScore)}
          />
          <FactBadge
            percent={totalScore}
            width={140}
            textSize="lg"
            className="hidden md:block"
            type={percentToValidity(totalScore)}
          />
        </div>

        {/* 가운데 제목: 항상 중앙 정렬 */}
        <div className="flex items-baseline gap-2 justify-self-center">
          <span className="text-2xl font-extrabold text-black md:text-4xl">FACT</span>
          <span className="text-primary-normal text-2xl font-extrabold md:text-4xl">REPORT</span>
        </div>

        {/* 더미배지: 제목을 정확히 가운데로 고정하기 위함*/}
        <div
          className="pointer-events-none -translate-y-2 opacity-0 md:-translate-y-3"
          aria-hidden="true"
        >
          <FactBadge type="true1" percent={90} width={70} className="block md:hidden" />
          <FactBadge type="true1" percent={90} width={140} className="hidden md:block" />
        </div>
      </div>
      <hr className="mt-10 w-full border-b-2 text-gray-400" />
    </div>
  );
};

export default ReportTitle;
