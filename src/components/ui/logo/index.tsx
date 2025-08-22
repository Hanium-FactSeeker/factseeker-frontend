import Link from 'next/link';
import LogoStar from '@/components/ui/logo/LogoStar';
import type { LogoProps } from '../../../types/logo';

const Logo = ({ type }: LogoProps) => {
  const textColor = type === 'main' ? 'text-white' : 'text-primary-normal';
  return (
    <Link href="/">
      <div className="flex flex-col items-center">
        <LogoStar className="mr-2 -mb-2 h-6 w-full md:mr-3 md:-mb-2 md:h-10 md:w-10" />
        <h1
          className={`text-center text-xl font-bold md:text-3xl ${textColor}`}
        >
          Fact Seeker
        </h1>
      </div>
    </Link>
  );
};

export default Logo;
