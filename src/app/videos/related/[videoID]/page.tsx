import { videoList } from '@/constants/videoList';
import Content from '@/components/videos/organisms/RelatedDetail';
import DefaultHeader from '@/components/header/DefaultHeader';
import Footer from '@/components/footer';

type VideoRelatedPageProps = {
  params: {
    videoId: string;
  };
};

const VideoRelatedPage = ({
  params: { videoId: string },
}: VideoRelatedPageProps) => {
  return (
    <div>
      <DefaultHeader isLoggedIn={false} />
      <div className="flex items-center justify-center">
        <Content videos={videoList} />
      </div>
      <Footer />
    </div>
  );
};

export default VideoRelatedPage;
