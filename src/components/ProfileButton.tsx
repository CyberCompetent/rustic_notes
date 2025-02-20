import React from 'react';
import SmallButton from './templates/SmallButton';

interface ButtonProps {
  isActive: boolean;
  onClick: () => void;
}

const SelectModeButton: React.FC<ButtonProps> = ({ isActive, onClick }) => {
  return (
    <SmallButton
      id="select-mode-button"
      svg="account_circle"
      onClick={onClick}
      isActive={isActive} // Pass isActive to SmallButton
      buttons="plus option"
      hover={false}
    >
      Username
    </SmallButton>
  );
};

export default SelectModeButton;
