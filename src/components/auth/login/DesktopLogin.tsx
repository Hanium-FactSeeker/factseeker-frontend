'use client'
import React from 'react'
import LoginForm from './LoginForm'

export default function DesktopLogin() {
  return (
    <div className="flex items-center justify-center min-h-screen bg-[var(--background)]">
      <div className="w-full max-w-md p-8 bg-[var(--white)] rounded-xl shadow-lg">
        <LoginForm />
      </div>
    </div>
  )
}
