'use client'; // Add this at the very top of your file

import React, { useState } from 'react';
import SelectModeButton from './SelectModeButton'; // Import your SelectModeButton
import TextModeButton from './TextModeButton'; // Other buttons
import DrawModeButton from './DrawModeButton'; // Other buttons
import Logo from './Logo'; // Logo component

const TopBar: React.FC = () => {
  // State variables to manage the active mode
  const [selectMode, setSelectMode] = useState(false); // For SelectModeButton active state
  const [textMode, setTextMode] = useState(false);
  const [drawMode, setDrawMode] = useState(false);

  // Handle Select Mode button click
  const handleSelectModeClick = () => {
    setSelectMode((prev) => !prev); // Toggle selectMode state
    setTextMode(false); // Reset text mode
    setDrawMode(false); // Reset draw mode
  };

  // Handle Text Mode button click
  const handleTextModeClick = () => {
    setTextMode((prev) => !prev);
    setSelectMode(false); // Reset select mode
    setDrawMode(false); // Reset draw mode
  };

  // Handle Draw Mode button click
  const handleDrawModeClick = () => {
    setDrawMode((prev) => !prev);
    setSelectMode(false); // Reset select mode
    setTextMode(false); // Reset text mode
  };

  return (
    <div className="h-16 bg-gray-700 text-white flex items-center px-5 gap-4">
      <Logo mode="bright" />
      <div className="flex gap-4"> {/* Mode Buttons */}
        <SelectModeButton
          isActive={selectMode} // Pass the selectMode state
          onClick={handleSelectModeClick}
        />
        <TextModeButton
          isActive={textMode} // Pass the textMode state
          onClick={handleTextModeClick}
        />
        <DrawModeButton
          isActive={drawMode} // Pass the drawMode state
          onClick={handleDrawModeClick}
        />
      </div>
      <div id="mode-settings" className="flex-grow flex items-center gap-2"></div> {/* Mode Settings */}
    </div>
  );
};

export default TopBar;
