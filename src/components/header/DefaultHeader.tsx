'use client';

import { useMemo, useState } from 'react';
import { useRouter } from 'next/navigation';
import Logo from '@/components/ui/logo';
import NavBar from './moclue/NavBar';
import UrlModal from '@/components/common/UrlModal';
import { getNavItems } from '@/constants/navItems';
import { useAuthStore } from '@/store/useAuthStore';
import HeaderAuthControls from './moclue/HeaderAuthControls';

interface DefaultHeaderProps {
  navTextColor?: 'white' | 'black';
  initialSearch?: string;
}

const DefaultHeader = ({
  navTextColor = 'black',
  initialSearch,
}: DefaultHeaderProps) => {
  const router = useRouter();
  const [open, setOpen] = useState(false);
  const { isLoggedIn } = useAuthStore();

  const handleSubmit = (value: string) => {
    const encoded = encodeURIComponent(value);
    router.push(`/report/${encoded}`);
    setOpen(false);
  };

  const { default: defaultItems } = useMemo(
    () => getNavItems(() => setOpen(true)),
    [],
  );

  return (
    <>
      <header className="z-50 w-full bg-white/90 px-4 py-3 md:px-8 md:py-5">
        <div className="flex items-center justify-between">
          <div className="ml-10">
            <Logo />
          </div>
          <div className="mr-2 flex justify-end gap-4 text-sm font-medium md:text-lg">
            <HeaderAuthControls />
          </div>
        </div>

        <div className="mt-6 ml-5">
          <NavBar
            isLoggedIn={isLoggedIn}
            textColor={navTextColor}
            onOpenUrlModal={() => setOpen(true)}
            items={defaultItems}
            className="ml-5"
          />
        </div>
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
