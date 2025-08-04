import React from 'react';
import { FaUserCircle } from 'react-icons/fa';

interface ProfileButtonProps {
  label: string;
  textColor?: string;
}

const ProfileButton: React.FC<ProfileButtonProps> = ({
  label = '프로필',
  textColor = 'white',
}) => {
  const colorClass = textColor === 'white' ? 'text-white' : 'text-black-normal';

  return (
    <div
      className={`flex cursor-pointer items-center justify-end gap-4 text-white md:text-xl ${colorClass}`}
    >
      <FaUserCircle />
      {label}
    </div>
  );
};

export default ProfileButton;
