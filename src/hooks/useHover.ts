import { useState } from "react";

export const useHover = (isActive: boolean, hover: boolean) => {
  const [isHovered, setIsHovered] = useState(false);

  const handleMouseEnter = () => setIsHovered(true);
  const handleMouseLeave = () => setIsHovered(false);

  // Define hover classes based on props
  const hoverClass =
    hover && isActive
      ? "hover:bg-black"
      : hover
      ? "hover:bg-gray-800"
      : "";

  return { isHovered, handleMouseEnter, handleMouseLeave, hoverClass };
};
