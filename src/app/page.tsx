import React from 'react';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';

import '@/styles/globals.css';

import MainHeader from '@/components/header/MainHeader';
import Footer from '@/components/footer';
import InfoBar from '@/components/main/molecules/InfoBar';
import PoliticianSection from '@/components/main/organisms/PoliticianSection';
import HotVideosSection from '@/components/main/organisms/HotVideos';
import SnsSection from '@/components/main/organisms/SnsSection';

import { videoList } from '@/constants/videoList';

export default function Home() {
  return (
    <main className="bg-main-gradient-mobile md:bg-main-gradient-desktop flex min-h-screen w-full flex-col items-center justify-center gap-12">
      <MainHeader isLoggedIn={false} />
      <InfoBar />
      <PoliticianSection />
      <HotVideosSection videos={videoList} />
      <SnsSection />
      <Footer />
    </main>
  );
}
