import React from 'react';
import clsx from 'clsx';
import { Button } from './index';

type Option = { label: string; value: string };
type Props = {
  value: string;
  onChange: (val: string) => void;
  options: Option[];
  className?: string;
};

/**
 * SwitchButton 컴포넌트
 * 여러 개의 옵션 버튼 중에서 하나를 고를 수 있고, 지금 선택된 값이 뭔지 보여주는 switch button 입니다.
 * 버튼 스타일은 선택 여부에 따라 스타일이 변경됩니다.
 *
 * @component
 * @param {string} value - 현재 선택된 옵션의 값
 * @param {(val: string) => void} onChange - 옵션이 변경될 때 호출되는 콜백 함수
 * @param {Option[]} options - 버튼으로 표시할 옵션 배열 (label, value 포함)
 * @param {string} [className] - 컴포넌트 외부 컨테이너에 추가할 선택적 클래스 이름
 *
 * @example
 * <SwitchButton
 *   value="latest"
 *   onChange={(val) => console.log(val)}
 *   options={[
 *     { label: '최신순', value: 'latest' },
 *     { label: '인기순', value: 'popular' }
 *   ]}
 * />
 */
const SwitchButton = ({ value, onChange, options, className }: Props) => {
  return (
    <div
      role="tablist"
      aria-label="정렬 선택"
      className={clsx('inline-flex items-center gap-1 rounded-xl bg-gray-100 p-1', className)}
    >
      {options.map((opt) => {
        const active = value === opt.value;
        return (
          <Button
            key={opt.value}
            variant="outline"
            color="gray"
            size="xs"
            aria-pressed={active}
            role="tab"
            onClick={() => onChange(opt.value)}
            className={clsx(
              'rounded-lg border-0 font-medium shadow-none md:px-4 md:py-2',
              active
                ? 'bg-white text-black'
                : 'text-gray-strong bg-transparent hover:bg-white/60 active:bg-white/80',
            )}
          >
            {opt.label}
          </Button>
        );
      })}
    </div>
  );
};

export default SwitchButton;
