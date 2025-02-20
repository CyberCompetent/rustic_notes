import React from 'react';
import SmallButton from './templates/SmallButton'; // Import the SmallButton component

const exportee: React.FC = () => {
  return (
    <SmallButton id="sort-button" svg="swap_vert">Sort
    </SmallButton>
  );
};

export default exportee;
