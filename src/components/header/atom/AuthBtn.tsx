import React from 'react';
import Link from 'next/link';

interface AuthProps {
  textColor: string;
}

const AuthText: React.FC<AuthProps> = ({ textColor = 'white' }) => {
  const colorClass = textColor === 'white' ? 'text-white' : 'text-black-normal';

  return (
    <div
      className={`mr-8 flex justify-end gap-2 text-xs ${colorClass} md:text-xl`}
    >
      <Link href="/login" className="cursor-pointer">
        로그인
      </Link>

      <p>|</p>
      <Link href="/signup" className="cursor-pointer">
        회원가입
      </Link>
    </div>
  );
};

export default AuthText;
