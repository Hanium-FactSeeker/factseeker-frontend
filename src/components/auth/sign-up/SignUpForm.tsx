'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import TextInput from '@/components/ui/button/TextInput';
import { Button } from '@/components/ui/button';
import { signUpUser } from '@/apis/auth/sign-up';
import { checkEmailDuplicate } from '@/apis/auth/check-email';
import { checkIdDuplicate } from '@/apis/auth/check-id';
import toast from 'react-hot-toast';

type FormData = {
  id: string;
  password: string;
  confirmPassword: string;
  nickname: string;
  email: string;
  phone: string;
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
    id: '',
    password: '',
    confirmPassword: '',
    nickname: '',
    email: '',
    phone: '',
    agreed: false,
  });

  const [errors, setErrors] = useState<Partial<Record<keyof FormData, string>>>(
    {},
  );

  const [emailChecked, setEmailChecked] = useState(false);
  const [idChecked, setIdChecked] = useState(false);

  const validate = () => {
    const errs: Partial<Record<keyof FormData, string>> = {};

    if (!formData.id.trim()) {
      errs.id = '아이디를 입력해 주세요.';
    }

    const phoneDigits = formData.phone.replace(/\D/g, '');
    if (phoneDigits.length !== 11) {
      errs.phone = '전화번호 형식이 올바르지 않습니다.';
    }

    if (!formData.email.includes('@') || !formData.email.includes('.')) {
      errs.email = '이메일 형식이 올바르지 않습니다.';
    }

    if (!formData.nickname.trim()) {
      errs.nickname = '닉네임을 입력해 주세요.';
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

  const formatPhone = (raw: string) => {
    let digits = raw.replace(/\D/g, '').slice(0, 11);
    if (digits.length > 7) {
      return `${digits.slice(0, 3)}-${digits.slice(3, 7)}-${digits.slice(7)}`;
    }
    if (digits.length > 3) {
      return `${digits.slice(0, 3)}-${digits.slice(3)}`;
    }
    return digits;
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target;

    if (name === 'phone') {
      setFormData((prev) => ({ ...prev, phone: formatPhone(value) }));
    } else {
      setFormData((prev) => ({
        ...prev,
        [name]: type === 'checkbox' ? checked : value,
      }));
    }

    if (name === 'email') setEmailChecked(false);
    if (name === 'id') setIdChecked(false);
    setErrors((prev) => ({
      ...prev,
      [name]: '',
    }));
  };
  // 이메일 중복 체크
  const handleEmailCheck = async () => {
    if (!formData.email) {
      toast.error('이메일을 입력해 주세요.');
      return;
    }
    try {
      const res = await checkEmailDuplicate(formData.email);
      if (!res.data) {
        toast.error(res.message);
      } else {
        toast.success(res.message);
        setEmailChecked(true);
      }
    } catch {
      toast.error('이메일 중복 확인 중 오류가 발생했습니다.');
    }
  };

  // 아이디 중복 체크
  const handleIdCheck = async () => {
    if (!formData.id.trim()) {
      toast.error('아이디를 입력해 주세요.');
      return;
    }
    try {
      const res = await checkIdDuplicate(formData.id.trim());
      if (!res.data) {
        toast.error(res.message);
      } else {
        toast.success(res.message);
        setIdChecked(true);
      }
    } catch {
      toast.error('아이디 중복 확인 중 오류가 발생했습니다.');
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const ok = validate();
    if (!ok) return;

    if (!idChecked) {
      toast.error('아이디 중복 체크를 완료해 주세요.');
      return;
    }
    if (!emailChecked) {
      toast.error('이메일 중복 체크를 완료해 주세요.');
      return;
    }
    if (!formData.agreed) {
      toast.error('개인정보 이용 약관에 동의해 주세요');
      return;
    }

    try {
      const res = await signUpUser({
        loginId: formData.id,
        password: formData.password,
        fullname: formData.nickname,
        phone: formData.phone.replace(/[\s-]/g, ''),
        email: formData.email,
      });

      if (res?.success) {
        toast.success('회원가입에 성공했습니다.');
        router.push('/login');
      } else {
        toast.error(res?.message ?? '회원가입에 실패했습니다.');
      }
    } catch {
      toast.error('서버 오류가 발생했습니다. 다시 시도해 주세요.');
    }
  };

  return (
    <div className="w-full">
      <h2 className="text-black-normal mb-6 text-center text-xl font-bold">
        회원가입
      </h2>

      <form
        onSubmit={handleSubmit}
        className="mt-10 flex w-full flex-col items-center gap-8"
      >
        <div className="flex w-full flex-col gap-1">
          <label className="text-black-normal mb-1 ml-2 text-sm font-semibold">
            아이디
          </label>
          <div className="flex gap-4">
            <TextInput
              name="id"
              placeholder="아이디를 입력해 주세요"
              value={formData.id}
              onChange={handleChange}
              className="bg-gray-light text-foreground"
            />
            <Button
              color="purple"
              size="sm"
              onClick={handleIdCheck}
              disabled={idChecked}
            >
              {idChecked ? '완료' : '중복체크'}
            </Button>
          </div>
          {errors.id && (
            <p className="ml-4 text-sm text-red-500">{errors.id}</p>
          )}
        </div>

        <div className="flex w-full flex-col gap-1">
          <label className="text-black-normal mb-1 ml-2 text-sm font-semibold">
            비밀번호
          </label>
          <TextInput
            name="password"
            type="password"
            placeholder="비밀번호는 8자 이상, 영문, 숫자, 특수문자를 포함해야 합니다."
            fullWidth
            value={formData.password}
            onChange={handleChange}
            className="bg-gray-light text-foreground"
          />
          {errors.password && (
            <p className="ml-4 text-sm text-red-500">{errors.password}</p>
          )}
        </div>

        <div className="flex w-full flex-col gap-1">
          <label className="text-black-normal mb-1 ml-2 text-sm font-semibold">
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
            <p className="ml-4 text-sm text-red-500">
              {errors.confirmPassword}
            </p>
          )}
        </div>

        <div className="flex w-full flex-col gap-1">
          <label className="text-black-normal mb-1 ml-2 text-sm font-semibold">
            닉네임
          </label>
          <TextInput
            name="nickname"
            placeholder="닉네임을 입력해 주세요"
            fullWidth
            value={formData.nickname}
            onChange={handleChange}
            className="bg-gray-light text-foreground"
          />
          {errors.email && (
            <p className="ml-4 text-sm text-red-500">{errors.nickname}</p>
          )}
        </div>

        <div className="flex w-full flex-col gap-1">
          <label className="text-black-normal mb-1 ml-2 text-sm font-semibold">
            이메일
          </label>
          <div className="flex gap-4">
            <TextInput
              name="email"
              placeholder="이메일을 입력해 주세요"
              value={formData.email}
              onChange={handleChange}
              className="bg-gray-light text-foreground"
            />
            <Button
              color="purple"
              size="sm"
              onClick={handleEmailCheck}
              disabled={emailChecked}
            >
              {emailChecked ? '완료' : '중복체크'}
            </Button>
          </div>
          {errors.email && (
            <p className="ml-4 text-sm text-red-500">{errors.email}</p>
          )}
        </div>

        <div className="flex w-full flex-col gap-1">
          <label className="text-black-normal mb-1 ml-2 text-sm font-semibold">
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
            <p className="ml-4 text-sm text-red-500">{errors.phone}</p>
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
