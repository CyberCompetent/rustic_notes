import React, { useState } from 'react';
import SmallButton from './templates/Button';
import SettingsItem from './SettingsMenu/SettingsItem';
import { useWorkspaces } from './WorkspaceContext'; // Import the hook
import Modal from './SettingsMenu/AddWorkspaceModal'; // Import the new Modal component

// Import the Workspace type
import { Workspace } from './types'; // Adjust the path based on your file structure

const SettingsButton: React.FC = () => {
  const [isActive, setIsActive] = useState(false);
  const [activeSection, setActiveSection] = useState('Account'); // Default section
  const [activeOption, setActiveOption] = useState<string | null>(null); // Track active option
  const [username, setUsername] = useState(''); // State for username input
  const [email, setEmail] = useState(''); // State for email input
  const [isDarkMode, setIsDarkMode] = useState(false); // State for dark mode

  const { workspaces, addWorkspace, deleteWorkspace } = useWorkspaces(); // Get workspaces and functions from context
  const [checkedWorkspaces, setCheckedWorkspaces] = useState<Record<string, boolean>>({});

  const [isAddWorkspaceModalOpen, setIsAddWorkspaceModalOpen] = useState(false); // State for the Add Workspace modal
  const [newWorkspaceName, setNewWorkspaceName] = useState(''); // State for new workspace name input

  const handleClick = () => {
    setIsActive(!isActive);
    console.log("Settings button clicked:", isActive);
  };

  const handleClose = () => {
    setIsActive(false); // Close the modal
    setActiveOption(null); // Reset active option on close
  };

  const handleCheckboxChange = (workspaceName: string) => {
    setCheckedWorkspaces((prev) => ({
      ...prev,
      [workspaceName]: !prev[workspaceName], // Toggle the checked state
    }));
  };

  const handleDeleteWorkspaces = () => {
    const workspacesToDelete = Object.keys(checkedWorkspaces).filter(
      (workspaceName) => checkedWorkspaces[workspaceName]
    );
  
    // Log the workspaces to delete
    console.log("Workspaces to delete:", workspacesToDelete);
  
    // Delete each workspace that is checked
    workspacesToDelete.forEach((workspaceName) => {
      deleteWorkspace(workspaceName); // Call the delete function for each checked workspace
    });
  
    // Reset the checked workspaces state after deletion
    setCheckedWorkspaces((prev) => {
      const updatedCheckedWorkspaces = { ...prev };
      workspacesToDelete.forEach((workspaceName) => {
        delete updatedCheckedWorkspaces[workspaceName]; // Remove deleted workspaces from checked state
      });
      return updatedCheckedWorkspaces;
    });
  
    // Log the updated checked workspaces
    console.log("Updated checked workspaces:", checkedWorkspaces);
  };
  
  
  

  const renderWorkspaces = () => {
    return workspaces.map(workspace => (
      <tr key={workspace.name}>
        <th>
          <label>
          <input
            type="checkbox"
            className="checkbox"
            checked={!!checkedWorkspaces[workspace.name]} // Check if this workspace is checked
            onChange={() => handleCheckboxChange(workspace.name)} // Update state on change
          />
          </label>
        </th>
        <td>
          <div className="flex items-center gap-3">
            <div className="avatar">
            <span
              className="material-icons rounded hover:bg-gray-700 mx-1"
            >
              workspaces
            </span>
            </div>
            <div>
              <div className="font-bold">{workspace.name}</div>
            </div>
          </div>
        </td>
        <td>
          example_acc, example_acc, example_acc
          <br />
        </td>
        <td>example_acc</td>
        <th>
          <button className="btn btn-ghost btn-xs">details</button>
        </th>
      </tr>
    ));
  };

  const toggleTheme = () => {
    setIsDarkMode(!isDarkMode); // Toggle dark mode state
  };

  // Sections with associated icons and their settings options
  const sections = [
    {
      name: 'Account',
      svg: 'account_balance_wallet', // Section SVG
      options: [
        { name: 'Change Profile Picture', svg: 'brightness_1' },
        { name: 'Change Username', svg: 'content_paste' },
        { name: 'Change Password', svg: 'password' },
        { name: 'Change Email', svg: 'email' },
        { name: 'Delete Account', svg: 'warning' },
      ],
    },
    {
      name: 'Preferences',
      svg: 'tune', // Section SVG
      options: [],
    },
    {
      name: 'Workspaces',
      svg: 'workspaces', // Section SVG
      options: [],
    },
    {
      name: 'Keybinds',
      svg: 'keyboard', // Section SVG
      options: [],
    },
    {
      name: 'Theme',
      svg: 'palette', // Section SVG
      options: [
        { name: 'Deep Ice', svg: 'ac_unit' },
        { name: 'Rustic Woods', svg: 'forest' },
        { name: 'Golden Sahara', svg: 'sunny' },
      ],
    },
  ];

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
      case 'Deep Ice':
      case 'Rustic Woods':
      case 'Golden Sahara':
        return (
          <div className="mt-2 p-2 bg-gray-800 rounded">
            <p className="text-white">Selected Theme: {option} {isDarkMode ? 'Dark Mode' : 'Light Mode'}</p>
            <label className="flex items-center cursor-pointer">
              <div className="relative">
                <input type="checkbox" className="hidden" checked={isDarkMode} onChange={toggleTheme} />
                <div className={`block w-14 h-8 rounded-full ${isDarkMode ? 'bg-green-500' : 'bg-gray-400'}`}></div>
                <div
                  className={`absolute left-1 top-1 bg-white w-6 h-6 rounded-full transition-transform duration-200 ${
                    isDarkMode ? 'transform translate-x-full' : ''
                  }`}
                ></div>
              </div>
              <span className="ml-3 text-sm text-white">Toggle Dark/Light Mode</span>
            </label>
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
                {sections.map(({ name, svg }) => (
                  <SettingsItem
                    key={name}
                    id={name}
                    svg={svg} // Pass the SVG to the section
                    onClick={() => {
                      setActiveSection(name);
                      setActiveOption(null); // Reset active option when changing sections
                    }}
                    isActive={activeSection === name} // Set active state for the section
                    className="py-4"
                  >
                    {name}
                  </SettingsItem>
                ))}
              </ul>
            </div>

            {/* Right Section for Options */}
            <div className="w-2/3 p-4">
              <h3 className="text-xl font-semibold h-[10%]">{activeSection} Settings</h3>
              <ul className="space-y-0">
                {sections.find((s) => s.name === activeSection)?.options.map(({ name, svg }) => (
                  <div key={name}>
                    <SettingsItem
                      id={name}
                      svg={svg} // Pass the SVG to the option
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

              {/* Render workspaces only when the Workspaces section is active */}
              {activeSection === 'Workspaces' && (
                <div className="h-[90%]">
                  <div className="flex flex-row h-[15%] justify-between">
                    <h4 className="text-lg font-semibold">Manage Workspaces</h4>
                    <div className='flex gap-6'>
                      <button
                        onClick={() => setIsAddWorkspaceModalOpen(true)}
                        className=" max-h-[43px] bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
                      >
                        Add Workspace
                      </button>
                      <button
                        onClick={handleDeleteWorkspaces}
                        className=" max-h-[43px] bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
                      >
                        Delete
                      </button>
                    </div>
                  </div>
                  <div className="h-[90%]">
                    <div className="overflow-y-auto h-full">
                      <table className="table max-h-20 w-full overflow-hidden">
                        {/* head */}
                        <thead>
                          <tr>
                            <th>
                              <label>
                                <input type="checkbox" className="checkbox" />
                              </label>
                            </th>
                            <th>Name</th>
                            <th>Members</th>
                            <th>Owners</th>
                            <th></th>
                          </tr>
                        </thead>
                        <tbody className='overflow-y-scroll h-full'>{renderWorkspaces()}</tbody>
                      </table>
                    </div>
                  </div>

                  {/* Add Workspace Modal */}
                  {isAddWorkspaceModalOpen && (
                    <Modal
                      onClose={() => setIsAddWorkspaceModalOpen(false)}
                      onAdd={(workspaceName) => {
                        const newWorkspace: Workspace = {
                          name: workspaceName,
                          type: 'workspace',
                          children: [],
                        };
                        addWorkspace(newWorkspace);
                        setNewWorkspaceName(''); // Reset the input
                      }}
                      workspaceName={newWorkspaceName} // Pass the newWorkspaceName
                      setWorkspaceName={setNewWorkspaceName} // Pass the setter function
                    />
                  )}
                </div>
              )}
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
