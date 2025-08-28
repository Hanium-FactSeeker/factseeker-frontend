import * as React from 'react';
import Gpt from '@/assets/gpt.svg';
interface LogoProps {
  className?: string;
}

const GptIcon = ({ className = '' }: LogoProps) => {
  return (
    <div className="flex flex-col items-center">
      <Gpt className={className} />
    </div>
  );
};

export default GptIcon;
