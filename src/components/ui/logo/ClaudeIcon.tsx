import * as React from 'react';
import Claude from '@/assets/claude.svg';
interface LogoProps {
  className?: string;
}

const ClaudeIcon = ({ className = '' }: LogoProps) => {
  return (
    <div className="flex flex-col items-center">
      <Claude className={className} />
    </div>
  );
};

export default ClaudeIcon;
