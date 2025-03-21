import { useHover } from "@/hooks/useHover";

// DECLARING PROPS
interface SmallButtonProps {
  id: string;
  buttons?: string[]; // Accepts an array of material icon names directly
  svg: string;
  hoverSvg?: string;
  children: React.ReactNode;
  onClick?: () => void;
  isActive?: boolean;
  className?: string;
}

const Button: React.FC<SmallButtonProps> = ({
  id,
  buttons = [], // Default to an empty array if buttons is not provided
  svg,
  hoverSvg,
  children,
  onClick,
  isActive = false,
  className = '',
}) => {
  const { isHovered, handleMouseEnter, handleMouseLeave, hoverClass, baseClass } = useHover(isActive);

  // Render additional icons based on `buttons` prop
  const renderIcons = () => {
    if (buttons.length === 0) return null; // If no buttons are provided, return null

    return (
      <div className="ml-auto flex items-center">
        {buttons.map((icon) => (
          <span
            key={icon}
            className="material-icons rounded hover:bg-gray-700 mx-1"
            onClick={(e) => {
              e.stopPropagation();
              console.log(`${icon.charAt(0).toUpperCase() + icon.slice(1)} clicked for:`, id);
            }}
          >
            {icon}
          </span>
        ))}
      </div>
    );
  };

  return (
    <button
      id={id}
      className={`text-white py-2 px-2 rounded-lg flex items-center cursor-pointer ${baseClass} ${hoverClass} ${className}`}
      onClick={onClick}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      {/* Render SVG based on hover state */}
      <span className="material-icons text-xl mr-2">
        {isHovered && hoverSvg ? hoverSvg : svg}
      </span>
      {children}
      {/* Render additional icons */}
      {renderIcons()}
    </button>
  );
};

export default Button;
