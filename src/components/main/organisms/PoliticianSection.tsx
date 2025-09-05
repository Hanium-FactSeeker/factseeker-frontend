'use client';

import SectionTitle from '@/components/ui/title/SectionTitle';
import type { Politician } from '@/components/main/molecules/PoliticianItem';
import PoliticianCard from '@/components/main/molecules/PoliticianItem';
import VerticalSlider from '@/components/ui/slider/VerticalSlider';
import { SLIDE_SIZE } from '@/constants/main';
import { Grouping } from '@/utils/grouping';
import { useEffect, useRef, useState } from 'react';
import { getTopPoliticians } from '@/apis/mainTemp/getTopPolitician';

/**
 * 메인페이지 내 인물 분석 컴포넌트
 *
 * POLITICIANS에서 MAX_ITEMS만큼 잘라 반응형 슬라이더로 보여줍니다.
 * - 모바일: 1열, rowHeight=160, SLIDE_SIZE.mobile로 그룹핑
 * - 데스크톱: 3열, rowHeight=224, SLIDE_SIZE.desktop로 그룹핑
 *
 */
const PoliticianSection = () => {
  const [items, setItems] = useState<Politician[]>([]);
  const fetchedRef = useRef(false);

  useEffect(() => {
    if (fetchedRef.current) return;
    fetchedRef.current = true;

    (async () => {
      try {
        const top = await getTopPoliticians();
        const mapped: Politician[] = top.map((p) => ({
          name: p.name,
          party: p.party,
          img: p.imageUrl ?? '',
          stats: {
            gpt: p.gptScore ?? 0,
            gemini: p.geminiScore ?? 0,
            overall: p.overallScore ?? 0,
          },
        }));
        setItems(mapped);
      } catch (e) {
        console.error('[PoliticianSection] fetch error:', e);
        setItems([]);
      }
    })();
  }, []);

  const slidesMobile = Grouping(items, SLIDE_SIZE.mobile);
  const slidesDesktop = Grouping(items, SLIDE_SIZE.desktop);

  return (
    <div className="flex w-[90%] flex-col items-center md:w-[1000px]">
      <div className="mb-3 w-full">
        <SectionTitle title="인물 분석 바로가기 &gt;" link="/politician" />
      </div>

      {/* 모바일: 1열 */}
      <VerticalSlider
        slides={slidesMobile}
        cols={1}
        className="pt-2 md:hidden"
        intervalMs={3000}
        rowHeight={160}
        renderItem={(p: Politician) => <PoliticianCard p={p} />}
      />

      {/* 데스크톱: 3열 */}
      <VerticalSlider
        slides={slidesDesktop}
        cols={3}
        className="hidden md:block"
        intervalMs={3000}
        rowHeight={224}
        renderItem={(p: Politician) => <PoliticianCard p={p} />}
      />
    </div>
  );
};

export default PoliticianSection;
