import * as React from 'react';
import FrontStar from '@/assets/logostar.svg';

interface LogoProps {
  width?: number | string;
  height?: number | string;
  className?: string;
}

const Logo = ({ className = '' }: LogoProps) => {
  return (
    <div className="flex flex-col items-center">
      <FrontStar className={`${className}`} />
    </div>
  );
};

export default Logo;
