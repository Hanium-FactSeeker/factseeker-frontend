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
      <header className="border-gray-normal sticky top-0 z-50 w-full bg-white/90 backdrop-blur">
        {/* 상단 바: 로고 / 로그인영역 */}
        <div className="items-centermd:h-16 mx-[6%] flex h-18 max-w-screen-xl items-end justify-between">
          <div className="shrink-0">
            <Logo />
          </div>
          <div className="flex items-center">
            <HeaderAuthControls />
          </div>
        </div>

        {/* 내비 바: 항목 정렬(줄바꿈 허용) */}
        <div className="mx-[6%] flex justify-center">
          <NavBar
            isLoggedIn={isLoggedIn}
            textColor={navTextColor}
            onOpenUrlModal={() => setOpen(true)}
            items={defaultItems}
            className="flex-wrap md:gap-6 md:py-3"
          />
        </div>
        <div className="border-gray-normal mx-auto mt-2 w-[90%] border-b"></div>
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
