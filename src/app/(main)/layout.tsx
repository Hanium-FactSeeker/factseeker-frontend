'use client';

import MainHeader from '@/components/header/MainHeader';
import Footer from '@/components/footer';

export default function MainLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="bg-main-gradient-mobile md:bg-main-gradient-desktop">
      <MainHeader />
      <main>{children}</main>
    </div>
  );
}
