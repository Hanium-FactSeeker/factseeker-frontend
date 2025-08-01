import React from 'react';
import { Button } from './index';
import { ButtonProps } from './types';

const NaverIcon = () => (
  <svg
    width="40"
    height="36"
    viewBox="0 0 24 24"
    aria-hidden="true"
    focusable="false"
  >
    <rect width="24" height="24" rx="6" fill="#03C75A" />
    <path d="M7 7h3.58l3.4 5.45V7H17v10h-3.41l-3.57-5.75V17H7V7z" fill="#fff" />
  </svg>
);

export const NaverLoginButton = (
  props: Omit<ButtonProps, 'color' | 'variant' | 'iconLeft' | 'children'>,
) => (
  <Button color="naver" size="lg" fullWidth iconLeft={<NaverIcon />} {...props}>
    네이버 로그인
  </Button>
);
