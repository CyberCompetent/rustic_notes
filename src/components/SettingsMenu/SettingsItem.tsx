import React from 'react';
import SmallButton from '../templates/Button';

interface SettingsItemProps {
  id: string;
  svg: string;
  onClick: () => void;
  isActive: boolean; // New prop for active state
  children: React.ReactNode;
  className?: string; // Optional className for custom styling
}

const SettingsItem: React.FC<SettingsItemProps> = ({ id, svg, onClick, isActive, children, className }) => {
  return (
    <SmallButton
      id={id}
      svg={svg}
      onClick={onClick}
      isActive={isActive} // Pass the active state to SmallButton
      hover={true}
      className={`w-full text-left ${className} ${isActive ? 'bg-gray-800' : ''}`} // Apply active styling
    >
      {children}
    </SmallButton>
  );
};

export default SettingsItem;
