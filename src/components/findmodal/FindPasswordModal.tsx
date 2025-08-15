'use client'
import React from 'react'
import ModalBase from './ModalBase'
import TextInput from '@/components/ui/button/TextInput'
import { Button } from '@/components/ui/button'
import { FaUser, FaLock } from 'react-icons/fa'

type Props = { open: boolean; onClose?: () => void }

export default function FindPasswordModal({ open, onClose }: Props) {
  return (
    <ModalBase open={open} onClose={onClose}>
      <h3 className="text-xl md:text-2xl font-bold text-black-normal text-center mb-4 md:mb-6">
        비밀번호 찾기
      </h3>

      <div className="w-full space-y-5 md:space-y-6">
        <TextInput
          fullWidth
          placeholder="아이디"
          iconLeft={<FaUser />}
          className="bg-gray-light text-foreground"
        />
        <TextInput
          fullWidth
          placeholder="가입한 이메일"
          iconLeft={<FaUser />}
          className="bg-gray-light text-foreground"
        />
        <TextInput
          fullWidth
          placeholder="인증번호를 입력해 주세요"
          iconLeft={<FaLock />}
          className="bg-gray-light text-foreground"
        />
      </div>

      <Button color="black" size="lg" fullWidth className="mt-4 md:mt-6">
        확인
      </Button>
    </ModalBase>
  )
}