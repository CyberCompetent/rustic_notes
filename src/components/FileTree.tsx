'use client';
import React, { useEffect, useState } from "react";
import FileItem from "./templates/FileItem"; // Import the new component
import { useWorkspaces } from './WorkspaceContext'; // Import the hook

type File = {
  name: string;
  type: "workspace" | "note";
  children?: File[];
};

const FileTree: React.FC = () => {
  // Use the context to access workspaces
  const { workspaces } = useWorkspaces(); // Get workspaces from context

  const [fileTreeData, setFileTreeData] = useState<File[]>([]);

  useEffect(() => {
    // Load workspaces from context
    if (workspaces.length > 0) {
      // Map workspaces to match the File type structure
      const mappedWorkspaces: File[] = workspaces.map(workspace => ({
        name: workspace.name,
        type: workspace.type,
        children: workspace.children || [], // Use existing children or an empty array
      }));
      setFileTreeData(mappedWorkspaces);
    } else {
      // If no workspaces found, set initial data and save to Local Storage
      const initialFileTreeData: File[] = [
        {
          name: "Private Workspace",
          type: "workspace",
          children: [
            { name: "Example Note Page", type: "note", children: [] },
          ],
        },
        {
          name: "School Workspace",
          type: "workspace",
          children: [
            { name: "Example Note Page", type: "note", children: [] },
          ],
        },
        {
          name: "Friends Workspace",
          type: "workspace",
          children: [
            { name: "Example Note Page", type: "note", children: [] },
          ],
        },
      ];
      setFileTreeData(initialFileTreeData);
      // Save initial data to Local Storage
      localStorage.setItem('workspaces', JSON.stringify(initialFileTreeData));
    }
  }, [workspaces]); // Update when workspaces change
  

  // Recursively render the file tree
  const renderFileTree = (files: File[]) => (
    <ul className="flex flex-col list-none gap-1">
      {files.map((file, index) => (
        <FileTreeNode key={index} file={file} />
      ))}
    </ul>
  );

  return (
    <div className="p-5 overflow-y-auto">
      {renderFileTree(fileTreeData)}
    </div>
  );
};

const FileTreeNode: React.FC<{ file: File }> = ({ file }) => {
  const [isExpanded, setIsExpanded] = useState(false);

  // Toggle only this node
  const toggleExpand = () => {
    setIsExpanded((prev) => !prev);
  };

  return (
    <li>
      <FileItem
        file={file}
        onToggleExpand={toggleExpand}
        isExpanded={isExpanded}
      />
      {file.children && isExpanded && (
        <ul className="pl-4">
          {file.children.map((child, index) => (
            <FileTreeNode key={index} file={child} />
          ))}
        </ul>
      )}
    </li>
  );
};

export default FileTree;
