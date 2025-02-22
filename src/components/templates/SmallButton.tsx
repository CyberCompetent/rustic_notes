// IMPORT/USE SECTION
import React, { useState } from 'react';

//DECLARING PROPS
interface SmallButtonProps {
  id: string;
  buttons?: "plus" | "option" | "plus option" | "option plus"; // Control which icons to render
  svg: string; // Base svg prop for non-hover state
  hoverSvg?: string; // Optional svg for hover state
  children: React.ReactNode;
  onClick?: () => void; // Optional onClick handler
  isActive?: boolean; // Controlled by TopBar for active styling
  className?: string; // Optional className for custom styling
  hover?: boolean; // Optional hover prop to control hover effect
}

//GENERAL LOGIC SECTION
const SmallButton: React.FC<SmallButtonProps> = ({
  id, // Passing props such as id into SmallButton
  buttons,
  svg,
  hoverSvg,
  children,
  onClick,
  isActive = false, // Controlled by TopBar
  className = '',
  hover = true, // Default to true
}) => {
  const [isHovered, setIsHovered] = useState(false);

  // Handle click and toggle the isActive state (only internally if onClick exists)
  const handleClick = () => {
    // Optionally, you can call the passed-in onClick handler (if provided)
    if (onClick) {
      onClick(); // Invoke the passed parent handler if available
    }
  };

  // Base and hover classes
  const baseClass = isActive ? 'bg-gray-900' : 'bg-gray-700';
  const hoverClass = hover ? (isActive ? 'hover:bg-black' : 'hover:bg-gray-800') : '';

  // Render additional icons based on `buttons` prop
  const renderIcons = () => {
    if (buttons) {
      const icons = buttons.split(" ");
      return (
        <>
          {icons.includes("plus") && (
            <span
              className="material-icons rounded hover:bg-gray-700 mx-2"
              onClick={(e) => {
                e.stopPropagation();
                console.log("Add clicked for:", id);
              }}
            >
              add
            </span>
          )}
          {icons.includes("option") && (
            <span
              className="material-icons rounded hover:bg-gray-700"
              onClick={(e) => {
                e.stopPropagation();
                console.log("Menu clicked for:", id);
              }}
            >
              more_vert
            </span>
          )}
        </>
      );
    }
    return null;
  };

  return (
    <button
      id={id}
      className={`text-white py-2 px-2 rounded-lg flex items-center gap-2 ${baseClass} ${hoverClass} ${className}`}
      onClick={handleClick} // Call the handleClick function on click
      onMouseEnter={() => setIsHovered(true)} // Set hover state
      onMouseLeave={() => setIsHovered(false)} // Reset hover state
    >
      {/* Render SVG based on hover state */}
      <span className="material-icons text-xl">{isHovered && hoverSvg ? hoverSvg : svg}</span>
      {children}
      {renderIcons()} {/* Render additional icons after children */}
    </button>
  );
};

export default SmallButton;