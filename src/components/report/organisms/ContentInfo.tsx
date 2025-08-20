const ContentInfo = () => {
  return (
    <div className="border-gray-normal flex h-auto w-[90%] flex-col items-center rounded-md border bg-white p-8 md:w-[70%] md:flex-row">
      <div className="flex w-full flex-col items-center gap-4 md:w-3/7">
        <img
          className="h-20 w-36 rounded-xl md:h-40 md:w-72"
          src="https://placehold.co/300x167"
        />
        <p className="border-primary-normal w-full rounded-xl border-1 py-2 text-center text-xs font-semibold md:w-[80%] md:border-2 md:text-sm">
          해당 자료는 <span className="text-primary-normal">선동형&nbsp;</span>
          자료입니다.
        </p>
        <p className="mb-4 w-[80%] text-[11px] font-medium text-black md:mb-0 md:text-xs">
          근거 : 감정적 언사와 정치적 음모론, 과장된 주장 및 혐오 발언이
          반복적으로 나타남
        </p>
      </div>
      <div className="mx-8 hidden h-64 w-1 border-l-1 border-gray-400 md:block"></div>
      <div className="mb-6 block h-1 w-full border-b-1 border-gray-200 md:hidden"></div>

      <div className="flex flex-1 flex-col items-center gap-4">
        <h1 className="w-full text-center text-sm font-bold text-black md:w-96 md:text-lg">
          '핵보유국' 인도·파키스탄 미사일 폭격...확전 가능성 고조 [지금이뉴스] /
          YTN
        </h1>
        <h2 className="mt-2 text-sm font-bold md:text-base">
          &lt;전체 요약&gt;
        </h2>
        <p className="w-full text-center text-xs leading-6 md:w-[80%] md:text-base md:leading-9">
          인도가 테러에 대한 보복으로 파키스탄과 카슈미르 9곳에 미사일 공격을
          단행했습니다. 파키스탄은 민간인 피해와 인도 전투기 격추를 주장하며
          보복 공격에 나섰습니다. 양국 간 긴장이 고조되며 핵 공격 가능성까지
          언급되고 있습니다.
        </p>
      </div>
    </div>
  );
};

export default ContentInfo;
