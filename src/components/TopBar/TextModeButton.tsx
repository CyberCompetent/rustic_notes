import React from 'react';
import SmallButton from '../templates/Button'

interface ButtonProps {
  isActive: boolean;
  onClick: () => void;
}

const TextModeButton: React.FC<ButtonProps> = ({ isActive, onClick }) => {
  return (
    <SmallButton
      id="select-mode-button"
      svg="text_fields"
      onClick={onClick}
      isActive={isActive} // Pass isActive to SmallButton
      className='btn join-item rounded-none'
    >
      Text Mode
    </SmallButton>
  );
};

export default TextModeButton;

