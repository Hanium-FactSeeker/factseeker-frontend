import React from 'react';
import LogoStar from './LogoStar';
import GptIcon from './GptIcon';
import ClaudeIcon from './ClaudeIcon';
import { IconProps } from '@/types/logo';

const Icon = ({ name, className = '' }: IconProps) => {
  switch (name) {
    case '팩씨':
      return <LogoStar className={className} />;
    case 'GPT':
      return <GptIcon className={className} />;
    case 'Claude':
      return <ClaudeIcon className={className} />;
    default:
      return null;
  }
};

export default Icon;
