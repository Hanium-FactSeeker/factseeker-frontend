import React from 'react';
import Nav from '@/components/header/atom/Nav';

interface NavItem {
  label: string;
  href?: string;
  onClick?: () => void;
}

interface NavBarProps {
  isLoggedIn: boolean;
  textColor?: 'white' | 'black';
  onOpenUrlModal?: () => void;
}

const NavBar: React.FC<NavBarProps> = ({
  isLoggedIn,
  textColor = 'white',
  onOpenUrlModal,
}) => {
  const navItems: NavItem[] = [
    { label: 'URL 검색하기', onClick: onOpenUrlModal },
    { label: '인기영상', href: '/videos' },
    { label: 'SNS 분석', href: '/sns' },
    { label: '인물분석', href: '/politician' },
    { label: 'MY 히스토리', href: '/my-history' },
  ];

  return (
    <nav
      className="
        mt-4 flex w-full 
        justify-center gap-3 text-xs
        md:justify-start md:gap-10 md:text-xl
      "
    >
      {navItems.map((item) =>
        item.href ? (
          <Nav key={item.label} href={item.href} textColor={textColor}>
            {item.label}
          </Nav>
        ) : (
          <button
            key={item.label}
            onClick={item.onClick}
            className={`font-semibold text-xs md:text-xl hover:text-primary-normal cursor-pointer ${
              textColor === 'white'
                ? 'text-white'
                : textColor === 'black'
                ? 'text-black-normal'
                : ''
            }`}
          >
            {item.label}
          </button>
        )
      )}
    </nav>
  );
};

export default NavBar;
