'use client';
import React from 'react';
import clsx from 'clsx';

type ModalBaseProps = {
  open: boolean;
  onClose?: () => void;
  children: React.ReactNode;
  className?: string;
};

export default function ModalBase({ open, onClose, children, className }: ModalBaseProps) {
  if (!open) return null;

  return (
    <div
      role="dialog"
      aria-modal="true"
      className="fixed inset-0 z-[1000] flex items-center justify-center bg-black/50 px-4 md:px-0"
      onClick={onClose}
    >
      <div
        className={clsx(
          'relative w-full max-w-xs rounded-xl bg-white p-6 shadow md:max-w-md md:rounded-2xl md:p-8',
          className,
        )}
        onClick={(e) => e.stopPropagation()}
      >
        <button
          type="button"
          aria-label="닫기"
          className="text-black-alternative absolute top-4 right-4 hover:opacity-70"
          onClick={onClose}
        >
          ✕
        </button>
        {children}
      </div>
    </div>
  );
}
