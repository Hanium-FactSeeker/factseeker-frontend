'use client';

import { useEffect, useMemo, useState } from 'react';
import ButtonGroup from '../molecules/ButtonGroup';
import ClaimTabs from '../molecules/ClaimTabs';
import EvidenceList from '../molecules/EvidenceList';
import { EvidenceItem } from '@/types/report';

type ContentEvidenceProps = {
  claims: EvidenceItem[];
  totalScore: number;
};

/**
 * url 분석 결과의 주장(Claims)을 보여줍니다
 * - 상단 탭(ClaimTabs)에서 idx 별 주장을 관리합니다
 * - 총 신뢰도 점수와 idx 별 주장의 내용을 EvidenceList에 전달합니다
 */
const ContentEvidence = ({ claims, totalScore }: ContentEvidenceProps) => {
  const [activeIdx, setActiveIdx] = useState(0);

  useEffect(() => {
    if (activeIdx >= claims.length) setActiveIdx(0);
  }, [claims.length, activeIdx]);

  const current = useMemo(() => claims[activeIdx], [claims, activeIdx]);

  if (!claims?.length) {
    return (
      <div className="mt-12 flex w-full flex-col items-center">
        <div className="text-sm text-gray-500 md:text-base">
          해당 영상에 대해 분석된 주장이 없습니다
        </div>
      </div>
    );
  }

  return (
    <div className="relative mt-12 flex w-full flex-col items-center">
      <ClaimTabs
        count={claims.length}
        activeIdx={activeIdx}
        onChange={setActiveIdx}
      />
      <div className="pointer-events-auto relative z-0 flex w-full flex-col items-center justify-center">
        <EvidenceList
          claim={current}
          activeIdx={activeIdx}
          totalScore={totalScore}
        />
        <ButtonGroup />
      </div>
    </div>
  );
};

export default ContentEvidence;
