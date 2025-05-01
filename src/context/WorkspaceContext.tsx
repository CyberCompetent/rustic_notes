import React, { createContext, useContext, useEffect, useState, ReactNode } from 'react';
import { invoke } from '@tauri-apps/api/core';
import { Workspace } from '@/types/types';

interface WorkspaceContextType {
  workspaces: Workspace[];
  addWorkspace: (workspace: Workspace) => void;
  deleteWorkspace: (name: string) => void;
}

const WorkspaceContext = createContext<WorkspaceContextType | undefined>(undefined);

interface WorkspaceProviderProps {
  children: ReactNode;
}

export const WorkspaceProvider: React.FC<WorkspaceProviderProps> = ({ children }) => {
  const [workspaces, setWorkspaces] = useState<Workspace[]>([]);

  // Fetch from backend on mount
  useEffect(() => {
    const fetchWorkspaces = async () => {
      try {
        const fetched: Workspace[] = await invoke('get_workspaces');
        setWorkspaces(fetched);
      } catch (error) {
        console.error('Failed to load workspaces from backend:', error);
      }
    };

    fetchWorkspaces();
  }, []);

  const addWorkspace = async (workspace: Workspace) => {
    try {
      await invoke<string>('create_workspace', { workspaceName: workspace.name });
      // Update state after successful creation
      setWorkspaces(prev => [...prev, workspace]);
    } catch (error) {
      console.error('Error creating workspace:', error);
    }
  };

  const deleteWorkspace = async (name: string) => {
    try {
      await invoke<string>('delete_workspace', { workspaceName: name });
      // Update state after deletion
      setWorkspaces(prev => prev.filter(ws => ws.name !== name));
    } catch (error) {
      console.error('Error deleting workspace:', error);
    }
  };

  return (
    <WorkspaceContext.Provider value={{ workspaces, addWorkspace, deleteWorkspace }}>
      {children}
    </WorkspaceContext.Provider>
  );
};

export const useWorkspaces = () => {
  const context = useContext(WorkspaceContext);
  if (!context) {
    throw new Error('useWorkspaces must be used within a WorkspaceProvider');
  }
  return context;
};
