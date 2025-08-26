import Image from 'next/image';
import defaultImg from '@/assets/politician.png';

interface PoliticianImageProps {
  src: string;
  alt: string;
  className?: string;
}

export default function PoliticianImage({
  src,
  alt,
  className,
}: PoliticianImageProps) {
  return (
    <div className={`relative ${className}`}>
      <Image
        src={src || defaultImg}
        alt={alt}
        fill
        sizes="(max-width: 768px) 56px, 80px"
        className="rounded-full object-cover"
      />
    </div>
  );
}
