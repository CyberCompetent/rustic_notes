import React, { useState } from 'react';
import SmallButton from './templates/SmallButton';
import SettingsItem from './SettingsMenu/SettingsItem'; // Import the new SettingsItem component

const SettingsButton: React.FC = () => {
  const [isActive, setIsActive] = useState(false);
  const [activeSection, setActiveSection] = useState('Account'); // Default section

  const handleClick = () => {
    setIsActive(!isActive);
    console.log("Settings button clicked:", isActive);
  };

  const handleClose = () => {
    setIsActive(false); // Close the modal
  };

  // Options for different settings sections
  const sections = {
    Account: ['Change Profile Picture', 'Change Username', 'Change Password', 'Change Email', 'Privacy Settings'],
    Workspaces: ['Add Workspace', 'Manage Workspaces'],
    Theme: ['Deep Ice', 'Rustic Woods', 'Golden Sahara'],
  };

  return (
    <div className='w-full'>
      <SmallButton
        id="settings-button"
        svg="settings"
        onClick={handleClick}
        isActive={isActive}
        hover={true}
        className='w-full'
      >
        Settings
      </SmallButton>

      {/* Modal for Settings */}
      {isActive && (
        <div className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-60">
          <div className="bg-gray-700 text-white rounded-lg shadow-lg w-2/4 h-2/4 flex relative">
            {/* Left Sidebar for Sections */}
            <div className="w-1/3 border-r border-gray-600">
              <h2 className="text-lg font-semibold p-4">Settings</h2>
              <ul className="space-y-2">
                {Object.keys(sections).map((section) => (
                  <li
                    key={section}
                    className={`p-4 cursor-pointer hover:bg-gray-600 ${activeSection === section ? 'bg-gray-800' : ''}`}
                    onClick={() => setActiveSection(section)}
                  >
                    {section}
                  </li>
                ))}
              </ul>
            </div>

            {/* Right Section for Options */}
            <div className="w-2/3 p-4">
              <h3 className="text-xl font-semibold mb-2">{activeSection} Settings</h3>
              <ul className="space-y-2">
                {sections[activeSection].map((option) => (
                  <SettingsItem
                    key={option}
                    id={option} // Set a unique id for each item
                    onClick={() => console.log(`Selected: ${option}`)} // Handle option click
                  >
                    {option}
                  </SettingsItem>
                ))}
              </ul>
            </div>

            {/* Close Button */}
            <button 
              className="absolute top-4 right-4 bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600"
              onClick={handleClose}
            >
              X
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default SettingsButton;
