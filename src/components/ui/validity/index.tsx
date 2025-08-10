import React from 'react';
import Icon from '@/components/ui/logo/Icon';
import { ReliabilityStatProps } from '../../../types/logo';

export default function ReliabilityStat({ name, value }: ReliabilityStatProps) {
  return (
    <div className="flex items-center gap-2">
      <Icon name={name} className="text-primary-normal h-3 w-3 md:h-6 md:w-6" />
      <p className="text-xs font-medium md:text-base">
        {name} 기준 신뢰도
        <span className="ont-medium ml-1 text-xs font-semibold md:ml-2 md:text-base">
          {value}%
        </span>
      </p>
    </div>
  );
}
