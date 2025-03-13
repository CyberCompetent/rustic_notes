import React, { useState, useRef, useEffect, ReactNode } from 'react';
import SmallButton from './SmallButton';

interface DropdownProps {
  id?: string;
  options: string[];
  defaultOption?: string;
  selectedOption?: string;
  svg?: string;
  onSelect: (option: string) => void;
  children?: ReactNode;
  buttons?: "plus" | "option" | "arrow" | "plus option" | "option plus";
  className?: string;
}

const Dropdown: React.FC<DropdownProps> = ({
  id = "dropdown",
  options,
  defaultOption = 'Select',
  selectedOption,
  svg = "",
  children,
  buttons,
  className,
  onSelect,
}) => {
  const [isActive, setIsActive] = useState(false);
  const [internalSelected, setInternalSelected] = useState(selectedOption ?? defaultOption);
  const buttonRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (selectedOption !== undefined) {
      setInternalSelected(selectedOption);
    }
  }, [selectedOption]);

  const handleClick = () => {
    setIsActive((prev) => !prev);
  };

  const handleSelect = (option: string) => {
    setInternalSelected(option);
    onSelect(option);
    setIsActive(false);
  };

  const handleClickOutside = (event: MouseEvent) => {
    if (buttonRef.current && !buttonRef.current.contains(event.target as Node)) {
      setIsActive(false);
    }
  };

  useEffect(() => {
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <div className="relative w-full" ref={buttonRef}>
      <SmallButton
        id={id}
        svg={svg}
        onClick={handleClick}
        isActive={isActive}
        hover={true}
        className={`w-full ${className}`}
        buttons={buttons}
      >
        {internalSelected}
        {children}
      </SmallButton>

      {isActive && (
        <div className="absolute left-0  w-full bg-gray-800 text-white shadow-lg rounded-lg z-50">
          {options.map((option, index) => (
            <button
              key={index}
              className="block w-full px-4 py-2 text-left hover:bg-gray-600"
              onClick={() => handleSelect(option)}
            >
              {option}
            </button>
          ))}
        </div>
      )}
    </div>
  );
};

export default Dropdown;
