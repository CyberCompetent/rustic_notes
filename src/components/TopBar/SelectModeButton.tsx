import React from 'react';
import SmallButton from '../templates/Button'

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
      className='btn join-item rounded-none'
    >
      Select Mode
    </SmallButton>
  );
};

export default SelectModeButton;
