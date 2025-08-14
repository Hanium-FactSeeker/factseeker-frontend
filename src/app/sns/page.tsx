'use client';

import DefaultHeader from '@/components/header/DefaultHeader';
import Footer from '@/components/footer';
import Desktop from '@/components/sns/Desktop';
import Mobile from '@/components/sns/Mobile';

export default function Page() {
  return (
    <>
      <DefaultHeader isLoggedIn={false} />

      <div className="hidden md:block">
        <Desktop />
      </div>
      <div className="block md:hidden">
        <Mobile />
      </div>

      <Footer />
    </>
  );
}
