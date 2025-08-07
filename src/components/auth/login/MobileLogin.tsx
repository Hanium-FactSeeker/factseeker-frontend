'use client'
import React from 'react'
import LoginForm from './LoginForm'

export default function MobileLogin() {
  return (
    <div className="flex items-center justify-center min-h-screen px-4 bg-[var(--background)]">
      <div className="w-full max-w-xs p-6 bg-[var(--white)] rounded-lg shadow">
        <LoginForm />
      </div>
    </div>
  )
}
