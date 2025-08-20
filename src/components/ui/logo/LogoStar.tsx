import * as React from 'react';
import FrontStar from '@/assets/logostar.svg';

interface LogoProps {
  className?: string;
}

const LogoStar = ({ className = '' }: LogoProps) => {
  return (
    <span className="flex flex-col items-center">
      <FrontStar className={className} />
    </span>
  );
};

export default LogoStar;
