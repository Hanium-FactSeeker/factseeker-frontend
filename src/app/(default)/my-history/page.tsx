'use client';

import { useState } from 'react';
import HistoryHeader from '@/components/history/organisms/HistoryHeader';
import HistoryContent from '@/components/history/organisms/HistoryContent';
import HistorySidebar from '@/components/history/organisms/HistorySidebar';
import type { HistoryTabType } from '@/types/history';
import {
  articleHistoryData,
  snsHistoryData,
  politicianHistoryData,
  historyStatsData,
} from '@/constants/historyData';

const History = () => {
  const [activeTab, setActiveTab] = useState<HistoryTabType>('articles');
  const [currentPage, setCurrentPage] = useState(1);
  const totalPages = 5;

  const handleTabChange = (tab: HistoryTabType) => {
    setActiveTab(tab);
    setCurrentPage(1); // 탭 변경 시 첫 페이지로 이동
  };

  const handlePreviousPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  const handleNextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  };

  return (
    <div className="mx-auto max-w-7xl px-4 py-6">
      <div className="flex flex-col gap-6 lg:flex-row">
        {/* 메인 콘텐츠 영역 */}
        <div className="flex-1">
          <HistoryHeader
            activeTab={activeTab}
            currentPage={currentPage}
            totalPages={totalPages}
            onTabChange={handleTabChange}
            onPreviousPage={handlePreviousPage}
            onNextPage={handleNextPage}
          />

          <HistoryContent
            activeTab={activeTab}
            articles={articleHistoryData}
            snsItems={snsHistoryData}
            politicians={politicianHistoryData}
          />
        </div>

        {/* 사이드바 - 모바일에서는 하단에 배치 */}
        <div className="order-first lg:order-last lg:w-80">
          <HistorySidebar stats={historyStatsData} />
        </div>
      </div>
    </div>
  );
};

export default History;
