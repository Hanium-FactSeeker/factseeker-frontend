import React from 'react';
import LogoStar from './LogoStar';
import GptIcon from './GptIcon';
import ClaudeIcon from './ClaudeIcon';
import { IconProps } from '@/types/logo';

const Icon = ({ name, className = '' }: IconProps) => {
  switch (name) {
    case 'GPT':
      return <GptIcon className={className} />;
    case 'Gemini':
      return <ClaudeIcon className={className} />;
    case '전체':
      return <LogoStar className={className} />;
    default:
      return null;
  }
};

export default Icon;
