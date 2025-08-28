'use client';

import type { VideoItem } from '@/constants/videoList';
import FactBadge from '@/components/ui/factBadge';
import { ValidityType } from '@/types/validity';

interface Props {
  video: VideoItem;
}

export default function VideoRow({ video }: Props) {
  const dateText = video.publishedAt ?? video.date ?? '';

  return (
    <a
      href={video.link}
      target="_blank"
      rel="noreferrer"
      className="group grid w-full grid-cols-[1fr_144px] items-center gap-4 border-b border-gray-200 py-4 hover:bg-gray-50"
    >
      <div className="min-w-0">
        <p className="text-black-normal line-clamp-2 text-sm group-hover:underline md:text-base">
          {video.title}
        </p>
        <div className="mt-1 flex items-center gap-2 text-xs text-gray-500">
          <span className="truncate">{video.channelName}</span>
          {dateText && (
            <>
              <span>·</span>
              <span>{dateText}</span>
            </>
          )}
        </div>
      </div>

      <div className="relative h-20 w-36 justify-self-end overflow-hidden rounded-lg">
        <img
          src={video.thumbnail}
          alt={video.title}
          className="h-full w-full object-cover"
        />
        {video.grade && (
          <div className="absolute top-0 left-0 z-10">
            <FactBadge
              type={video.grade as ValidityType}
              percent={Number(`${video.gradePercent ?? 0}`)}
              width={48}
              height={56}
              textSize="xs"
            />
          </div>
        )}
      </div>
    </a>
  );
}
