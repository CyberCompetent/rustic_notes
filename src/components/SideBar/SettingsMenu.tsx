import React from 'react';
import { useSettings } from '@/context/SettingsContext';
import SettingsItem from './SettingsMenu/SettingsItem';
import AccountSettings from './SettingsMenu/AccountSettings';
import PreferencesSettings from './SettingsMenu/PreferencesSettings';
import WorkspaceSettings from './SettingsMenu/WorkspaceSettings';
import KeybindsSettings from './SettingsMenu/KeyBindsSettings';
import ThemeSettings from './SettingsMenu/ThemeSettings';

const SettingsMenu: React.FC = () => {
    const { isOpen, initialSection, closeSettings } = useSettings();
    if (!isOpen) return null;

    const [activeSection, setActiveSection] = React.useState(initialSection);

    const sections = [
        { name: 'Account', svg: 'account_balance_wallet', component: <AccountSettings /> },
        { name: 'Preferences', svg: 'tune', component: <PreferencesSettings /> },
        { name: 'Workspaces', svg: 'workspaces', component: <WorkspaceSettings /> },
        { name: 'Keybinds', svg: 'keyboard', component: <KeybindsSettings /> },
        { name: 'Theme', svg: 'palette', component: <ThemeSettings /> },
    ];

    return (
      <div className="fixed inset-0 flex items-center justify-center z-50">
        <div className="bg-1 text-white rounded-lg shadow-lg w-2/4 h-2/4 flex relative">
          {/* Left Sidebar for Sections */}
          <div className="w-1/3 border-r border-2">
            <h2 className="text-lg font-semibold p-4">Settings</h2>
            <ul className="space-y-0">
              {sections.map(({ name, svg }) => (
                <SettingsItem
                  key={name}
                  id={name}
                  svg={svg} // Pass the SVG to the section
                  onClick={() => {
                  setActiveSection(name as "Account" | "Workspaces" | "Theme"); // Type assertion
                  
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
            {sections.find((s) => s.name === activeSection)?.component}
            </ul>
          </div>

          {/* Close Button */}
          <button
            className="absolute top-4 right-4 bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600"
            onClick={closeSettings}
          >
            X
          </button>
        </div>
      </div>
);
};

export default SettingsMenu;