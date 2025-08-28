import VideoItemDesktop from '@/components/videos/molecules/VideoItem.desktop';
import { HotVideosProps } from '@/types/videos';
import VideoItemMobile from '../molecules/VideoItem.mobile';

const VideoListsMobile = ({ videos }: HotVideosProps) => {
  return (
    <div className="flex flex-col gap-4">
      {videos?.slice(0, 10).map((video, idx) => (
        <VideoItemMobile idx={idx} video={video} key={idx} {...video} />
      ))}
    </div>
  );
};

export default VideoListsMobile;
