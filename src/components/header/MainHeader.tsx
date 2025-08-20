'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import FrontStars from '@/assets/front_starts.svg';
import BackStars from '@/assets/back_stars.svg';
import Logo from '@/components/ui/logo';
import Search from '@/components/ui/search';
import NavBar from './moclue/NavBar';
import ProfileButton from './atom/ProfileBtn';
import AuthText from './atom/AuthBtn';
import { NAV_ITEMS_MAIN } from '@/constants/navItems';
import type { NavItem } from '@/types/nav';

interface MainHeaderProps {
  isLoggedIn: boolean;
}

const MainHeader: React.FC<MainHeaderProps> = ({ isLoggedIn }) => {
  const router = useRouter();

  return (
    <header className="relative top-0 left-0 z-50 flex h-[30%] w-full flex-col items-center overflow-hidden bg-cover px-4 py-8 text-white md:px-8 md:py-6">
      <div className="pointer-events-none absolute inset-0 z-0">
        <BackStars className="h-full w-full pl-14" />
      </div>

      <div className="relative z-20 flex w-full max-w-[1280px] flex-col">
        {isLoggedIn ? (
          <ProfileButton label={'홍길동'} />
        ) : (
          <AuthText textColor={'white'} />
        )}
        <Logo type="main" />
        <span className="z-10 mt-0.5 mb-4 flex w-full max-w-none items-center justify-center gap-1.5 md:mt-4 md:mb-8 md:gap-4">
          <p className="text-center text-[10px] font-semibold md:mb-0 md:text-xl">
            가짜뉴스에 현혹되기 쉬운 세상,
          </p>
          <p className="text-center text-[10px] font-semibold text-yellow-400 md:text-xl">
            팩트시커가 진실을 밝혀줍니다
          </p>
        </span>
        <NavBar
          isLoggedIn={false}
          textColor="white"
          items={NAV_ITEMS_MAIN as NavItem[]}
          className="flex justify-center"
        />
        <hr className="text-gray-normal border-outline mx-8 mt-6 md:mx-4 md:mt-10" />
        <div className="absolute right-0 bottom-10 left-0 z-10 scale-50 opacity-80 md:scale-100">
          <FrontStars />
        </div>
      </div>
    </header>
  );
};

export default MainHeader;
