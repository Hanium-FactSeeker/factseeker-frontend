'use client';

import Search from '@/components/ui/search';
import { useEffect, useRef, useState } from 'react';
import { useRouter } from 'next/navigation';
import LogoStar from '@/components/ui/logo/LogoStar';
import { getRecentReport, RecentAnalysis } from '@/apis/report/getRecentReport';

interface SearchSectionProps {
  placeHolder: string;
}

const SearchSection = ({ placeHolder }: SearchSectionProps) => {
  const [search, setSearch] = useState('');
  const [recents, setRecents] = useState<RecentAnalysis[]>([]);
  const [loading, setLoading] = useState(true);
  const router = useRouter();
  const fetchedRef = useRef(false);

  const handleSearch = () => {
    if (!search) return;
    router.push(`/report/${encodeURIComponent(search)}`);
  };

  const handleGoReport = (url: string) => {
    router.push(`/report/${encodeURIComponent(url)}`);
  };

  useEffect(() => {
    if (fetchedRef.current) {
      return;
    }
    fetchedRef.current = true;

    (async () => {
      try {
        const recentReports = await getRecentReport();
        setRecents(recentReports);
      } catch (err) {
        console.error('[SearchSection] recent error:', err);
      } finally {
        setLoading(false);
      }
    })();
  }, []);

  return (
    <div className="border-primary-light flex h-52 w-[80%] flex-col items-center justify-center rounded-2xl border-2 py-0 md:flex-row md:gap-18">
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

        <span className="mt-2 ml-2 flex gap-2 text-[10px] md:gap-6 md:text-base">
          <span className="text-nowrap">최근에 검색한 자료: </span>
          <div className="flex flex-col">
            {loading ? (
              <span className="opacity-60">불러오는 중…</span>
            ) : recents.length === 0 ? (
              <span className="opacity-60">없음</span>
            ) : (
              recents.map((r) => (
                <button
                  key={r.videoAnalysisId}
                  className="text-gray-strong hover:text-primary-normal max-w-36 truncate pb-1 text-left underline md:max-w-100"
                  onClick={() => handleGoReport(r.videoUrl)}
                  title={r.videoTitle}
                >
                  {r.videoTitle}
                </button>
              ))
            )}
          </div>
        </span>
      </div>
    </div>
  );
};

export default SearchSection;
