import React from 'react';
import Link from 'next/link';

interface NavLinkProps {
  href: string;
  children: React.ReactNode;
  className?: string;
  textColor?: string;
}

const Nav: React.FC<NavLinkProps> = ({
  href,
  children,
  className,
  textColor,
}) => {
  const colorClass =
    textColor === 'white'
      ? 'text-white'
      : textColor === 'black'
        ? 'text-black-normal'
        : '';
  return (
    <Link
      href={href}
      className={`hover:text-primary-normal font-semibold ${colorClass} md:text-xl ${className ?? ''}`}
    >
      {children}
    </Link>
  );
};

export default Nav;
