'use client';

import SwitchButton from '@/components/ui/button/SwitchButton';
import { useState } from 'react';

const FilterBar = () => {
  const [order, setOrder] = useState<'latest' | 'reliable'>('latest');

  return (
    <div className="flex h-12 w-[90%] items-center justify-between rounded-sm bg-gray-100 px-4 md:rounded-md md:px-10">
      <div className="font-mediu text-black-normal flex gap-2 text-[10px] md:text-xs">
        <span>2025.06.06 13:00</span>
        <span>기준 업데이트</span>
      </div>
      <SwitchButton
        value={order}
        onChange={(v) => setOrder(v as 'latest' | 'reliable')}
        options={[
          { label: '최신순', value: 'latest' },
          { label: '신뢰성 높은 순', value: 'reliable' },
        ]}
      />
    </div>
  );
};

export default FilterBar;
