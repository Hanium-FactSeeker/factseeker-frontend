'use client';

import type { VideoItem } from '@/constants/videoList';
import FactBadge from '@/components/ui/factBadge';
import { BadgeType } from '@/types/validity';

interface Props { video: VideoItem }

export default function VideoRow({ video }: Props) {
  return (
    <a
      href={video.link}
      target="_blank"
      rel="noreferrer"
      className="group flex w-full items-center gap-4 border-b border-gray-200 py-4 hover:bg-gray-50"
    >
      <div className="relative h-16 w-28 shrink-0 overflow-hidden rounded-lg">
        <img
          src={video.thumbnail}
          alt={video.title}
          className="h-full w-full object-cover"
        />
        <div className="absolute left-0 top-0 z-10">
          <FactBadge
            percent={video.gradePercent}
            width={48}
            height={58}
            type={video.grade as BadgeType}
          />
        </div>
      </div>

      <div className="min-w-0 flex-1">
        <p className="truncate text-black-normal text-sm md:text-base">
          {video.title}
        </p>
        <p className="mt-1 text-xs text-gray-500">{video.channelName}</p>
      </div>
    </a>
  );
}
