import DefaultHeader from '@/components/header/DefaultHeader';
import FilterBar from '@/components/videos/molecules/FilterBar';
import Desktop from '@/components/videos/organisms/VideoLists.desktop';
import Mobile from '@/components/videos/organisms/VideoLists.mobile';
import { HotVideosProps } from '@/types/videos';
import { videoList } from '@/constants/videoList';
import Footer from '@/components/footer';

const Video = () => {
  return (
    <>
      <DefaultHeader isLoggedIn={false} />
      <div className="flex min-h-screen w-full flex-col items-center gap-8">
        <FilterBar />
        <h3 className="text-Black_normal mt-4 ml-24 self-start text-lg font-semibold">
          오늘의 인기 영상 TOP 20
        </h3>
        <div className="hidden md:block">
          <Desktop videos={videoList} />
        </div>
        <div className="block md:hidden">
          <Mobile videos={videoList} />
        </div>
      </div>
      <Footer />
    </>
  );
};

export default Video;
