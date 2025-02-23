'use client';

import React, { useState } from 'react';
import SelectModeButton from './TopBar/SelectModeButton';
import TextModeButton from './TopBar/TextModeButton';
import DrawModeButton from './TopBar/DrawModeButton';
import Logo from './Logo';

const TopBar: React.FC = () => {
  const [activeMode, setActiveMode] = useState<'select' | 'text' | 'draw' | null>(null);
  const [brushSize, setBrushSize] = useState<string>('10');
  const [opacity, setOpacity] = useState<string>('100');
  const [brushColor, setBrushColor] = useState('#000000');

  const handleSliderChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = parseInt(e.target.value, 10); // Parse the value to a number
    const sliderName = e.target.name; // Get the name of the slider
  
    if (sliderName === 'brushSize') {
      setBrushSize(value.toString()); // Update brush size as a string
      e.target.style.setProperty('--value', `${(value - 1) * (100 / 49)}%`); // Update CSS variable for brush size gradient
    } else if (sliderName === 'opacity') {
      setOpacity(value.toString()); // Update opacity as a string
      e.target.style.setProperty('--value', `${(value / 100) * 100}%`); // Update CSS variable for opacity gradient
    }
  };
  

  const handleModeClick = (mode: 'select' | 'text' | 'draw') => {
    setActiveMode(activeMode === mode ? null : mode);
  };

  const handleInputChange = (setter: React.Dispatch<React.SetStateAction<string>>, min: number, max: number) => {
    return (value: string) => {
      if (value === '') {
        setter('');
        return;
      }

      const num = parseInt(value, 10);
      if (!isNaN(num) && num >= min && num <= max) {
        setter(value);
      }
    };
  };

  return (
    <div className="h-16 bg-gray-700 text-white flex items-center px-5 gap-4">
      <Logo mode="bright" />
      <div className="flex gap-4">
        <SelectModeButton isActive={activeMode === 'select'} onClick={() => handleModeClick('select')} />
        <TextModeButton isActive={activeMode === 'text'} onClick={() => handleModeClick('text')} />
        <DrawModeButton isActive={activeMode === 'draw'} onClick={() => handleModeClick('draw')} />
      </div>

      {/* Mode Settings */}
      <div id="mode-settings" className="flex-grow flex items-center gap-4">
        {activeMode === 'draw' && (
          <div className="flex items-center gap-4">
            {/* Brush Size */}
            <label className="text-sm">Brush Size:</label>
            <input
              type="range"
              name="brushSize" // Add a name for identification
              min="1"
              max="50"
              value={brushSize === '' ? 1 : parseInt(brushSize)}
              onChange={handleSliderChange} // Correctly reference the function
              className="range w-28"
            />
            <div className="flex items-center gap-1">
              <input
                type="number"
                min="1"
                max="50"
                value={brushSize}
                onChange={(e) => handleInputChange(setBrushSize, 1, 50)(e.target.value)}
                className="w-10 p-1 bg-gray-600 rounded text-white text-center appearance-none outline-none [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:appearance-none"
              />
              <span className="text-sm">px</span>
            </div>

            {/* Opacity */}
            <label className="text-sm">Opacity:</label>
            <input
              type="range"
              name="opacity" // Add a name for identification
              min="0"
              max="100"
              value={opacity === '' ? 0 : parseInt(opacity)}
              onChange={handleSliderChange} // Correctly reference the function
              className="range w-28"
            />
            <div className="flex items-center gap-1">
              <input
                type="number"
                min="0"
                max="100"
                value={opacity}
                onChange={(e) => handleInputChange(setOpacity, 0, 100)(e.target.value)}
                className="w-10 p-1 bg-gray-600 rounded text-white text-center appearance-none outline-none [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:appearance-none"
              />
              <span className="text-sm">%</span>
            </div>

            {/* Brush Colour */}
            <label className="text-sm">Colour:</label>
            <input
              type="color"
              value={brushColor}
              onChange={(e) => setBrushColor(e.target.value)}
              className="w-10 h-6"
            />

            {/* Rubber */}
            <button className="bg-red-500 text-white px-3 py-1 rounded">Rubber</button>
          </div>
        )}
      </div>
    </div>
  );
};

export default TopBar;
