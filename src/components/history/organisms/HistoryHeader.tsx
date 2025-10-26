import HistoryTabGroup from '../molecules/HistoryTabGroup';
import Pagination from '../atoms/Pagination';
import type { HistoryTabType } from '@/types/history';

interface HistoryHeaderProps {
  activeTab: HistoryTabType;
  currentPage: number;
  totalPages: number;
  onTabChange: (tab: HistoryTabType) => void;
  onPreviousPage: () => void;
  onNextPage: () => void;
  className?: string;
}

const HistoryHeader = ({
  activeTab,
  currentPage,
  totalPages,
  onTabChange,
  onPreviousPage,
  onNextPage,
  className = '',
}: HistoryHeaderProps) => {
  return (
    <div className={`mb-6 flex items-center justify-between ${className}`}>
      <HistoryTabGroup activeTab={activeTab} onTabChange={onTabChange} />
      <Pagination
        currentPage={currentPage}
        totalPages={totalPages}
        onPrevious={onPreviousPage}
        onNext={onNextPage}
      />
    </div>
  );
};

export default HistoryHeader;
