'use client';

import { useEffect, useRef, useState } from 'react';
import SearchInput from '@/components/ui/button/SearchInput';
import { FaSearch } from 'react-icons/fa';

interface UrlModalProps {
  open: boolean;
  initialValue?: string;
  onClose: () => void;
  onSubmit: (value: string) => void;
}

export default function UrlModal({
  open,
  initialValue = '',
  onClose,
  onSubmit,
}: UrlModalProps) {
  const [value, setValue] = useState(initialValue);
  const backdropRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (open) {
      setValue(initialValue);
      setTimeout(() => inputRef.current?.focus(), 0);
    }
  }, [open, initialValue]);

  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
      if (e.key === 'Enter') handleSubmit();
    };
    window.addEventListener('keydown', handleKey);
    return () => window.removeEventListener('keydown', handleKey);
  }, [value]);

  const handleBackdropClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (e.target === backdropRef.current) onClose();
  };

  const handleSubmit = () => {
    if (value.trim()) onSubmit(value.trim());
  };

  if (!open) return null;

  return (
    <div
      ref={backdropRef}
      onMouseDown={handleBackdropClick}
      className="fixed inset-0 z-[100] flex items-start justify-center bg-black/40 p-4"
    >
      <div className="border-gray-normal relative mt-[10vh] w-full max-w-[968px] rounded-[20px] border bg-white/95 p-6 shadow-[0px_4px_4px_rgba(0,0,0,0.25)]">
        <button
          onClick={onClose}
          className="text-black-normal hover:text-black-alternative absolute top-4 right-4 text-lg"
        >
          ✕
        </button>

        <div className="mb-6 flex flex-col items-center">
          <h2 className="text-2xl font-semibold">
            <span className="text-primary-normal">FACT </span>
            <span className="text-black-normal">CHECK</span>
          </h2>
        </div>

        <div className="mb-5 flex justify-center">
          <SearchInput
            ref={inputRef}
            value={value}
            onChange={(e) => setValue(e.target.value)}
            placeholder="팩트를 확인하고 싶은 기사나 유튜브를 입력해주세요"
            inputSize="lg"
            fullWidth
            iconRight={
              <button
                onClick={handleSubmit}
                className="text-gray-strong cursor-pointer"
              >
                <FaSearch />
              </button>
            }
          />
        </div>

        <div className="text-black-normal flex flex-wrap justify-center gap-6 text-sm underline">
          {/* <span className="cursor-pointer">
            최근에 검색한 영상 : 타이틀 ...
          </span>
          <span className="cursor-pointer">
            최근에 검색한 영상 : 타이틀 ...
          </span>
          <span className="cursor-pointer">
            최근에 검색한 영상 : 타이틀 ...
          </span> */}
        </div>
      </div>
    </div>
  );
}
