import React from 'react';
import { useSettings } from '@/context/SettingsContext'; // Adjust the path based on your file structure
import Dropdown from '@/components/templates/Dropdown-button'; // Import the Dropdown component

const ProfileButton: React.FC = () => {
  const { openSettings } = useSettings();

  const options = ['Logout', 'Manage Workspaces'];

  const handleSelect = (option: string) => {
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

  return (
    <div className="relative w-full">
      <Dropdown
        options={options}
        onSelect={handleSelect}
        svg="brightness_1"
        buttons={["keyboard_arrow_down"]}
        className="w-full"
      >
        Username {/* Static text for the button */}
      </Dropdown>
    </div>
  );
};

export default ProfileButton;
