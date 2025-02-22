import React, { useState } from 'react';
import SmallButton from './templates/SmallButton';

const ProfileButton: React.FC = () => {
  const [isActive, setIsActive] = useState(false);

  const handleClick = () => {
    setIsActive(!isActive);
    console.log("Profile button clicked:", isActive);
  };

  return (
    <SmallButton
      id="select-mode-button"
      svg="account_circle"
      onClick={handleClick}
      isActive={isActive}
      buttons="plus option"
      hover={true}
    >
      Username
    </SmallButton>
  );
};

export default ProfileButton;
