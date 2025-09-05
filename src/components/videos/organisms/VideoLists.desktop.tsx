import VideoItemDesktop from '@/components/videos/molecules/VideoItem.desktop';
import type { HotVideosProps } from '@/types/videos';

const VideoListsDesktop = ({ videos }: HotVideosProps) => {
  return (
    <div className="mb-14 grid grid-cols-4 gap-6">
      {videos?.slice(0, 10).map((video, idx) => (
        <VideoItemDesktop video={video} key={idx} {...video} />
      ))}
    </div>
  );
};

export default VideoListsDesktop;
