import React, { useState } from 'react';
import { useWorkspaces } from '@/context/WorkspaceContext';
import Modal from './AddWorkspaceModal';

const WorkspacesSettings: React.FC = () => {
    const { workspaces, addWorkspace, deleteWorkspace } = useWorkspaces();
    const [checkedWorkspaces, setCheckedWorkspaces] = useState<Record<string, boolean>>({});
    const [isAddWorkspaceModalOpen, setIsAddWorkspaceModalOpen] = useState(false);
    const [newWorkspaceName, setNewWorkspaceName] = useState('');

    const handleCheckboxChange = (workspaceName: string) => {
        setCheckedWorkspaces((prev) => ({
            ...prev,
            [workspaceName]: !prev[workspaceName],
        }));
    };

    const handleDeleteWorkspaces = () => {
        const workspacesToDelete = Object.keys(checkedWorkspaces).filter(
            (workspaceName) => checkedWorkspaces[workspaceName]
        );
        workspacesToDelete.forEach((workspaceName) => deleteWorkspace(workspaceName));
        setCheckedWorkspaces({});
    };

    return (
        <div>
            <h3 className="text-xl font-semibold">Manage Workspaces</h3>
            <div className="flex gap-6 mt-4">
                <button
                    onClick={() => setIsAddWorkspaceModalOpen(true)}
                    className="bg-bu text-white px-4 py-2 rounded hover:bg-bu-1"
                >
                    Add Workspace
                </button>
                <button
                    onClick={handleDeleteWorkspaces}
                    className="bg-bu text-white px-4 py-2 rounded hover:bg-bu-1"
                >
                    Delete
                </button>
            </div>

            <table className="table w-full mt-4">
                <thead>
                    <tr>
                        <th><input type="checkbox" className="checkbox" /></th>
                        <th>Name</th>
                        <th>Members</th>
                        <th>Owners</th>
                        <th></th>
                    </tr>
                </thead>
                <tbody>
                    {workspaces.map((workspace) => (
                        <tr key={workspace.name}>
                            <td>
                                <input
                                    type="checkbox"
                                    className="checkbox"
                                    checked={!!checkedWorkspaces[workspace.name]}
                                    onChange={() => handleCheckboxChange(workspace.name)}
                                />
                            </td>
                            <td>{workspace.name}</td>
                            <td>example_acc, example_acc</td>
                            <td>example_acc</td>
                            <td><button className="btn btn-ghost btn-xs">details</button></td>
                        </tr>
                    ))}
                </tbody>
            </table>

            {isAddWorkspaceModalOpen && (
                <Modal
                    onClose={() => setIsAddWorkspaceModalOpen(false)}
                    onAdd={(workspaceName) => {
                        addWorkspace({ name: workspaceName, type: 'workspace', children: [] });
                        setNewWorkspaceName('');
                    }}
                    workspaceName={newWorkspaceName}
                    setWorkspaceName={setNewWorkspaceName}
                />
            )}
        </div>
    );
};

export default WorkspacesSettings;
