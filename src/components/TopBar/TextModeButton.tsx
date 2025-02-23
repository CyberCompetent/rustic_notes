import React from 'react';
import SmallButton from '../templates/SmallButton'

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
      className='btn join-item'
    >
      Text Mode
    </SmallButton>
  );
};

export default TextModeButton;

