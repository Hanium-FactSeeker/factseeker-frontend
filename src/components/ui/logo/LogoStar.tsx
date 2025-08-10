import * as React from 'react';
import FrontStar from '@/assets/logostar.svg';

interface LogoProps {
  className?: string;
}

const LogoStar = ({ className = '' }: LogoProps) => {
  return (
    <div className="flex flex-col items-center">
      <FrontStar className={className} />
    </div>
  );
};

export default LogoStar;
