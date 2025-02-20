import React, { useState } from "react";
import SmallButton from "./SmallButton"; // Adjust the import path if necessary

interface FileItemProps {
  file: {
    name: string;
    type: "workspace" | "note";
    children?: FileItemProps["file"][];
  };
  onToggleExpand?: () => void;
  isExpanded?: boolean;
}

const FileItem: React.FC<FileItemProps> = ({ file, onToggleExpand, isExpanded = false }) => {
  const [isHovered, setIsHovered] = useState(false);

  const fileIcon = file.type === "workspace" ? "workspaces" : "description";
  const arrowIcon = isExpanded ? "keyboard_arrow_down" : "keyboard_arrow_right";

  return (
    <div
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className="relative"
    >
      <SmallButton
        id={`file-${file.name}`}
        svg={isHovered ? arrowIcon : fileIcon}
        onClick={onToggleExpand} // Correctly call the parent function
        isActive={isExpanded}
        hover
        buttons={isHovered ? "plus option" : undefined}
        className="w-full text-left p-2 flex items-center justify-between"
      >
        <span className="ml-2 flex-grow truncate" title={file.name}>
          {file.name}
        </span>
      </SmallButton>
    </div>
  );
};

export default FileItem;
