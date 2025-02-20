import React from 'react';
import SmallButton from './templates/SmallButton'; // Import the SmallButton component

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
    >
      Draw Mode
    </SmallButton>
  );
};

export default DrawModeButton;
