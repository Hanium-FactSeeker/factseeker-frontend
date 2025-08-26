import { VideoItem } from '@/types/videos';

/**
 * 영상 썸네일, 제목, 채널명을 보여주는 컴포넌트입니다.
 */
export const VideoSummary = ({ video }: { video: VideoItem }) => {
  return (
    <div className="flex w-[90%] items-center justify-center gap-4 md:h-32 md:w-140 md:gap-6">
      <img
        src={video.thumbnail}
        className="h-16 w-28 rounded-xl md:h-26 md:w-54"
      />
      <div className="flex flex-col">
        <p className="text-black-normal mb-4 text-sm font-bold md:mb-6 md:text-lg">
          {video.title}
        </p>
        {/* <p className="text-black-alternative md:text-md text-xs font-medium">
          {video.channelName}
        </p> */}
      </div>
    </div>
  );
};
