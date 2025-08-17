'use client';

import Link from 'next/link';
import Image from 'next/image';
import type { VideoItem } from '@/constants/videoList';
import clsx from 'clsx';

interface Props { video: VideoItem }

export default function VideoCard({ video }: Props) {
  return (
    <Link
      href={video.link}
      target="_blank"
      rel="noreferrer"
      className="block rounded-2xl border border-gray-normal bg-white p-3"
    >
      <div className="relative mb-3 h-40 w-full overflow-hidden rounded-xl">
        <Image src={video.thumbnail} alt={video.title} fill className="object-cover" />
        <span
          className={clsx(
            'absolute bottom-2 left-2 inline-flex h-7 items-center rounded-full px-2 text-xs text-white',
            video.gradeColor,
          )}
        >
          {video.grade.toUpperCase()} · {video.gradePercent}
        </span>
      </div>

      <p className="line-clamp-2 text-sm text-black-normal">{video.title}</p>
      <p className="mt-1 text-xs text-gray-500">{video.channelName}</p>
    </Link>
  );
}
