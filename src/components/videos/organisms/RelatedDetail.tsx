'use client';

import { HotVideosProps, VideoItem } from '@/types/videos';
import { VideoSummary } from '../molecules/VideoSummary';
import { KeywordList } from '../molecules/KeywordList';
import RelatedVideoPanel from './RelatedVideoPanel';
import { useState } from 'react';
import { videoList } from '@/constants/videoList';
import { KEYWORDS } from '@/constants/keywords';

const RelatedDesktopLayout = ({ videos }: HotVideosProps) => {
  const [selected, setSelected] = useState<string | null>(null);

  return (
    <div className="flex w-full flex-col gap-2 p-4 md:w-[1100px] md:flex-row md:gap-6">
      <div className="flex flex-col items-center gap-4 md:w-[60%] md:gap-8">
        <VideoSummary video={videos[0]} />
        <hr className="border-gray-normal w-full" />

        <h4 className="text-sm font-medium md:text-lg">연관 키워드</h4>
        <div className="border-gray-normal flex h-46 w-full items-center justify-center rounded-2xl border p-4 md:h-70">
          <KeywordList
            keywords={KEYWORDS}
            onSelect={(k) => setSelected((prev) => (prev === k ? null : k))}
            selected={selected}
          />
        </div>
      </div>
      <div className="flex w-full flex-col justify-center md:w-[40%]">
        <RelatedVideoPanel
          items={selected ? videoList.slice(0, 10) : undefined}
        />
      </div>
    </div>
  );
};

export default RelatedDesktopLayout;
