// SettingsItem.tsx
import React from 'react';
import SmallButton from '../templates/SmallButton';

interface SettingsItemProps {
  id: string;
  svg: string;
  onClick: () => void;
  children: React.ReactNode;
}

const SettingsItem: React.FC<SettingsItemProps> = ({ id, svg, onClick, children }) => {
  return (
    <SmallButton
      svg={svg}
      id={id}
      onClick={onClick}
      isActive={false} // You can modify this as needed based on your requirements
      hover={true} // Always set to true
      className="w-full text-left" // Ensures full width for list items
    >
      {children}
    </SmallButton>
  );
};

export default SettingsItem;
