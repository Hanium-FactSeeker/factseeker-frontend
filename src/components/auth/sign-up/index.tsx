'use client';

import React from 'react';
import SignUpForm from './SignUpForm';

export default function SignUp() {
  return (
    <div className="text-foreground mx-auto my-20 flex w-full max-w-xs items-center justify-center rounded-lg bg-white px-4 md:my-4 md:max-w-md md:rounded-xl md:p-8 md:px-0">
      <SignUpForm />
    </div>
  );
}
