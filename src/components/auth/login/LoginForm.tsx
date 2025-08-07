'use client'
import React from 'react'
import Logo                 from '@/assets/Logo'
import TextInput            from '@/components/ui/button/TextInput'
import { Button }           from '@/components/ui/button/index'
import { NaverLoginButton } from '@/components/ui/button/NaverLoginButton'
import { KakaoLoginButton } from '@/components/ui/button/KakaoLoginButton'
import { FaUser, FaLock }   from 'react-icons/fa'

export default function LoginForm() {
  return (
    <div className="flex flex-col items-center gap-6 w-full text-[var(--foreground)]">
      <div className="flex flex-col items-center gap-2">
        <Logo width={30} height={30} />
        <span className="text-2xl font-bold text-[var(--primary-normal)]">
          Fact Seeker
        </span>
      </div>

      <h2 className="text-xl font-bold text-[var(--black-normal)]">로그인</h2>
      <div className="flex flex-col gap-4 w-full">
        <TextInput
          placeholder="아이디"
          iconLeft={<FaUser />}
          className="bg-[var(--gray-light)] text-[var(--foreground)]"
        />
        <TextInput
          type="password"
          placeholder="비밀번호"
          iconLeft={<FaLock />}
          className="bg-[var(--gray-light)] text-[var(--foreground)]"
        />
      </div>

      <Button
        fullWidth
        size="lg"
        color='black'
      >
        로그인
      </Button>

      <div className="flex items-center justify-center text-xs text-[var(--black-normal)] gap-2">
        <span className="cursor-pointer">회원가입</span>
        <span>|</span>
        <span className="cursor-pointer">아이디 찾기</span>
        <span>|</span>
        <span className="cursor-pointer">비밀번호 찾기</span>
      </div>

      <div className="w-full h-px bg-[var(--gray-normal)]" />

      <p className="mt-4 text-sm text-[var(--foreground)]">소셜 로그인</p>
      <div className="flex flex-col gap-3 w-full">
        <NaverLoginButton className="w-full h-12 text-base" />
        <KakaoLoginButton className="w-full h-12 text-base" />
      </div>
    </div>
  )
}
