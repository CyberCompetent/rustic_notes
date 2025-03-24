import React, { useState } from 'react';
import SmallButton from '@/components/templates/Button';
import SettingsMenu from '@/components/SideBar/SettingsMenu.tsx';

const SettingsButton: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className='w-full'>
      <SmallButton
        id="settings-button"
        svg="settings"
        onClick={() => setIsOpen(!isOpen)}
        className='w-full'
      >
        Settings
      </SmallButton>

      {isOpen && <SettingsMenu InitialSection ="Account" closeMenu={() => setIsOpen(false)} />} {/* Calling SettingsMenu component as long as isOpen is true, also passing the initial page which will be displayed and a function to set isOpen to false when a button inside of settings menu is clicked */}
    </div>
  );
};

export default SettingsButton;
