import React, { useState, useRef, useEffect } from 'react';
import SmallButton from './templates/SmallButton';

const SortButton: React.FC = () => {
  const [isActive, setIsActive] = useState(false);
  const [selectedOption, setSelectedOption] = useState('Manual'); // Track the selected option
  const options = ['Manual', 'a-z', 'z-a', 'Date Created', 'Last Modified']; // Sort options
  const dropdownRef = useRef<HTMLDivElement | null>(null); // Create a ref for the dropdown
  const buttonRef = useRef<HTMLDivElement | null>(null); // Create a ref for the parent div

  const handleClick = () => {
    setIsActive(!isActive);
  };

  const handleSelect = (option: string) => {
    console.log(`Selected sort: ${option}`);
    setSelectedOption(option); // Update selected option
    setIsActive(false); // Close dropdown after selection
  };

  // Close dropdown if clicked outside the top div
  const handleClickOutside = (event: MouseEvent) => {
    if (
      buttonRef.current && 
      !buttonRef.current.contains(event.target as Node) // Check if click is outside the parent div
    ) {
      setIsActive(false);
    }
  };

  useEffect(() => {
    // Add event listener
    document.addEventListener('mousedown', handleClickOutside);

    // Cleanup event listener on component unmount
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  // Determine the text to display in the button
  const buttonText =
    selectedOption === 'Manual' ? 'Sort' : `Sort By: ${selectedOption}`;

  return (
    <div className="relative w-full" ref={buttonRef}> {/* Attach ref to parent div */}
      {/* SmallButton as Dropdown Toggle */}
      <SmallButton
        id="sort-button"
        svg="swap_vert"
        onClick={handleClick}
        isActive={isActive}
        hover={true}
        className="w-full"
      >
        {buttonText} {/* Use buttonText for display */}
      </SmallButton>

      {/* Dropdown Menu */}
      {isActive && (
        <div
          ref={dropdownRef} // Attach ref to dropdown menu
          className="absolute left-0 mt-0 w-full bg-gray-800 text-white shadow-lg rounded-lg z-50"
        >
          {options.map((option, index) => (
            <button
              key={index}
              className="block w-full px-4 py-2 text-left hover:bg-gray-600"
              onClick={() => handleSelect(option)}
            >
              {option}
            </button>
          ))}
        </div>
      )}
    </div>
  );
};

export default SortButton;
