'use client';

import Link from 'next/link';
import Image from 'next/image';
import type { VideoItem } from '@/constants/videoList';
import clsx from 'clsx';

interface Props { video: VideoItem }

export default function VideoRow({ video }: Props) {
  return (
    <Link
      href={video.link}
      target="_blank"
      rel="noreferrer"
      className="group flex w-full items-center justify-between border-b border-gray-200 py-4 hover:bg-gray-50"
    >
      <div className="flex min-w-0 items-center gap-4">
        <div className="relative h-16 w-28 overflow-hidden rounded-lg">
          <Image src={video.thumbnail} alt={video.title} fill className="object-cover" />
        </div>

        <div className="min-w-0">
          <p className="truncate text-black-normal text-sm md:text-base">{video.title}</p>
          <p className="mt-1 text-xs text-gray-500">{video.channelName}</p>
        </div>
      </div>

      <div className="flex items-center gap-3">
        <span
          className={clsx(
            'inline-flex h-7 items-center rounded-full px-3 text-xs text-white',
            video.gradeColor,
          )}
        >
          {video.grade.toUpperCase()}
        </span>
        <span className="w-14 text-right text-sm font-bold text-black-normal">
          {video.gradePercent}
        </span>
      </div>
    </Link>
  );
}
