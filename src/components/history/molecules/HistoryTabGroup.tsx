import SwitchButton from '@/components/ui/button/SwitchButton';
import type { HistoryTabType } from '@/types/history';

interface HistoryTabGroupProps {
  activeTab: HistoryTabType;
  onTabChange: (tab: HistoryTabType) => void;
  className?: string;
}

const HistoryTabGroup = ({ activeTab, onTabChange, className = '' }: HistoryTabGroupProps) => {
  const options = [
    { label: '내가 검색한 URL', value: 'articles' },
    { label: '내가 본 SNS', value: 'sns' },
    { label: '내가 본 정치인', value: 'politicians' },
  ];

  return (
    <SwitchButton
      value={activeTab}
      onChange={(value) => onTabChange(value as HistoryTabType)}
      options={options}
      className={className}
    />
  );
};

export default HistoryTabGroup;
