import React, { useState, useRef, useEffect } from 'react';
import Button from '../templates/Button';
import { useSettings } from '@/context/SettingsContext'; // Adjust the path based on your file structure

const ProfileButton: React.FC = () => {
  const { openSettings } = useSettings();


  const [isActive, setIsActive] = useState(false);
  const options = ['Logout', 'Manage Workspaces'];
  const dropdownRef = useRef<HTMLDivElement | null>(null);
  const buttonRef = useRef<HTMLDivElement | null>(null);

  const handleClick = () => {
    setIsActive(!isActive);
    console.log("Profile button clicked:", isActive);
  };

  const handleSelect = (option: string) => {
    setIsActive(false); // Close dropdown after selection
    switch (option) {
      case "Logout":
        console.log("Logging out...");
        break;
      case "Manage Workspaces":
        openSettings("Workspaces");
        break;
      default:
        break;
    }
  };

  // Close dropdown if clicked outside
  const handleClickOutside = (event: MouseEvent) => {
    if (buttonRef.current && !buttonRef.current.contains(event.target as Node)) {
      setIsActive(false);
    }
  };

  useEffect(() => {
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  return (
    <div className="relative w-full" ref={buttonRef}>
      <Button
        id="select-mode-button"
        svg="brightness_1"
        onClick={handleClick}
        isActive={isActive}
        buttons={["keyboard_arrow_down"]}
        className="w-full"
      >
        Username
      </Button>

      {/* Dropdown Menu */}
      {isActive && (
        <div
          ref={dropdownRef}
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
