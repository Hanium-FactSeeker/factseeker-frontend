import Content from '@/components/videos/organisms/RelatedDetail';
import DefaultHeader from '@/components/header/DefaultHeader';
import Footer from '@/components/footer';

const VideoRelatedPage = async ({
  params,
  searchParams,
}: {
  params: Promise<Record<string, string>>;
  searchParams: Promise<Record<string, string | undefined>>;
}) => {
  const resolvedParams = await params;
  const resolvedSearch = await searchParams;

  const videoId = resolvedParams.videoId ?? resolvedParams.videoID;
  const title = resolvedSearch.title ?? '';
  const thumb = resolvedSearch.thumb ?? '';
  return (
    <div>
      <DefaultHeader isLoggedIn={false} />
      <div className="flex items-center justify-center">
        <Content
          videoId={videoId ?? ''}
          initialVideo={{ id: videoId, title, thumbnail: thumb }}
        />
      </div>
      <Footer />
    </div>
  );
};

export default VideoRelatedPage;
