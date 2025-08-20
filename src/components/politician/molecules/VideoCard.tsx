'use client';

import type { VideoItem } from '@/constants/videoList';
import FactBadge from '@/components/ui/factBadge';
import { ValidityType } from '@/types/validity';

interface Props { video: VideoItem }

export default function VideoCard({ video }: Props) {
  return (
    <a
      href={video.link}
      target="_blank"
      rel="noreferrer"
      className="block rounded-2xl border border-gray-200 bg-white p-3"
    >
      <div className="relative mb-3 h-40 w-full overflow-hidden rounded-xl">
        <img
          src={video.thumbnail}
          alt={video.title}
          className="h-full w-full object-cover"
        />
        {video.grade && (
          <div className="absolute left-0 top-0 z-10">
            <FactBadge
              type={video.grade as ValidityType}
              percent={`${video.gradePercent ?? 0}`}
              width={70}
              height={60}
              textSize="sm"
            />
          </div>
        )}
      </div>

      <p className="line-clamp-2 text-sm text-black-normal">{video.title}</p>
      <p className="mt-1 text-xs text-gray-500">
        {video.channelName}
        {video.publishedAt ? ` · ${video.publishedAt}` : ''}
      </p>
    </a>
  );
}
