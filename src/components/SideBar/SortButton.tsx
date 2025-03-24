import React, { useState } from 'react';
import Dropdown from '../templates/Dropdown-select';

const SortButton: React.FC = () => {
  const [selectedOption, setSelectedOption] = useState('Manual'); // Track the selected option
  const options = ['Manual', 'a-z', 'z-a', 'Date Created', 'Last Modified']; // Sort options

  const handleSortChange = (option: string) => {
    console.log(`Selected sort: ${option}`);
    setSelectedOption(option); // Update selected option
  };

  // Control how the text is displayed before passing to Dropdown
  const buttonText = selectedOption === 'Manual' ? 'Sort' : `Sort By: ${selectedOption}`;

  return (
    <Dropdown
      id="sort-button"
      options={options}
      defaultOption={selectedOption} // Initial value
      selectedOption={buttonText} // Pass formatted text
      svg="swap_vert"
      onSelect={handleSortChange}

    ></Dropdown>
  );
};

export default SortButton;
