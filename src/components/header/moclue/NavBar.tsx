import React from 'react';
import Nav from '@/components/header/atom/Nav';
const navItems = [
  { label: '인기영상', href: '/videos' },
  { label: 'SNS 분석', href: '/sns' },
  { label: '인물분석', href: '/politician' },
  { label: 'MY 히스토리', href: '/my-history' },
];

interface NavBarProps {
  isLoggedIn: boolean;
  textColor?: 'white' | 'black';
}

const NavBar: React.FC<NavBarProps> = ({ isLoggedIn, textColor = 'white' }) => {
  return (
    <nav className="mt-4 flex w-full justify-evenly text-center text-xs">
      {navItems.map((item) => (
        <Nav key={item.label} href={item.href} textColor={textColor}>
          {item.label}
        </Nav>
      ))}
    </nav>
  );
};

export default NavBar;
