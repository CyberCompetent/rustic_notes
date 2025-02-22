import React from 'react';

interface AddWorkspaceModalProps {
  onClose: () => void;
  onAdd: (workspaceName: string) => void;
  workspaceName: string; // Accept workspaceName as a prop
  setWorkspaceName: (name: string) => void; // Accept setter function as a prop
}

const AddWorkspaceModal: React.FC<AddWorkspaceModalProps> = ({ onClose, onAdd, workspaceName, setWorkspaceName }) => {
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (workspaceName) {
      onAdd(workspaceName); // Call onAdd with the workspace name
      setWorkspaceName(''); // Reset the workspace name after adding
      onClose(); // Close the modal
    }
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-60">
      <div className="bg-gray-700 text-white rounded-lg shadow-lg p-4">
        <h2 className="text-lg font-semibold mb-2">Add New Workspace</h2>
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            value={workspaceName} // Use the workspaceName prop for controlled input
            onChange={(e) => setWorkspaceName(e.target.value)} // Update the state via setter function
            placeholder="Enter workspace name"
            className="p-2 rounded w-full bg-gray-800 mb-2"
            required
          />
          <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600">Add Workspace</button>
        </form>
        <button className="mt-2 bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600" onClick={onClose}>
          Cancel
        </button>
      </div>
    </div>
  );
};

export default AddWorkspaceModal;
