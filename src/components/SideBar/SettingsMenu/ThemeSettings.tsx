import React, { useEffect, useState } from 'react';

interface ThemeSettingsProps {
  selectedTheme: 'Modern Midnight' | 'Deep Ice' | 'Rustic Woods' | 'Golden Sahara'; // Ensure the selected theme can only be one of these
}

const ThemeSettings: React.FC<ThemeSettingsProps> = ({ selectedTheme }) => {
  const [isDarkMode, setIsDarkMode] = useState<boolean>(false); // State to track dark mode

  useEffect(() => {
    const rootElement = document.documentElement; // Move declaration to the top
  
    const savedTheme = localStorage.getItem('selectedTheme');
    const savedMode = localStorage.getItem('darkMode');
  
    if (savedTheme) {
      rootElement.setAttribute('data-theme', savedTheme);
    }
  
    if (savedMode) {
      setIsDarkMode(savedMode === 'dark');
    }
  
    rootElement.setAttribute('data-theme', selectedTheme.toLowerCase().replace(' ', ''));
    rootElement.setAttribute('data-mode', isDarkMode ? 'dark' : 'light');
  
    const primaryColor = getComputedStyle(rootElement).getPropertyValue('--primary-colour');
    console.log('Current --primary-colour value:', primaryColor);
  }, [selectedTheme, isDarkMode]);
  

  const toggleDarkMode = () => {
    setIsDarkMode(prevMode => {
      const newMode = !prevMode;
      // Save the new dark mode preference to localStorage
      localStorage.setItem('darkMode', newMode ? 'dark' : 'light');
      return newMode;
    });
  };

  // Save the theme in localStorage when it changes
  useEffect(() => {
    localStorage.setItem('selectedTheme', selectedTheme.toLowerCase().replace(' ', ''));
  }, [selectedTheme]);

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
