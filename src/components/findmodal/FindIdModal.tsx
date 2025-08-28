'use client';
import React from 'react';
import ModalBase from './ModalBase';
import TextInput from '@/components/ui/button/TextInput';
import { Button } from '@/components/ui/button';
import { FaUser } from 'react-icons/fa';

type Props = { open: boolean; onClose?: () => void };

export default function FindIdModal({ open, onClose }: Props) {
  return (
    <ModalBase open={open} onClose={onClose}>
      <h3 className="text-black-normal mb-4 text-center text-lg font-bold md:mb-6 md:text-xl">
        아이디 찾기
      </h3>

      <div className="space-y-3 md:space-y-4">
        <TextInput
          iconLeft={<FaUser />}
          fullWidth
          placeholder="이메일을 입력해 주세요"
          className="bg-gray-light text-foreground"
        />
      </div>

      <Button color="black" size="lg" fullWidth className="mt-4 md:mt-6">
        확인
      </Button>
    </ModalBase>
  );
}
