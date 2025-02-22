import React, { useState } from 'react';
import SmallButton from './templates/SmallButton';
import SettingsItem from './SettingsMenu/SettingsItem'; // Import the new SettingsItem component

const SettingsButton: React.FC = () => {
  const [isActive, setIsActive] = useState(false);
  const [activeSection, setActiveSection] = useState('Account'); // Default section
  const [activeOption, setActiveOption] = useState<string | null>(null); // Track active option
  const [username, setUsername] = useState(''); // State for username input
  const [email, setEmail] = useState(''); // State for email input

  const handleClick = () => {
    setIsActive(!isActive);
    console.log("Settings button clicked:", isActive);
  };

  const handleClose = () => {
    setIsActive(false); // Close the modal
    setActiveOption(null); // Reset active option on close
  };

  // Options for different settings sections
  const sections = {
    Account: [
      { name: 'Change Profile Picture', svg: 'brightness_1' },
      { name: 'Change Username', svg: 'content_paste' },
      { name: 'Change Password', svg: 'password' },
      { name: 'Change Email', svg: 'email' },
      { name: 'Delete Account', svg: 'warning' },
    ],
    Workspaces: [
      { name: 'Add Workspace', svg: 'add' },
      { name: 'Manage Workspaces', svg: 'workspaces' },
    ],
    Theme: [
      { name: 'Deep Ice', svg: 'ac_unit' },
      { name: 'Rustic Woods', svg: 'forest' },
      { name: 'Golden Sahara', svg: 'sunny' },
    ],
  };

  // Renders the input or button for each option when selected
  const renderOptionContent = (option: string) => {
    switch (option) {
      case 'Change Profile Picture':
        return (
          <div className="mt-2 p-2 bg-gray-800 rounded">
            <label className="block text-sm font-medium">Upload New Profile Picture:</label>
            <input type="file" className="mt-2 w-full p-2 bg-gray-700 rounded" />
          </div>
        );
      case 'Change Username':
        return (
          <div className="mt-2 p-2 bg-gray-800 rounded">
            <label className="block text-sm font-medium">Enter New Username:</label>
            <input
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="mt-2 w-full p-2 bg-gray-700 rounded"
              placeholder="New Username"
            />
            <button className="mt-2 px-4 py-2 bg-blue-500 rounded hover:bg-blue-600">Save</button>
          </div>
        );
      case 'Change Password':
        return (
          <div className="mt-2 p-2 bg-gray-800 rounded">
            <label className="block text-sm font-medium">Enter New Password:</label>
            <input type="password" className="mt-2 w-full p-2 bg-gray-700 rounded" placeholder="New Password" />
            <button className="mt-2 px-4 py-2 bg-blue-500 rounded hover:bg-blue-600">Change Password</button>
          </div>
        );
      case 'Change Email':
        return (
          <div className="mt-2 p-2 bg-gray-800 rounded">
            <label className="block text-sm font-medium">Enter New Email:</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="mt-2 w-full p-2 bg-gray-700 rounded"
              placeholder="New Email"
            />
            <button className="mt-2 px-4 py-2 bg-blue-500 rounded hover:bg-blue-600">Update Email</button>
          </div>
        );
      case 'Delete Account':
        return (
          <div className="mt-2 p-2 bg-gray-800 rounded">
            <p className="text-red-500">Are you sure? This action cannot be undone.</p>
            <button className="mt-2 px-4 py-2 bg-red-600 rounded hover:bg-red-700">Delete Account</button>
          </div>
        );
      default:
        return null;
    }
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
              <ul className="space-y-0">
                {Object.keys(sections).map((section) => (
                  <SettingsItem
                    key={section}
                    id={section}
                    onClick={() => {
                      setActiveSection(section);
                      setActiveOption(null); // Reset active option when changing sections
                    }}
                    isActive={activeSection === section} // Set active state for the section
                    className="py-4"
                  >
                    {section}
                  </SettingsItem>
                ))}
              </ul>
            </div>

            {/* Right Section for Options */}
            <div className="w-2/3 p-4">
              <h3 className="text-xl font-semibold mb-2">{activeSection} Settings</h3>
              <ul className="space-y-0">
                {sections[activeSection].map(({ name, svg }) => (
                  <div key={name}>
                    <SettingsItem
                      id={name}
                      svg={svg} // Pass the SVG to SettingsItem
                      onClick={() => {
                        setActiveOption(activeOption === name ? null : name); // Toggle the selected option
                      }}
                      isActive={activeOption === name} // Set active state for the option
                      className="py-3"
                    >
                      {name}
                    </SettingsItem>
                    {/* Render dynamic content directly below the selected option */}
                    {activeOption === name && renderOptionContent(name)}
                  </div>
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
