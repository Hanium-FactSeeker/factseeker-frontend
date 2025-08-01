import React from 'react';
import { Button } from './index';
import { ButtonProps } from './types';

type ToggleButtonProps = Omit<ButtonProps, 'variant' | 'iconRight'> & {
  label: string;
};

export const ToggleButton = React.forwardRef<
  HTMLButtonElement,
  ToggleButtonProps
>(({ label, ...props }, ref) => (
  <Button
    ref={ref}
    variant="outline"
    color="purple"
    iconRight={
      <span className="text-primary-normal ml-1 text-base font-bold">▼</span>
    }
    {...props}
  >
    {label}
  </Button>
));
