import React from 'react';
import SmallButton from '../templates/SmallButton'

interface ButtonProps {
  isActive: boolean;
  onClick: () => void;
}

const SelectModeButton: React.FC<ButtonProps> = ({ isActive, onClick }) => {
  return (
    <SmallButton
      id="select-mode-button"
      svg="select_all"
      onClick={onClick}
      isActive={isActive} // Pass isActive to SmallButton
    >
      Select Mode
    </SmallButton>
  );
};

export default SelectModeButton;
