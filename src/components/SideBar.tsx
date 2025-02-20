'use client'; // Add this at the very top of your file
import React, { useState } from 'react';
import ProfileButton from './ProfileButton';
import SortButton from './SortButton';
import SearchBar from './SearchBar';
import SettingsButton from './SettingsButton';
import FileTree from './FileTree';

const SideBar: React.FC = () => {
  // State for active profile button
  const [Active, setActive] = useState(false);

  // Handle button clicks
  const handleProfileButtonClick = () => {
    console.log("stunk");
    setActive(!Active); // Toggle Active state
  };

  return (
    <div className="w-64 bg-gray-600 text-white flex flex-col box-border"> {/* Sidebar */}
      <div className="p-5 bg-gray-700 flex flex-col gap-2 flex-shrink-0 box-border"> {/* Controls */}
        <ProfileButton
          isActive={Active} // Pass the selectMode state
          onClick={handleProfileButtonClick}
        />
        <SettingsButton /> {/* Settings Button */}
        <SortButton /> {/* Sort Button */}
        <SearchBar /> {/* Search Bar */}
      </div>
      <FileTree />
    </div>
  );
};

export default SideBar;
