'use client';

import React, { useState } from 'react';
import NoteBackground from './NoteBackground';
import TagText from '../atom/TagText';
import { IoInformationCircleOutline } from 'react-icons/io5';
import EvidenceToggle from '@/components/report/molecules/EvidenceToggle';
import type { EvidenceItem } from '@/types/report';

type Props = {
  activeIdx: number;
  claim: EvidenceItem; // 선택된 주장
  totalScore: number;
};

/**
 * 선택된 주장과 그 주장에 매핑된 근거 목록을 보여줍니다
 * - 상단에 전체 신뢰도(%)를 표시합니다
 * - 주장과 함께 근거 리스트(EvidenceToggle)를 보여줍니다
 */
const EvidenceList = ({ activeIdx, claim, totalScore }: Props) => {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  /**
   * 특정 근거 아이템을 열고/닫습니다
   * 동일한 인덱스를 다시 클릭하면 토글을 닫습니다
   */
  const toggleOpen = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  // 서버 스키마 변동 우려로 다음과 같이 설정했습니다
  const items = (claim?.evidence ?? []).map((e: any) => ({
    title: e.title ?? e.source_title ?? '출처',
    detail: e.justification ?? e.summary ?? '설명 없음',
    fullText: e.snippet ?? e.full_text ?? e.justification ?? '',
    relationCategory: e.relevance ?? e.relation ?? '-',
    link: e.url ?? e.link ?? '#',
  }));

  return (
    <div className="border-gray-normal flex min-h-30 w-[90%] flex-col items-start rounded-md border bg-white px-2 py-4 md:w-[70%] md:p-8">
      <div>
        <h1 className="text-primary-normal flex items-start gap-1 text-sm font-bold md:gap-2 md:text-xl">
          <IoInformationCircleOutline size="24" color="#802BFF" />
          <span className="md:-mt-1">
            이 영상의 신뢰성은 다음의 근거를 바탕으로 {totalScore}%로
            측정됩니다.
          </span>
        </h1>
        <p className="text-black-alternative md:text-md mt-2 text-xs font-medium">
          &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;보내주신 자료에 나타난 주장 별 근거를
          정리했습니다.
        </p>
      </div>

      <NoteBackground gap={76}>
        <div className="flex flex-col gap-8">
          <span className="flex items-start gap-2 md:gap-6">
            <TagText bold>주장 {activeIdx + 1}</TagText>
            <p className="text-sm leading-6 font-semibold md:mt-1 md:text-lg">
              {claim?.claim ?? '주장을 불러올 수 없습니다'}
            </p>
          </span>

          {items.length === 0 ? (
            <div className="text-sm text-gray-500"></div>
          ) : (
            items.map((item, idx) => (
              <EvidenceToggle
                key={idx}
                isOpen={openIndex === idx}
                setIsOpen={() => toggleOpen(idx)}
                data={item}
              />
            ))
          )}
        </div>
      </NoteBackground>
    </div>
  );
};

export default EvidenceList;
