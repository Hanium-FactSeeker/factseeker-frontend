import React from 'react';
import Nav from '@/components/header/atom/Nav';

interface NavItem {
  label: string;
  href?: string;
  onClick?: () => void;
}

interface NavBarProps {
  items: NavItem[];
  isLoggedIn: boolean;
  textColor?: 'white' | 'black';
  onOpenUrlModal?: () => void;
  className?: string;
}

const NavBar: React.FC<NavBarProps> = ({
  items,
  isLoggedIn,
  textColor = 'white',
  onOpenUrlModal,
  className,
}) => {
  return (
    <nav
      className={`z-30 mt-4 flex w-full gap-3 text-xs md:gap-10 md:text-xl ${className}`}
    >
      {items.map((item) =>
        item.href ? (
          <Nav key={item.label} href={item.href} textColor={textColor}>
            {item.label}
          </Nav>
        ) : (
          <button
            key={item.label}
            onClick={item.onClick}
            className={`hover:text-primary-normal cursor-pointer text-xs font-semibold md:text-xl ${
              textColor === 'white'
                ? 'text-white'
                : textColor === 'black'
                  ? 'text-black-normal'
                  : ''
            }`}
          >
            {item.label}
          </button>
        ),
      )}
    </nav>
  );
};

export default NavBar;
