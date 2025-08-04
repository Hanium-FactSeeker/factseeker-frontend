import React, { useState } from 'react';
import FrontStars from '@/assets/front_starts.svg';
import BackStars from '@/assets/back_stars.svg';
import Logo from '@/components/ui/logo';
import SearchBar from '@/components/ui/search';
import NavBar from './moclue/NavBar';
import ProfileButton from './atom/ProfileBtn';
import AuthText from './atom/AuthBtn';

interface MainHeaderProps {
  isLoggedIn: boolean;
}

const MainHeader: React.FC<MainHeaderProps> = ({ isLoggedIn }) => {
  const [search, setSearch] = useState('');

  return (
    <header className="static top-0 left-0 z-50 flex h-auto w-full flex-col items-center overflow-hidden bg-cover px-4 py-8 text-white md:px-8 md:py-6">
      <div className="absolute top-0 left-0 z-0 h-full w-full">
        <BackStars className="h-full w-full object-cover" />
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

        <div className="z-30 flex w-full flex-col items-center justify-center gap-2 md:flex-row md:items-center md:justify-evenly md:gap-6">
          <SearchBar
            value={search}
            onChange={function (e: React.ChangeEvent<HTMLInputElement>): void {
              setSearch(e.target.value);
            }}
            placeHolder={'팩트를 확인하고 싶은 기사나 유튜브를 입력해 주세요'}
            onClick={function (): void {
              console.log('검색:', search);
            }}
          />
          <NavBar isLoggedIn={false} textColor="white" />
        </div>
        <hr className="text-gray-normal border-outline mx-8 mt-6 md:mx-4 md:mt-10" />
        <div className="rigth-30 absolute top-0 left-0 z-0 opacity-80 md:top-5 md:left-100">
          <FrontStars />
        </div>
      </div>
    </header>
  );
};

export default MainHeader;
