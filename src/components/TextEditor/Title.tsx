import { useState } from "react";

interface TitleProps {
  onTitleChange?: (title: string) => void; // Optional callback for title changes
}

export default function Title({ onTitleChange }: TitleProps) {
  const [title, setTitle] = useState("");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newTitle = e.target.value;
    setTitle(newTitle);
    if (onTitleChange) {
      onTitleChange(newTitle); // Notify parent component of title change
    }
  };

  return (
    <input
      type="text"
      value={title}
      onChange={handleChange}
      className="title-input text-4xl font-bold text-black mb-8 pt-2 border-bottom w-full max-w-4xl focus:outline-none"
      placeholder="New page"
    />
  );
}
