import { SectionTitleProps } from '@/types/title';
import Link from 'next/link';

const SectionTitle = ({ title, className, link }: SectionTitleProps) => {
  return (
    <Link href={link ?? '/'}>
      <div className={`z-50 flex flex-col py-2 md:w-full ${className}`}>
        <hr className="border-gray-normal w-full border-b-1" />
        <span className="text-black-normal p-3 text-lg font-bold">{title}</span>
        <hr className="border-gray-normal w-full border-b-1" />
      </div>
    </Link>
  );
};
export default SectionTitle;
