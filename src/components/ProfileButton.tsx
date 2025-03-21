import React, { useState, useRef, useEffect } from 'react';
import SmallButton from './templates/Button';

const ProfileButton: React.FC = () => {
  const [isActive, setIsActive] = useState(false);
  const options = ['Logout', 'Manage Workspaces']; // Dropdown options
  const dropdownRef = useRef<HTMLDivElement | null>(null); // Create a ref for the dropdown
  const buttonRef = useRef<HTMLDivElement | null>(null); // Create a ref for the parent div

  const handleClick = () => {
    setIsActive(!isActive);
    console.log("Profile button clicked:", isActive);
  };

  const handleSelect = (option: string) => {
    setIsActive(false); // Close dropdown after selection
    console.log(`Selected option: ${option}`);
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

  return (
    <div className="relative w-full" ref={buttonRef}> {/* Attach ref to parent div */}
      <SmallButton
        id="select-mode-button"
        svg="brightness_1"
        onClick={handleClick}
        isActive={isActive}
        buttons="arrow"
        hover={true}
        className='w-full'
      >
        Username
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

export default ProfileButton;
