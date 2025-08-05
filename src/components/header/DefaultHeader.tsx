import { useState } from 'react';
import NavBar from './moclue/NavBar';
import Search from '../ui/search';
import { FaUserCircle } from 'react-icons/fa';
import Logo from '../ui/logo';
import ProfileButton from './atom/ProfileBtn';
import AuthText from './atom/AuthBtn';

interface DefaultHeaderProps {
  isLoggedIn: boolean;
  navTextColor?: 'white' | 'black';
}
const DefaultHeader: React.FC<DefaultHeaderProps> = ({ isLoggedIn }) => {
  const [search, setSearch] = useState('');

  return (
    <header className="z-50 flex h-auto w-full flex-col bg-cover px-4 py-3 md:px-8 md:py-6">
      <div className="flex items-center justify-between">
        <div className="ml-10">
          <Logo />
        </div>

        <div className="mr-2 flex justify-end gap-4 text-sm font-medium md:mt-4 md:text-lg">
          {isLoggedIn ? (
            <ProfileButton label={'홍길동'} />
          ) : (
            <AuthText textColor={'black'} />
          )}
        </div>
      </div>
      <div className="z-30 flex w-full flex-col items-center justify-center md:mt-4 md:flex-row md:items-center md:justify-evenly">
        <Search
          value={search}
          onChange={function (e: React.ChangeEvent<HTMLInputElement>): void {
            setSearch(e.target.value);
          }}
          placeHolder={'팩트를 확인하고 싶은 기사나 유튜브를 입력해 주세요'}
          onClick={function (): void {
            console.log('검색:', search);
          }}
        />
        <NavBar isLoggedIn={false} textColor="black" />
      </div>
      <hr className="text-gray-normal mx-8 mt-6 border-0 outline md:mx-4 md:mt-10" />
    </header>
  );
};

export default DefaultHeader;
