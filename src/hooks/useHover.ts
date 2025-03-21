import { useState } from "react";

export const useHover = (isActive: boolean) => {
  const [isHovered, setIsHovered] = useState(false);

  const handleMouseEnter = () => setIsHovered(true);
  const handleMouseLeave = () => setIsHovered(false);

  // Determine the base background color based on active state
  const baseClass = isActive ? 'bg-gray-900' : 'bg-gray-700';

  // Automatically apply hoverClass based on hover state and isActive flag
  const hoverClass = isHovered
    ? isActive
      ? 'hover:bg-black' // Active + Hover
      : 'hover:bg-gray-800' // Non-active + Hover
    : ''; // No hover effect if not hovered

  return { isHovered, handleMouseEnter, handleMouseLeave, hoverClass, baseClass };
};
