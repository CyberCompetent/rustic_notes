import React from 'react';
import SmallButton from '@/components/templates/Button';
import { useSettings } from '@/context/SettingsContext'; // Adjust the path based on your file structure

const SettingsButton: React.FC = () => {
  const { openSettings } = useSettings();

  return (
    <div className='w-full'>
      <SmallButton
        id="settings-button"
        svg="settings"
        onClick={() => openSettings("Account")}
        className='w-full'
      >
        Settings
      </SmallButton>

    </div>
  );
};

export default SettingsButton;
