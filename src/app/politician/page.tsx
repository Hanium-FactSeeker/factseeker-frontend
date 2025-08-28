'use client';

import DefaultHeader from '@/components/header/DefaultHeader';
import Footer from '@/components/footer/index';
import PoliticianDesktop from '@/components/politician/organisms/desktop';
import PoliticianMobile from '@/components/politician/organisms/mobile';

export default function PoliticianPage() {
  return (
    <main className="flex w-full flex-col items-center">
      <DefaultHeader isLoggedIn={false} />
      <section className="flex w-full flex-col items-center gap-10">
        <div className="hidden w-full md:block">
          <PoliticianDesktop />
        </div>
        <div className="w-full md:hidden">
          <PoliticianMobile />
        </div>
      </section>
      <Footer />
    </main>
  );
}
