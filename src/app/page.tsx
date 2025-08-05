'use client';

import React from 'react';
import ButtonTest from '@/components/ui/button/ButtonTest';
// import Logo from '@/components/ui/logo';
import MainHeader from '@/components/header/MainHeader';
import DefaultHeader from '@/components/header/DefaultHeader';
import Footer from '@/components/footer';

export default function Home() {
  return (
    // <main className="flex min-h-screen flex-col items-center justify-center gap-12 bg-white p-8">
    <main className="bg-main-gradient-mobile md:bg-main-gradient-desktop flex min-h-screen flex-col items-center justify-center gap-12">
      <MainHeader isLoggedIn={false} />
      <DefaultHeader isLoggedIn={false} />
      <p className="font-bold text-amber-600">메인페이지</p>
      <ButtonTest />
      <Footer />
    </main>
  );
}
