'use client';

import TagText from '../atom/TagText';

interface EvidenceToggleProps {
  isOpen: boolean;
  setIsOpen: () => void;
  data: {
    title: string;
    detail: string;
    fullText: string;
    relationCategory: string;
    link: string;
  };
}

const EvidenceToggle = ({ isOpen, setIsOpen, data }: EvidenceToggleProps) => {
  return (
    <>
      <span className="flex flex-col justify-center gap-2 md:gap-4">
        <p className="flex flex-wrap items-center gap-2 text-sm font-medium md:gap-4 md:text-base">
          <TagText>근거 자료</TagText>
          {data.title}
          <a
            className="text-gray-strong text-xs underline md:text-sm"
            href={data.link}
            target="_blank"
          >
            원문 바로가기 &gt;
          </a>
        </p>
      </span>
      <span>
        <div className="border-primary-light h-auto w-full rounded-2xl border-3 bg-white p-3 md:p-4">
          <p className="text-primary-normal mb-2 text-sm font-semibold md:text-base">
            관련성: <span>{data.relationCategory}</span>
          </p>
          <p className="text-sm font-medium md:text-base">
            <span className="pr-2 font-semibold">간단한 설명:</span>
            <span className="leading-4">
              {data.detail}
              <button
                className="text-primary-normal pt-1 pl-1 md:pl-2 md:text-sm"
                onClick={setIsOpen}
              >
                {isOpen ? '닫기 >' : '자세히 >'}
              </button>
            </span>
          </p>
          {isOpen && (
            <div className="mt-4 flex w-full items-stretch md:ml-2">
              <div className="border-primary-light mr-4 hidden w-0 border-l-2 md:block"></div>
              <p className="text-black-normal flex-1 text-xs leading-5 font-medium md:text-sm md:leading-7">
                {data.fullText}
              </p>
            </div>
          )}
        </div>
      </span>
    </>
  );
};
export default EvidenceToggle;
