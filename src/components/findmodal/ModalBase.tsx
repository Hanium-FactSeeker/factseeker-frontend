'use client'
import React from 'react'
import clsx from 'clsx'

type ModalBaseProps = {
  open: boolean
  onClose?: () => void
  children: React.ReactNode
  className?: string
}

export default function ModalBase({ open, onClose, children, className }: ModalBaseProps) {
  if (!open) return null

  return (
    <div
      role="dialog"
      aria-modal="true"
      className="fixed inset-0 z-[1000] flex items-center justify-center bg-black/50 px-4 md:px-0"
      onClick={onClose}
    >
      <div
        className={clsx(
          'relative w-full max-w-xs md:max-w-md bg-white rounded-xl md:rounded-2xl shadow p-6 md:p-8',
          className
        )}
        onClick={(e) => e.stopPropagation()}
      >
        <button
          type="button"
          aria-label="닫기"
          className="absolute right-4 top-4 text-black-alternative hover:opacity-70"
          onClick={onClose}
        >
          ✕
        </button>
        {children}
      </div>
    </div>
  )
}
