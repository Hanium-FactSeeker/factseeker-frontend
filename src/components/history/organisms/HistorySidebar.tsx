import HistoryStatsPanel from '../molecules/HistoryStatsPanel';
import type { HistoryStats } from '@/types/history';

interface HistorySidebarProps {
  stats: HistoryStats;
  className?: string;
}

const HistorySidebar = ({ stats, className = '' }: HistorySidebarProps) => {
  return (
    <div className={`w-full md:w-80 ${className}`}>
      <HistoryStatsPanel stats={stats} />
    </div>
  );
};

export default HistorySidebar;
