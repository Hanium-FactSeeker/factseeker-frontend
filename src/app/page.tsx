import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import '@/styles/globals.css';

import MainHeader from '@/components/header/MainHeader';
import InfoBar from '@/components/main/molecules/InfoBar';
import SearchSection from '@/components/main/organisms/SearchSection';
import PoliticianSection from '@/components/main/organisms/PoliticianSection';
import HotVideosSection from '@/components/main/organisms/HotVideos';
import SnsSection from '@/components/main/organisms/SnsSection';
import Footer from '@/components/footer';

import { videoList } from '@/constants/videoList';

export default function Home() {
  return (
    <main className="bg-main-gradient-mobile md:bg-main-gradient-desktop flex min-h-screen w-full flex-col items-center justify-center gap-6 md:gap-12">
      <MainHeader />
      <InfoBar />
      <SearchSection
        placeHolder={'분석을 진행할 유튜브의 url을 입력해 주세요'}
      />
      <PoliticianSection />
      <HotVideosSection videos={videoList} />
      <SnsSection />
      <Footer />
    </main>
  );
}
