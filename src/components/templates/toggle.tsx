import { useState } from 'react';

interface ToggleComponentProps {
  text: string;
  applyMark: (mark: string) => void; // Add applyMark function as a prop
  mark: string; // The mark to be applied, such as "strong", "em", etc.
}

const ToggleComponent = ({ text, applyMark, mark }: ToggleComponentProps) => {
  const [toggled, setToggled] = useState(false);

  const toggleHandler = () => {
    setToggled(!toggled);
    applyMark(mark); // Apply the mark when the button is toggled
  };

  return (
    <button
    className={`text-gray-600 hover:bg-black hover:text-white material-icons rounded-md ${toggled ? 'bg-black' : ''} transition-all box-border inline-flex items-center justify-center w-9 h-9`}
      onClick={(e) => {
        e.preventDefault();
        e.stopPropagation();
        toggleHandler(); // Toggle and apply the mark
      }}
    >
      {text}
    </button>
  );
};

export default ToggleComponent;
