'use client';

import Search from '@/components/ui/search';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import LogoStar from '@/components/ui/logo/LogoStar';

interface SearchSectionProps {
  placeHolder: string;
}

const SearchSection = ({ placeHolder }: SearchSectionProps) => {
  const [search, setSearch] = useState('');
  const router = useRouter();

  const handleSearch = () => {
    if (!search) return;
    const url = encodeURIComponent(search);
    router.push(`/report/${url}`);
  };

  return (
    <div className="border-primary-light flex h-46 w-[80%] flex-col items-center justify-center rounded-2xl border-2 py-0 md:flex-row md:gap-18">
      <p className="text-black-normal text-center text-lg font-bold md:mb-8 md:text-3xl md:leading-9">
        <LogoStar className="-mb-2 h-4 w-4 md:h-10 md:w-10" />
        <span className="text-primary-normal mr-1">FACT</span>
        <span>CHECK</span>
        <span className="block">신뢰도 검사</span>
      </p>
      <div className="w-[80%] md:w-150">
        <Search
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeHolder={placeHolder}
          onClick={handleSearch}
        />
        <span className="mt-4 ml-6 flex gap-2 text-[10px] underline md:gap-6 md:text-base">
          최근에 검색한 자료:
          <a>타이틀</a>
          <a>타이틀</a>
          <a>타이틀</a>
        </span>
      </div>
    </div>
  );
};

export default SearchSection;
