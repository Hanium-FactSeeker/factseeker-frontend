'use client';

import { Button } from '@/components/ui/button';
import { createPortal } from 'react-dom';
import { HiOutlineExclamationTriangle } from 'react-icons/hi2';

export default function SearchError({
  error,
  reset,
}: {
  error: Error;
  reset: () => void;
}) {
  if (typeof document === 'undefined') return null;

  const msg = '기사 분석에 실패했습니다\nURL주소가 올바른지 확인해 주세요';

  return createPortal(
    <div className="bg-black-normal/99 fixed inset-0 z-[100] flex items-center justify-center">
      <div
        className="w-[70%] rounded-2xl bg-white p-8 text-center shadow-xl md:w-84"
        role="alertdialog"
      >
        <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center text-black">
          <HiOutlineExclamationTriangle size={48} />
        </div>
        <p className="text-black-normal mb-6 text-sm whitespace-pre-line md:text-base">
          {msg}
        </p>
        <Button
          type="button"
          variant="filled"
          color="black"
          size="lg"
          onClick={() => reset()}
        >
          다시 시도하기
        </Button>
      </div>
    </div>,
    document.body,
  );
}
