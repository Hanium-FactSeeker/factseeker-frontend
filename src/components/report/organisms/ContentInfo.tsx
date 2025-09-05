import type { ReportInfo } from '@/types/report';

type ContentInfoProps = {
  info: ReportInfo;
};

const ContentInfo = ({ info }: ContentInfoProps) => {
  return (
    <div className="border-gray-normal flex h-auto w-[90%] flex-col items-center rounded-md border bg-white p-8 md:w-[70%] md:flex-row">
      <div className="flex w-full flex-col items-center gap-4 md:w-3/7">
        <img className="h-20 w-36 rounded-xl md:h-40 md:w-72" src={info.thumbnailUrl} />
        <p className="border-primary-normal w-full rounded-xl border-1 py-2 text-center text-xs font-semibold md:w-[80%] md:border-2 md:text-sm">
          해당 자료는
          <span className="text-primary-normal">&nbsp;{info.channelType}&nbsp;</span>
          자료입니다.
        </p>
        <p className="mb-4 w-[80%] text-[11px] font-medium text-black md:mb-0 md:text-xs">
          {info.channelTypeReason}
        </p>
      </div>
      <div className="mx-8 hidden h-64 w-1 border-l-1 border-gray-400 md:block"></div>
      <div className="mb-6 block h-1 w-full border-b-1 border-gray-200 md:hidden"></div>

      <div className="flex flex-1 flex-col items-center gap-4">
        <h1 className="w-full text-center text-sm font-bold text-black md:w-96 md:text-lg">
          {info.videoTitle}
        </h1>
        <h2 className="mt-2 text-sm font-bold md:text-base">&lt;전체 요약&gt;</h2>
        <p className="w-full text-center text-xs leading-6 md:w-[80%] md:text-base md:leading-9">
          {info.threeLineSummary}
        </p>
      </div>
    </div>
  );
};

export default ContentInfo;
