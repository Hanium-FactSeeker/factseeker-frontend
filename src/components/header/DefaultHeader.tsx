'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import NavBar from './moclue/NavBar';
import Logo from '@/components/ui/logo';
import ProfileButton from './atom/ProfileBtn';
import AuthText from './atom/AuthBtn';
import UrlModal from '@/components/common/UrlModal';

interface DefaultHeaderProps {
  isLoggedIn: boolean;
  navTextColor?: 'white' | 'black';
  initialSearch?: string;
}

const DefaultHeader: React.FC<DefaultHeaderProps> = ({
  isLoggedIn,
  initialSearch,
}) => {
  const router = useRouter();
  const [open, setOpen] = useState(false);

  const handleSubmit = (value: string) => {
    const encoded = encodeURIComponent(value);
    router.push(`/report/${encoded}`);
    setOpen(false);
  };

  return (
    <>
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

        <div className="z-30 flex w-full flex-col items-center justify-center md:mt-4 md:flex-row md:items-center md:justify-start">
          <NavBar
            isLoggedIn={isLoggedIn}
            textColor="black"
            onOpenUrlModal={() => setOpen(true)}
          />
        </div>
        <hr className="text-gray-normal mx-8 mt-6 border-0 outline md:mx-2 md:mt-10" />
      </header>

      <UrlModal
        open={open}
        initialValue={initialSearch ?? ''}
        onClose={() => setOpen(false)}
        onSubmit={handleSubmit}
      />
    </>
  );
};

export default DefaultHeader;
