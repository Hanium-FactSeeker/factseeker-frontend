'use client';
import React from 'react';
import SignUpForm from './SignUpForm';

export default function SignUp() {
  return (
    <div className="bg-background text-foreground flex min-h-screen items-center justify-center px-4 md:px-0">
      <div className="w-full max-w-xs rounded-lg bg-white p-6 shadow md:max-w-md md:rounded-xl md:p-8">
        <SignUpForm />
      </div>
    </div>
  );
}
