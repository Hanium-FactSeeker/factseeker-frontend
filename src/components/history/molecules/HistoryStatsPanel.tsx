import type { HistoryStats } from '@/types/history';

interface HistoryStatsPanelProps {
  stats: HistoryStats;
  className?: string;
}

const HistoryStatsPanel = ({ stats, className = '' }: HistoryStatsPanelProps) => {
  const maxValue = Math.max(...stats.chartData.map((item) => item.value));

  return (
    <div className={`border-gray-normal rounded-lg border bg-white p-6 ${className}`}>
      <h3 className="text-black-normal mb-2 text-lg font-bold">{stats.title}</h3>
      <p className="text-black-normal mb-4 text-sm">{stats.description}</p>

      <div className="flex h-24 items-end justify-center gap-2">
        {stats.chartData.map((item, index) => {
          const heightPercentage = (item.value / maxValue) * 100;

          return (
            <div key={index} className="flex flex-1 flex-col items-center">
              <div
                className="w-full rounded-t transition-all duration-300 hover:opacity-80"
                style={{
                  height: `${heightPercentage}%`,
                  backgroundColor:
                    item.color === 'var(--primary-light)'
                      ? '#ccaaff'
                      : item.color === 'var(--primary-normal)'
                        ? '#802bff'
                        : item.color === 'var(--gray-strong)'
                          ? '#828285'
                          : item.color,
                  minHeight: '8px',
                }}
              />
              <span className="text-gray-strong mt-2 text-xs">{item.label}</span>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default HistoryStatsPanel;
