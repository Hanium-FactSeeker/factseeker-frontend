'use client';

import React, { useEffect, useRef, useState } from 'react';
import { useRouter } from 'next/navigation';
import toast from 'react-hot-toast';
import { FaUser, FaLock } from 'react-icons/fa';
import TextInput from '@/components/ui/button/TextInput';
import { Button } from '@/components/ui/button';
import { NaverLoginButton } from '@/components/ui/button/NaverLoginButton';
import { KakaoLoginButton } from '@/components/ui/button/KakaoLoginButton';
import { FindIdModal, FindPasswordModal } from '@/components/findmodal';
import { useAuthStore } from '@/store/useAuthStore';

export default function LoginForm() {
  const router = useRouter();
  const loginWithCredentials = useAuthStore((s) => s.loginWithCredentials);

  const inputRef = useRef<HTMLInputElement>(null);
  useEffect(() => {
    if (!open) return;
    const timer = setTimeout(() => inputRef.current?.focus(), 0);
    return () => clearTimeout(timer);
  }, []);

  const [loginId, setLoginId] = useState('');
  const [password, setPassword] = useState('');
  const [openFindId, setOpenFindId] = useState(false);
  const [openFindPw, setOpenFindPw] = useState(false);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!loginId.trim() || !password.trim()) {
      toast.error('아이디와 비밀번호를 입력해 주세요.');
      return;
    }

    try {
      await loginWithCredentials(loginId, password);
      toast('로그인에 성공했습니다');
      router.push('/');
    } catch {
      toast.error('아이디와 비밀번호를 다시 확인해 주세요');
    }
  };

  const handleGoNaver = () => {
    window.location.href = 'https://prod.fact-seeker.com/oauth2/authorization/naver';
  };

  const handleGoKakao = () => {
    window.location.href = 'https://prod.fact-seeker.com/oauth2/authorization/kakao';
  };

  return (
    <div className="flex w-full flex-col items-center gap-6">
      <h2 className="text-black-normal text-xl font-bold">로그인</h2>
      <form onSubmit={handleLogin} className="flex w-full flex-col gap-4">
        <TextInput
          ref={inputRef}
          fullWidth
          placeholder="아이디"
          onChange={(e: React.ChangeEvent<HTMLInputElement>) => setLoginId(e.target.value)}
          value={loginId}
          iconLeft={<FaUser />}
          className="bg-gray-light text-foreground"
        />
        <TextInput
          fullWidth
          type="password"
          placeholder="비밀번호"
          onChange={(e: React.ChangeEvent<HTMLInputElement>) => setPassword(e.target.value)}
          value={password}
          iconLeft={<FaLock />}
          className="bg-gray-light text-foreground"
        />

        <Button type="submit" onClick={handleLogin} fullWidth size="lg" color="black">
          로그인
        </Button>
      </form>

      <div className="text-black-normal flex items-center justify-center gap-2 text-xs">
        <button className="cursor-pointer hover:underline" onClick={() => router.push('/sign-up')}>
          회원가입
        </button>
        <span>|</span>
        <button className="cursor-pointer hover:underline" onClick={() => setOpenFindId(true)}>
          아이디 찾기
        </button>
        <span>|</span>
        <button className="cursor-pointer hover:underline" onClick={() => setOpenFindPw(true)}>
          비밀번호 찾기
        </button>
      </div>
      <FindIdModal open={openFindId} onClose={() => setOpenFindId(false)} />
      <FindPasswordModal open={openFindPw} onClose={() => setOpenFindPw(false)} />
      <div className="bg-gray-normal h-px w-full" />

      <p className="mt-4 text-sm">소셜 로그인</p>
      <div className="flex w-full flex-col gap-3">
        <NaverLoginButton className="h-12 w-full text-base" onClick={handleGoNaver} />
        <KakaoLoginButton className="h-12 w-full text-base" onClick={handleGoKakao} />
      </div>
    </div>
  );
}
