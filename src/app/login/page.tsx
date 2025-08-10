import React from 'react';
import TextInput from '../../components/ui/button/TextInput';
import { NaverLoginButton } from '../../components/ui/button/NaverLoginButton';
import { KakaoLoginButton } from '../../components/ui/button/KakaoLoginButton';
import { FaUser, FaLock } from 'react-icons/fa';
import { Button } from '../../components/ui/button/index';
import Logo from '@/components/ui/logo/LogoStar';

export default function LoginPage() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-white">
      <div className="flex flex-col items-center gap-6">
        <div className="flex flex-col items-center gap-2">
          <div>
            <Logo className="mb-0" />
          </div>
          <span className="text-[20px] font-bold text-[#7B61FF]">
            Fact Seeker
          </span>
        </div>

        <h2 className="mt-4 text-xl font-bold text-black">로그인</h2>

        <div className="mt-2 flex flex-col gap-5">
          <TextInput placeholder="아이디" iconLeft={<FaUser />} />
          <TextInput
            type="password"
            placeholder="비밀번호"
            iconLeft={<FaLock />}
          />
        </div>

        <Button color="black" size="lg" fullWidth>
          로그인
        </Button>

        <div className="flex items-center justify-center gap-2 font-[Pretendard] text-xs text-[#626262]">
          <span className="cursor-pointer">회원가입</span>
          <span className="text-[#C4C4C4]">|</span>
          <span className="cursor-pointer">아이디 찾기</span>
          <span className="text-[#C4C4C4]">|</span>
          <span className="cursor-pointer">비밀번호 찾기</span>
        </div>

        <div className="mt-[-4px] h-[1px] w-96 bg-[#E0E0E0]" />
        <div className="mt-4 text-sm text-black">소셜 로그인</div>
        <div className="flex flex-col items-center gap-4">
          <NaverLoginButton className="h-12 w-96 text-base" />
          <KakaoLoginButton className="h-12 w-96 text-base" />
        </div>
      </div>
    </div>
  );
}
