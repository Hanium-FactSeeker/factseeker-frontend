'use client';

import type { VideoItem } from '@/constants/videoList';
import FactBadge from '@/components/ui/factBadge';
import { BadgeType } from '@/types/validity';

interface Props { video: VideoItem }

export default function VideoCard({ video }: Props) {
  return (
    <a
      href={video.link}
      target="_blank"
      rel="noreferrer"
      className="block rounded-2xl border border-gray-normal bg-white p-3"
    >
      <div className="relative mb-3 h-40 w-full overflow-hidden rounded-xl">
        <img
          src={video.thumbnail}
          alt={video.title}
          className="h-full w-full object-cover"
        />
        <div className="absolute left-0 top-0 z-10">
          <FactBadge
            percent={video.gradePercent}
            width={56}
            height={70}
            type={video.grade as BadgeType}
          />
        </div>
      </div>

      <p className="line-clamp-2 text-sm text-black-normal">{video.title}</p>
      <p className="mt-1 text-xs text-gray-500">{video.channelName}</p>
    </a>
  );
}
