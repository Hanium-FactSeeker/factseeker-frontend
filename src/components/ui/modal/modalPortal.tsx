'use client';

import { useEffect, useState } from 'react';
import { createPortal } from 'react-dom';

type Props = { children: React.ReactNode };

export default function ModalPortal({ children }: Props) {
  const [el, setEl] = useState<HTMLElement | null>(null);
  useEffect(() => {
    setEl(document.getElementById('modal'));
  }, []);

  if (!el) return null;
  return createPortal(children, el);
}
