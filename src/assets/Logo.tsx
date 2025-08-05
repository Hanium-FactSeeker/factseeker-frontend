import * as React from 'react';
import FrontStar from '@/assets/logostar.svg';

interface LogoProps {
  width?: number | string;
  height?: number | string;
  className?: string;
}

const Logo = ({ width = 40, height = 40, className = '' }: LogoProps) => {
  return (
    <div className="flex flex-col items-center">
      <FrontStar  
        width={width}
        height={height}
        className={`${className}`} />
    </div>
  );
};

export default Logo;
