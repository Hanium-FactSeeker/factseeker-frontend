'use client';

import { createPortal } from 'react-dom';
import { useEffect, useState } from 'react';
import { Spinner } from 'basic-loading';

type SearchLoadingProps = {
  onCancel?: () => void;
};

export default function SearchLoading({ onCancel }: SearchLoadingProps) {
  const [isMounted, setIsMounted] = useState(false);
  useEffect(() => setIsMounted(true), []);
  if (!isMounted) return null;

  const option = { size: 40, bgColor: '#802bff', barColor: '#ccaaff' };

  return createPortal(
    <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/50">
      <div className="w-[70%] rounded-2xl bg-white p-8 text-center shadow-xl md:w-84">
        <p className="text-black-normal mb-6 text-sm font-semibold md:text-base">
          기사를 분석 중입니다
        </p>

        <div className="flex flex-col items-center gap-5" role="status" aria-live="polite">
          <Spinner option={option} />
        </div>

        <button
          className="mx-auto mt-4 block text-xs text-gray-500 hover:text-gray-700"
          onClick={onCancel}
        >
          취소
        </button>
      </div>
    </div>,
    document.body,
  );
}
