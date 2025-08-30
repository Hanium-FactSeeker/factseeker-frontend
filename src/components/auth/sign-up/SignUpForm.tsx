'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import Logo from '@/assets/Logo';
import TextInput from '@/components/ui/button/TextInput';
import { Button } from '@/components/ui/button';

type FormData = {
  username: string;
  phone: string;
  email: string;
  password: string;
  confirmPassword: string;
  agreed: boolean;
};

function SimpleCheckbox({
  id,
  name,
  checked,
  onChange,
}: {
  id: string;
  name: string;
  checked: boolean;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}) {
  return (
    <input
      id={id}
      name={name}
      type="checkbox"
      checked={checked}
      onChange={onChange}
      className="text-primary-normal bg-gray-light border-gray-normal focus:ring-primary-normal h-4 w-4 rounded focus:ring-2"
    />
  );
}

export default function SignUpForm() {
  const router = useRouter();

  const [formData, setFormData] = useState<FormData>({
    username: '',
    phone: '',
    email: '',
    password: '',
    confirmPassword: '',
    agreed: false,
  });

  const [errors, setErrors] = useState<Partial<Record<keyof FormData, string>>>(
    {},
  );

  const validate = () => {
    const errs: Partial<Record<keyof FormData, string>> = {};

    if (formData.phone.replace(/[^0-9]/g, '').length !== 11) {
      errs.phone = '전화번호 형식이 올바르지 않습니다.';
    }

    if (!formData.email.includes('@') || !formData.email.includes('.')) {
      errs.email = '이메일 형식이 올바르지 않습니다.';
    }

    const pw = formData.password;
    if (
      pw.length < 8 ||
      !/[a-zA-Z]/.test(pw) ||
      !/[0-9]/.test(pw) ||
      !/[^a-zA-Z0-9]/.test(pw)
    ) {
      errs.password =
        '비밀번호는 8자 이상, 영문, 숫자, 특수문자를 포함해야 합니다.';
    }

    if (formData.password !== formData.confirmPassword) {
      errs.confirmPassword = '비밀번호가 일치하지 않습니다.';
    }

    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (validate()) {
      console.log('회원가입 성공', formData);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value,
    }));
  };

  return (
    <div className="w-full">
      <h2 className="text-black-normal mb-6 text-center text-xl font-bold">
        회원가입
      </h2>

      <form
        onSubmit={handleSubmit}
        className="flex w-full flex-col items-center gap-6"
      >
        <div className="flex w-full flex-col gap-1">
          <label className="text-black-normal text-sm font-semibold">
            아이디
          </label>
          <TextInput
            name="username"
            placeholder="아이디를 입력해 주세요"
            fullWidth
            value={formData.username}
            onChange={handleChange}
            className="bg-gray-light text-foreground"
          />
        </div>

        <div className="flex w-full flex-col gap-1">
          <label className="text-black-normal text-sm font-semibold">
            전화번호
          </label>
          <TextInput
            name="phone"
            placeholder="010-0000-0000"
            fullWidth
            value={formData.phone}
            onChange={handleChange}
            className="bg-gray-light text-foreground"
          />
          {errors.phone && (
            <p className="text-sm text-red-500">{errors.phone}</p>
          )}
        </div>

        <div className="flex w-full flex-col gap-1">
          <label className="text-black-normal text-sm font-semibold">
            이메일
          </label>
          <TextInput
            name="email"
            placeholder="이메일을 입력해 주세요"
            fullWidth
            value={formData.email}
            onChange={handleChange}
            className="bg-gray-light text-foreground"
          />
          {errors.email && (
            <p className="text-sm text-red-500">{errors.email}</p>
          )}
        </div>

        <div className="flex w-full flex-col gap-1">
          <label className="text-black-normal text-sm font-semibold">
            비밀번호
          </label>
          <TextInput
            name="password"
            type="password"
            placeholder="비밀번호는 영문, 숫자, 특수문자 포함입니다."
            fullWidth
            value={formData.password}
            onChange={handleChange}
            className="bg-gray-light text-foreground"
          />
          {errors.password && (
            <p className="text-sm text-red-500">{errors.password}</p>
          )}
        </div>

        <div className="flex w-full flex-col gap-1">
          <label className="text-black-normal text-sm font-semibold">
            비밀번호 확인
          </label>
          <TextInput
            name="confirmPassword"
            type="password"
            placeholder="비밀번호를 다시 입력해 주세요"
            fullWidth
            value={formData.confirmPassword}
            onChange={handleChange}
            className="bg-gray-light text-foreground"
          />
          {errors.confirmPassword && (
            <p className="text-sm text-red-500">{errors.confirmPassword}</p>
          )}
        </div>

        <div className="flex items-center justify-center gap-2">
          <label htmlFor="agree" className="text-black-normal text-sm">
            개인정보 처리 및 수집 동의
          </label>
          <SimpleCheckbox
            id="agree"
            name="agreed"
            checked={formData.agreed}
            onChange={handleChange}
          />
        </div>

        <Button color="black" size="lg" fullWidth type="submit">
          확인
        </Button>

        <div className="mt-2 flex justify-center">
          <span
            className="text-black-alternative cursor-pointer text-sm hover:underline"
            onClick={() => router.push('/login')}
          >
            로그인으로 돌아가기
          </span>
        </div>
      </form>
    </div>
  );
}
