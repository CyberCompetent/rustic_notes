import React from 'react';
import SmallButton from '../templates/Button'

interface ButtonProps {
  isActive: boolean;
  onClick: () => void;
}

const DrawModeButton: React.FC<ButtonProps> = ({ isActive, onClick }) => {
  return (
    <SmallButton
      id="select-mode-button"
      svg="draw"
      onClick={onClick}
      isActive={isActive} // Pass isActive to SmallButton
      className='btn join-item rounded-none'
    >
      Draw Mode
    </SmallButton>
  );
};

export default DrawModeButton;
