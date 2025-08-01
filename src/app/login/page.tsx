import React from "react";
import TextInput from "../../components/ui/button/TextInput"
import { NaverLoginButton } from "../../components/ui/button/NaverLoginButton";
import { KakaoLoginButton } from "../../components/ui/button/KakaoLoginButton";
import { FaUser, FaLock } from "react-icons/fa";

export default function LoginPage() {
  return (
    <div className="flex items-center justify-center min-h-screen bg-white">
      <div className="flex flex-col items-center gap-6">
        <div className="flex flex-col items-center gap-2">
          <span className="text-[20px] font-bold text-[#7B61FF]">Fact Seeker</span>
        </div>

        <h2 className="text-xl font-bold text-black mt-4">로그인</h2>

        <div className="flex flex-col gap-5 mt-2">
          <TextInput placeholder="아이디" iconLeft={<FaUser />} />
          <TextInput type="password" placeholder="비밀번호" iconLeft={<FaLock />} />
        </div>

        <button className="w-96 h-12 bg-black text-white rounded-xl mt-2 text-sm font-semibold hover:opacity-90">
          로그인
        </button>

        
        <div className="text-xs text-black mt-1">
          회원가입 | 아이디 찾기 | 비밀번호 찾기
        </div>

        <div className="w-96 h-[1px] bg-[#E0E0E0] mt-[-4px]" />
        <div className="mt-4 text-black text-sm">소셜 로그인</div>
        <div className="flex flex-col gap-4 items-center">
            <NaverLoginButton className="w-96 h-12 text-base" />
            <KakaoLoginButton className="w-96 h-12 text-base" />
        </div>
      </div>
    </div>
  );
}
