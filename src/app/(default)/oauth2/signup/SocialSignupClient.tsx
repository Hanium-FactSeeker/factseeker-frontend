'use client';

import { useEffect, useMemo, useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import toast from 'react-hot-toast';
import TextInput from '@/components/ui/button/TextInput';
import { Button } from '@/components/ui/button';
import { ageOptions } from '@/constants/age';
import { genderOptions } from '@/constants/gender';
import { ageMapping } from '@/utils/ageMapping';

type FormData = {
  nickname: string;
  gender: string;
  ageRange: string; // '10' | '20' | '30' | '40' | '50' | '60+'
  phone: string; // 010-0000-0000 표기
  agreed: boolean;
};

type VerifyRes = { name?: string; age?: string; age_range?: string };
type CompleteRes = { accessToken: string; refreshToken: string };

const API_BASE = process.env.NEXT_PUBLIC_API_BASE_URL as string;

export default function SocialSignupClient() {
  const router = useRouter();
  const sp = useSearchParams();
  const token = useMemo(() => sp.get('token') ?? '', [sp]);

  const [errors, setErrors] = useState<Partial<Record<keyof FormData, string>>>({});
  const [loading, setLoading] = useState(true);
  const [formData, setFormData] = useState<FormData>({
    nickname: '',
    gender: '',
    ageRange: '',
    phone: '',
    agreed: false,
  });

  const formatPhone = (raw: string) => {
    const d = raw.replace(/\D/g, '').slice(0, 11);
    if (d.length > 7) return `${d.slice(0, 3)}-${d.slice(3, 7)}-${d.slice(7)}`;
    if (d.length > 3) return `${d.slice(0, 3)}-${d.slice(3)}`;
    return d;
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target;
    if (name === 'phone') {
      setFormData((prev) => ({ ...prev, phone: formatPhone(value) }));
    } else {
      setFormData((prev) => ({ ...prev, [name]: type === 'checkbox' ? checked : value }));
    }
    setErrors((prev) => ({ ...prev, [name]: '' }));
  };

  useEffect(() => {
    if (!token) {
      toast.error('토큰이 없습니다.');
      router.replace('/login');
      return;
    }

    let mounted = true;

    (async () => {
      try {
        const res = await fetch(
          `${API_BASE}/api/auth/social/verify?token=${encodeURIComponent(token)}`,
        );
        if (!res.ok) throw new Error('소셜 검증 실패');
        const data: VerifyRes = await res.json();

        if (!mounted) return;
        setFormData((prev) => ({
          ...prev,
          nickname: data.name ?? prev.nickname,
          ageRange: ageMapping(data.age || data.age_range) || prev.ageRange,
        }));

        // 이미 가입된 유저면 폼 없이 바로 완료 시도
        const tryComplete = await fetch(`${API_BASE}/api/social/complete`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ tempToken: token }),
        });

        if (tryComplete.ok) {
          const tokens: CompleteRes = await tryComplete.json();
          localStorage.setItem('accessToken', tokens.accessToken);
          localStorage.setItem('refreshToken', tokens.refreshToken);
          toast.success('로그인에 성공했습니다.');
          router.replace('/');
          return;
        }
      } catch (error: unknown) {
        if (error instanceof Error) toast.error(error.message);
        else if (typeof error === 'string') toast.error(error);
        else toast.error('예기치 못한 오류가 발생했습니다.');
        router.replace('/login');
        return;
      } finally {
        if (mounted) setLoading(false);
      }
    })();

    return () => {
      mounted = false;
    };
  }, [token, router]);

  const validate = () => {
    const errs: Partial<Record<keyof FormData, string>> = {};
    const phoneDigits = formData.phone.replace(/\D/g, '');

    if (!formData.nickname.trim()) errs.nickname = '닉네임을 입력해 주세요.';
    if (phoneDigits.length !== 11) errs.phone = '전화번호 형식이 올바르지 않습니다.';
    if (!formData.gender) errs.gender = '성별을 선택해 주세요.';
    if (!formData.ageRange) errs.ageRange = '나이를 선택해 주세요.';
    if (!formData.agreed) errs.agreed = '개인정보 처리 및 수집에 동의해 주세요.';

    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const onComplete = async () => {
    if (!validate()) return;

    try {
      const res = await fetch(`${API_BASE}/api/social/complete`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          tempToken: token,
          fullname: formData.nickname,
          gender: formData.gender || '',
          ageRange: formData.ageRange,
          phone: formData.phone.replace(/\D/g, ''),
        }),
      });

      if (!res.ok) throw new Error('가입 완료 실패');

      const data: CompleteRes = await res.json();
      localStorage.setItem('accessToken', data.accessToken);
      localStorage.setItem('refreshToken', data.refreshToken);
      toast.success('소셜 회원가입이 완료되었습니다.');
      router.replace('/');
    } catch (error: unknown) {
      if (error instanceof Error) toast.error(error.message);
      else if (typeof error === 'string') toast.error(error);
      else toast.error('처리 중 알 수 없는 오류가 발생했습니다.');
    }
  };

  if (loading) return <div className="p-6">검증 중...</div>;

  return (
    <div className="mx-auto max-w-md space-y-8 p-10">
      <h2 className="text-center text-xl font-bold">회원가입</h2>
      <p className="mb-6 text-center text-sm">추가 정보를 입력해 주세요</p>

      <div className="flex w-full flex-col gap-1">
        <label className="text-black-normal mb-1 ml-2 text-sm font-semibold">닉네임</label>
        <TextInput
          name="nickname"
          placeholder="닉네임을 입력해 주세요"
          fullWidth
          value={formData.nickname}
          onChange={handleChange}
          className="bg-gray-light text-foreground"
        />
        {errors.nickname && <p className="ml-4 text-sm text-red-500">{errors.nickname}</p>}
      </div>

      <div className="flex w-full flex-col gap-1">
        <label className="text-black-normal mb-1 ml-2 text-sm font-semibold">전화번호</label>
        <TextInput
          name="phone"
          placeholder="010-0000-0000"
          fullWidth
          value={formData.phone}
          onChange={handleChange}
          className="bg-gray-light text-foreground"
        />
        {errors.phone && <p className="ml-4 text-sm text-red-500">{errors.phone}</p>}
      </div>

      <div className="flex w-full flex-col gap-1">
        <label className="text-black-normal mb-1 ml-2 text-sm font-semibold">성별</label>
        <span className="flex justify-evenly border-t-2 border-gray-300 pt-4">
          {genderOptions.map((g) => (
            <Button
              type="button"
              key={g.value}
              color={formData.gender === g.value ? 'purple' : 'gray'}
              onClick={() => {
                setFormData((prev) => ({ ...prev, gender: g.value }));
                setErrors((prev) => ({ ...prev, gender: '' }));
              }}
            >
              {g.label}
            </Button>
          ))}
        </span>
        {errors.gender && <p className="ml-4 text-sm text-red-500">{errors.gender}</p>}
      </div>

      <div className="flex w-full flex-col gap-1">
        <label className="text-black-normal mb-1 ml-2 text-sm font-semibold">나이</label>
        <span className="grid grid-cols-3 gap-4 border-t-2 border-gray-300 p-4">
          {ageOptions.map((a) => (
            <Button
              type="button"
              size="md"
              key={a.value}
              color={formData.ageRange === a.value ? 'purple' : 'gray'}
              onClick={() => {
                setFormData((prev) => ({ ...prev, ageRange: a.value }));
                setErrors((prev) => ({ ...prev, ageRange: '' }));
              }}
            >
              {a.label}
            </Button>
          ))}
        </span>
        {errors.ageRange && <p className="ml-4 text-sm text-red-500">{errors.ageRange}</p>}
      </div>

      <div className="flex items-center justify-center gap-2">
        <label htmlFor="agree" className="text-black-normal text-sm">
          개인정보 처리 및 수집 동의
        </label>
        <input
          id="agree"
          name="agreed"
          type="checkbox"
          checked={formData.agreed}
          onChange={handleChange}
          className="text-primary-normal bg-gray-light border-gray-normal focus:ring-primary-normal h-4 w-4 rounded focus:ring-2"
        />
        {errors.agreed && <p className="ml-4 text-sm text-red-500">{errors.agreed}</p>}
      </div>

      <Button fullWidth size="lg" color="black" onClick={onComplete}>
        확인
      </Button>
    </div>
  );
}
