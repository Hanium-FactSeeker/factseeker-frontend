'use client';

import { useEffect, useState } from 'react';

export default function ClientTime({
  format = (d: Date) =>
    `${d.getFullYear()}년 ${String(d.getMonth() + 1).padStart(2, '0')}월 ${String(d.getDate()).padStart(2, '0')}일 기준 ${String(d.getHours()).padStart(2, '0')}:${String(d.getMinutes()).padStart(2, '0')}`,
  className = '',
}: {
  format?: (d: Date) => string;
  className?: string;
}) {
  const [txt, setTxt] = useState<string>('');
  useEffect(() => setTxt(format(new Date())), [format]);
  return (
    <span className={className} suppressHydrationWarning>
      {txt}
    </span>
  );
}
