import React, { createContext, useContext, useEffect, useState, ReactNode } from 'react';

import { Workspace } from './types'; // Adjust the path based on your file structure


interface WorkspaceContextType {
  workspaces: Workspace[];
  addWorkspace: (workspace: Workspace) => void;
  deleteWorkspace: (name: string) => void;
}

// Create the context
const WorkspaceContext = createContext<WorkspaceContextType | undefined>(undefined);

// Define props for the WorkspaceProvider
interface WorkspaceProviderProps {
  children: ReactNode; // Specify that children can be any ReactNode
}

// Create a provider component
export const WorkspaceProvider: React.FC<WorkspaceProviderProps> = ({ children }) => {
  const [workspaces, setWorkspaces] = useState<Workspace[]>([]);

  // Load workspaces from local storage on mount
  useEffect(() => {
    const storedWorkspaces = localStorage.getItem('workspaces');
    if (storedWorkspaces) {
      setWorkspaces(JSON.parse(storedWorkspaces));
    }
  }, []);

  const addWorkspace = (workspace: Workspace) => { // Change parameter type to Workspace
    const newWorkspaces = [...workspaces, workspace];
    setWorkspaces(newWorkspaces);
    localStorage.setItem('workspaces', JSON.stringify(newWorkspaces));
  };


  const deleteWorkspace = (name: string) => {
    setWorkspaces((prevWorkspaces) => {
      const newWorkspaces = prevWorkspaces.filter(ws => ws.name !== name);
      localStorage.setItem('workspaces', JSON.stringify(newWorkspaces));
      return newWorkspaces;
    });
  };

  return (
    <WorkspaceContext.Provider value={{ workspaces, addWorkspace, deleteWorkspace }}>
      {children}
    </WorkspaceContext.Provider>
  );
};

// Custom hook for using the context
export const useWorkspaces = () => {
  const context = useContext(WorkspaceContext);
  if (!context) {
    throw new Error('useWorkspaces must be used within a WorkspaceProvider');
  }
  return context;
};
