'use client';

import { useEffect, useRef, useState } from 'react';
import { useRouter } from 'next/navigation';
import { FaSearch } from 'react-icons/fa';
import { toast } from 'react-hot-toast';

import ModalBase from '../findmodal/ModalBase';
import SearchInput from '@/components/ui/button/SearchInput';
import { useAuthStore } from '@/store/useAuthStore';

import { useSearchTracking } from '@/hooks/gtm/useSearchTracking';

interface UrlModalProps {
  open: boolean;
  initialValue?: string;
  onClose: () => void;
  onSubmit: (value: string) => void;
}

export default function UrlModal({ open, initialValue = '', onClose, onSubmit }: UrlModalProps) {
  const [value, setValue] = useState(initialValue);
  const inputRef = useRef<HTMLInputElement>(null);

  const router = useRouter();
  const isLoggedIn = useAuthStore((s) => s.isLoggedIn);

  const { trackSearchSubmit } = useSearchTracking();

  // 모달 열릴 때 초기값/포커스
  useEffect(() => {
    if (!open) return;
    setValue(initialValue);
    const t = setTimeout(() => inputRef.current?.focus(), 0);
    return () => clearTimeout(t);
  }, [open, initialValue]);

  const handleSearch = () => {
    const v = value.trim();
    if (!v) return;

    if (!isLoggedIn) {
      toast.error('로그인이 필요한 서비스입니다');
      return;
    }

    const normalized = /^https?:\/\//i.test(v) ? v : `https://${v}`;

    trackSearchSubmit(normalized);
    router.push(`/report?url=${encodeURIComponent(normalized)}`);
    onSubmit?.(v);
    onClose?.();
  };

  if (!open) return null;

  return (
    <ModalBase
      open={open}
      onClose={onClose}
      className="border-gray-normal mt-[10vh] w-full max-w-[968px] rounded-[20px] border bg-white/95 p-6 shadow-[0px_4px_4px_rgba(0,0,0,0.25)]"
    >
      <div className="mb-6 flex flex-col items-center">
        <h2 className="text-2xl font-semibold">
          <span className="text-primary-normal">FACT </span>
          <span className="text-black-normal">CHECK</span>
        </h2>
      </div>

      {/* 입력 */}
      <div className="mb-5 flex justify-center">
        <SearchInput
          ref={inputRef}
          value={value}
          onChange={(e) => setValue(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === 'Enter') handleSearch();
          }}
          placeholder="팩트를 확인하고 싶은 기사나 유튜브를 입력해주세요"
          inputSize="lg"
          fullWidth
          iconRight={
            <button onClick={handleSearch} className="text-gray-strong cursor-pointer">
              <FaSearch />
            </button>
          }
        />
      </div>

      {/* 최근 검색 etc. */}
      <div className="text-black-normal flex flex-wrap justify-center gap-6 text-sm underline">
        {/* 최근 검색 UI 들어갈 자리 */}
      </div>
    </ModalBase>
  );
}
