import React from 'react';
import { Button } from './index';
import { ButtonProps } from './types';

const KakaoIcon = () => (
  <svg
    width="40"
    height="36"
    viewBox="0 0 24 24"
    aria-hidden="true"
    focusable="false"
  >
    <path
      d="M12 6.5C8.42 6.5 5.5 8.7 5.5 11.29c0 1.29 0.82 2.43 2.15 3.23-.09.37-.57 2.27-.6 2.42 0 0-.01.11.06.15.08.05.17.01.17.01.22-.03 2.54-1.67 2.91-1.91.26.03.53.05.81.05 3.58 0 6.5-2.2 6.5-4.79S15.58 6.5 12 6.5z"
      fill="#391B1B"
    />
  </svg>
);

export const KakaoLoginButton = (
  props: Omit<ButtonProps, 'color' | 'variant' | 'iconLeft' | 'children'>,
) => (
  <Button color="kakao" size="lg" fullWidth iconLeft={<KakaoIcon />} {...props}>
    카카오 로그인
  </Button>
);
