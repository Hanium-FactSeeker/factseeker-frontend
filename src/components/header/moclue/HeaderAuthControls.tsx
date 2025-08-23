'use client';

import { useRouter } from 'next/navigation';
import toast from 'react-hot-toast';
import { useAuthStore } from '@/store/useAuthStore';
import { MdAccountCircle } from 'react-icons/md';

export default function HeaderAuthControls() {
  const router = useRouter();
  const isLoggedIn = useAuthStore((s) => s.isLoggedIn);
  const user = useAuthStore((s) => s.user);
  const logout = useAuthStore((s) => s.logout);

  const displayName = user?.loginId || '';

  const handleLogout = async () => {
    try {
      await logout();
      toast.success('로그아웃 되었습니다.');
      router.push('/login');
    } catch {
      toast.error('로그아웃에 실패했습니다.');
    }
  };

  if (!isLoggedIn) {
    return (
      <div className="z-[999] self-end text-sm font-semibold">
        <button
          className="hover:underline"
          onClick={() => router.push('/login')}
        >
          로그인
        </button>
        <span className="mx-2 opacity-60">|</span>
        <button
          className="hover:underline"
          onClick={() => router.push('/sign-up')}
        >
          회원가입
        </button>
      </div>
    );
  }

  return (
    <div className="mt-2 flex w-full items-center justify-end text-xs font-semibold md:text-base">
      <MdAccountCircle size={20} className="mr-1 block md:hidden" />
      <MdAccountCircle size={30} className="mr-1 hidden md:block" />
      <span className="mr-2 opacity-90">{displayName}</span>
      <span className="opacity-50">|</span>
      <button
        onClick={handleLogout}
        className="cursor-pointer px-2 py-2 text-xs hover:underline md:text-sm"
      >
        로그아웃
      </button>
    </div>
  );
}
