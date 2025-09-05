'use client';

import Link from 'next/link';
import Image, { type ImageLoader } from 'next/image';
import type { VideoItem } from '@/types/videos';

function cx(...args: Array<string | false | null | undefined>) {
  return args.filter(Boolean).join(' ');
}

const passthroughLoader: ImageLoader = ({ src }) => src;

type Props = {
  video: VideoItem;
  compact?: boolean;
};

export default function VideoCard({ video, compact = false }: Props) {
  const { title, link, thumbnail, thumbnailUrl, channelName, publishedAt } = video as any;
  const thumb = thumbnail || thumbnailUrl || '';

  return (
    <Link
      href={link || '#'}
      target="_blank"
      rel="noopener noreferrer"
      className={cx(
        'flex w-full items-center justify-between border-b border-gray-200',
        compact ? 'gap-3 p-2' : 'gap-4 p-4',
      )}
    >
      <div className="min-w-0">
        <p
          className={cx(
            'text-black-normal truncate',
            compact ? 'text-sm font-medium' : 'text-base font-semibold',
          )}
        >
          {title}
        </p>
        <div
          className={cx(
            'mt-1 flex items-center gap-2 text-gray-500',
            compact ? 'text-[11px]' : 'text-xs',
          )}
        >
          {channelName && <span className="truncate">{channelName}</span>}
          {channelName && <span>·</span>}
          {publishedAt && <span className="truncate">{publishedAt}</span>}
        </div>
      </div>

      <div
        className={cx(
          'relative shrink-0 overflow-hidden rounded-md bg-gray-100',
          compact ? 'h-16 w-28' : 'h-20 w-32',
        )}
      >
        {thumb ? (
          <Image
            loader={passthroughLoader}
            unoptimized
            src={thumb}
            alt=""
            fill
            className="object-cover"
            sizes="128px"
          />
        ) : null}
      </div>
    </Link>
  );
}
