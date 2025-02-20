import React from 'react';
import SmallButton from './templates/SmallButton'; // Import the SmallButton component

const exportee: React.FC = () => {
  return (
    <SmallButton id="settings-button" svg="settings">Settings
    </SmallButton>
  );
};

export default exportee;
