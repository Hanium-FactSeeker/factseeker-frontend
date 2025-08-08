'use client'
import React from 'react'
import Logo                 from '@/assets/Logo'
import TextInput            from '@/components/ui/button/TextInput'
import { Button }           from '@/components/ui/button'
import { NaverLoginButton } from '@/components/ui/button/NaverLoginButton'
import { KakaoLoginButton } from '@/components/ui/button/KakaoLoginButton'
import { FaUser, FaLock }   from 'react-icons/fa'

export default function LoginForm() {
  return (
    <div className="flex flex-col items-center gap-6 w-full">
      <div className="flex flex-col items-center gap-2">
        <Logo width={30} height={30} />
        <span className="text-2xl font-bold text-primary-normal">Fact Seeker</span>
      </div>

      <h2 className="text-xl font-bold text-black-normal">로그인</h2>

      <div className="flex flex-col gap-4 w-full">
        <TextInput
          fullWidth
          placeholder="아이디"
          iconLeft={<FaUser />}
          className="bg-gray-light text-foreground"
        />
        <TextInput
          fullWidth
          type="password"
          placeholder="비밀번호"
          iconLeft={<FaLock />}
          className="bg-gray-light text-foreground"
        />
      </div>

      <Button fullWidth size="lg" color="black">
        로그인
      </Button>

      <div className="flex items-center justify-center text-xs text-black-normal gap-2">
        <span className="cursor-pointer">회원가입</span>
        <span>|</span>
        <span className="cursor-pointer">아이디 찾기</span>
        <span>|</span>
        <span className="cursor-pointer">비밀번호 찾기</span>
      </div>

      <div className="w-full h-px bg-gray-normal" />

      <p className="mt-4 text-sm">소셜 로그인</p>
      <div className="flex flex-col gap-3 w-full">
        <NaverLoginButton className="w-full h-12 text-base" />
        <KakaoLoginButton className="w-full h-12 text-base" />
      </div>
    </div>
  )
}
