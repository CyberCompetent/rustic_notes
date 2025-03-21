// IMPORT/USE SECTION
import React, { useState } from 'react';
import { useHover } from "@/hooks/useHover";

// DECLARING PROPS
interface SmallButtonProps {
  id: string;
  buttons?: "plus" | "option" | "arrow" | "plus option" | "option plus"; // Control which icons to render
  svg: string; // Base svg prop for non-hover state
  hoverSvg?: string; // Optional svg for hover state
  children: React.ReactNode;
  onClick?: () => void; // Optional onClick handler
  isActive?: boolean; // Controlled by TopBar for active styling
  className?: string; // Optional className for custom styling
  hover?: boolean; // Optional hover prop to control hover effect
}

// GENERAL LOGIC SECTION
const SmallButton: React.FC<SmallButtonProps> = ({
  id,
  buttons,
  svg,
  hoverSvg,
  children,
  onClick,
  isActive = false,
  className = '',
  hover = true,
}) => {
  const { isHovered, handleMouseEnter, handleMouseLeave, hoverClass } = useHover(isActive, hover);

  const handleClick = () => {
    if (onClick) {
      onClick();
    }
  };

  const baseClass = isActive ? 'bg-gray-900' : 'bg-gray-700';
  
  // Render additional icons based on `buttons` prop
  const renderIcons = () => {
    if (buttons) {
      const icons = buttons.split(" ");
      return (
        <div className="ml-auto flex items-center">
          {icons.includes("plus") && (
            <span
              className="material-icons rounded hover:bg-gray-700 mx-1"
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
              className="material-icons rounded hover:bg-gray-700 mx-1"
              onClick={(e) => {
                e.stopPropagation();
                console.log("Menu clicked for:", id);
              }}
            >
              more_vert
            </span>
          )}
          {icons.includes("arrow") && (
            <span
              className="material-icons rounded hover:bg-gray-700 mx-1"
              onClick={(e) => {
                e.stopPropagation();
                console.log("Arrow clicked for:", id);
              }}
            >
              keyboard_arrow_down
            </span>
          )}
        </div>
      );
    }
    return null;
  };

  return (
    <button
      id={id}
      className={`text-white py-2 px-2 rounded-lg flex items-center cursor-pointer ${baseClass} ${hoverClass} ${className}`}
      onClick={handleClick}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      {/* Render SVG based on hover state */}
      <span className="material-icons text-xl mr-2">{isHovered && hoverSvg ? hoverSvg : svg}</span>
      {children}
      {/* Render additional icons to the far right */}
      {renderIcons()} {/* Render additional icons */}
    </button>
  );
};

export default SmallButton;
