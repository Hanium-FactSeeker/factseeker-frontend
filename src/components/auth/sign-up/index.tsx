'use client'
import React from 'react'
import SignUpForm from './SignUpForm'

export default function SignUp() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-background text-foreground px-4 md:px-0">
      <div className="w-full max-w-xs md:max-w-md p-6 md:p-8 bg-white rounded-lg md:rounded-xl shadow">
        <SignUpForm />
      </div>
    </div>
  )
}