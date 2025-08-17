'use client';
import React, { useState } from 'react';
import NoteBackground from './NoteBackground';
import TagText from '../atom/TagText';
import { IoInformationCircleOutline } from 'react-icons/io5';
import { evidenceList } from '@/constants/evidenceList';
import EvidenceToggle from '@/components/report/molecules/EvidenceToggle';
export const EvidenceList = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(null);
  const toggleOpen = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };
  return (
    <div className="border-gray-normal flex min-h-screen w-[90%] flex-col items-start rounded-md border bg-white px-2 py-4 md:w-[70%] md:p-8">
      <div>
        <h1 className="text-primary-normal flex items-center gap-1 text-sm font-bold md:gap-2 md:text-xl">
          <IoInformationCircleOutline size="24" color="#802BFF" />
          <span>신뢰성은 다음의 근거를 바탕으로 93%로 측정됩니다.</span>
        </h1>
        <p className="text-black-alternative md:text-md mt-2 text-xs font-medium">
          &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;보내주신 자료에 나타난 주장 별
          근거를 정리했습니다.
        </p>
      </div>
      <NoteBackground gap={72}>
        <div className="flex flex-col gap-8">
          <span className="flex items-start gap-2 md:gap-6">
            <TagText bold>주장1</TagText>
            <p className="text-sm font-semibold md:text-lg">
              나경원 의원은 의견 수렴 없이 내놓은 혁신안이 민주성에 역행한다고
              말했다.
            </p>
          </span>
          {evidenceList.map((item, idx) => (
            <EvidenceToggle
              key={idx}
              isOpen={openIndex === idx}
              setIsOpen={() => toggleOpen(idx)}
              data={item}
            />
          ))}
        </div>
      </NoteBackground>
    </div>
  );
};
