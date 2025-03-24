import React, { useEffect, useState } from 'react';
import SettingsItem from './SettingsItem';

const options = [
  { name: 'Modern Midnight', svg: 'dark_mode' },
  { name: 'Deep Ice', svg: 'ac_unit' },
  { name: 'Rustic Woods', svg: 'forest' },
  { name: 'Golden Sahara', svg: 'sunny' },
];

const ThemeSettings: React.FC = () => {
  // Initialize the state with localStorage value or default to 'Modern Midnight'
  const [selectedTheme, setSelectedTheme] = useState<string>(() => {
    const savedTheme = localStorage.getItem('selectedTheme');
    return savedTheme || 'Modern Midnight';
  });
  const [isDarkMode, setIsDarkMode] = useState<boolean>(false); // State to track dark mode

  useEffect(() => {
    const rootElement = document.documentElement;

    const savedTheme = localStorage.getItem('selectedTheme');
    const savedMode = localStorage.getItem('darkMode');

    if (savedTheme) {
      setSelectedTheme(savedTheme);
      rootElement.setAttribute('data-theme', savedTheme);
    }

    if (savedMode) {
      setIsDarkMode(savedMode === 'Dark');
    }

    rootElement.setAttribute('data-mode', isDarkMode ? 'Dark' : 'Light');
  }, [isDarkMode]);

  useEffect(() => {
    localStorage.setItem('selectedTheme', selectedTheme);
    const rootElement = document.documentElement;
    rootElement.setAttribute('data-theme', selectedTheme);
  }, [selectedTheme]);

  const toggleDarkMode = () => {
    setIsDarkMode(prevMode => {
      const newMode = !prevMode;
      localStorage.setItem('darkMode', newMode ? 'Dark' : 'Light');
      return newMode;
    });
  };

  // Determine the selected mode as a string for display
  const selectedMode = isDarkMode ? 'Dark' : 'Light';

  return (
    <div>
      {options.map(({ name, svg }) => (
        <div key={name}>
          <SettingsItem
            id={name}
            svg={svg}
            onClick={() => setSelectedTheme(name)} // Set the theme when clicked
            isActive={selectedTheme === name} // Set active state for the option
            className="py-3"
          >
            {name}
          </SettingsItem>
        </div>
      ))}
      <div className="mt-2 p-2 bg-1-1 rounded">
        <p className="text-white">Selected Theme: {selectedTheme} | Selected Mode: {selectedMode}</p>

        {/* Switch for Dark/Light mode */}
        <div className="flex items-center cursor-pointer">
          <span className="text-white mr-2">Light/Dark Mode</span>
          <label className="flex items-center cursor-pointer">
            <div className="relative">
              <input
                type="checkbox"
                className="hidden"
                checked={isDarkMode}
                onChange={toggleDarkMode}
              />
              <div className={`block w-14 h-8 rounded-full ${isDarkMode ? 'bg-green-500' : 'bg-gray-400'}`}></div>
              <div
                className={`absolute left-1 top-1 bg-white w-6 h-6 rounded-full transition-transform duration-200 ${
                  isDarkMode ? 'transform translate-x-full' : ''
                }`}
              ></div>
            </div>
          </label>
        </div>
      </div>
    </div>
  );
};

export default ThemeSettings;
