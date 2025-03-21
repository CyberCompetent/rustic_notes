import React, { useEffect, useState } from 'react';

interface ThemeSettingsProps {
  selectedTheme: 'Modern Midnight' | 'Deep Ice' | 'Rustic Woods' | 'Golden Sahara'; // Ensure the selected theme can only be one of these
}

const ThemeSettings: React.FC<ThemeSettingsProps> = ({ selectedTheme }) => {
  const [isDarkMode, setIsDarkMode] = useState<boolean>(false); // State to track dark mode

  useEffect(() => {
    // Update the data-theme and data-mode attributes when selectedTheme or dark mode changes
    const rootElement = document.documentElement;
    rootElement.setAttribute('data-theme', selectedTheme.toLowerCase().replace(' ', ''));
    rootElement.setAttribute('data-mode', isDarkMode ? 'dark' : 'light');

    // Log the current data-theme and data-mode to the console
    console.log('Current data-theme:', rootElement.getAttribute('data-theme'));
    console.log('Current data-mode:', rootElement.getAttribute('data-mode'));
    const primaryColor = getComputedStyle(rootElement).getPropertyValue('--primary-colour');
    console.log('Current --primary-colour value:', primaryColor);

  }, [selectedTheme, isDarkMode]); // Effect runs when selectedTheme or isDarkMode changes

  const toggleDarkMode = () => {
    setIsDarkMode(prevMode => !prevMode); // Toggle between dark and light mode
  };

  // Determine the selected mode as a string for display
  const selectedMode = isDarkMode ? 'Dark' : 'Light';

  return (
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
  );
};

export default ThemeSettings;
