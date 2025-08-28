'use client';

import Image from 'next/image';
import defaultImg from '@/assets/politician.png';

interface PoliticianImageProps {
  src?: string | null;
  alt: string;
  className?: string;
  fallbackSize?: 'sm' | 'md' | 'lg';
}

const sizeMap = {
  sm: 'h-10 w-10',
  md: 'h-14 w-14',
  lg: 'h-20 w-20',
};

export default function PoliticianImage({
  src,
  alt,
  className,
  fallbackSize = 'md',
}: PoliticianImageProps) {
  const finalSrc =
    src && src !== 'null' && src.trim() !== '' ? src : (defaultImg as any);

  const wrapperClass = `relative overflow-hidden rounded-full ${className ?? sizeMap[fallbackSize]}`;

  return (
    <div className={wrapperClass}>
      <Image
        src={finalSrc}
        alt={alt}
        fill
        sizes="(max-width: 768px) 56px, 80px"
        className="object-cover"
      />
    </div>
  );
}
