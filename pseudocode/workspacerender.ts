// Load the NoteEditor and initialise the workspace view
PROCEDURE InitialiseNoteEditor
    // Load all visual and functional components of the NoteEditor
    CALL LoadNoteEditorComponents()
    
    // Fetch list of existing workspaces from the backend database
    workspaces ← FetchWorkspacesFromDatabase()
    
    // If no workspaces exist, create a default one
    IF LENGTH(workspaces) = 0 THEN
        CALL CreateDefaultWorkspace()
    ENDIF
    
    // Load the workspaces into the file tree component
    CALL LoadWorkspacesIntoFileTree(workspaces)
    
    // Let the user choose a workspace to open
    selectedWorkspace ← UserSelectsWorkspace()
    
    // If the selected workspace contains notes, render them
    IF HasNotepages(selectedWorkspace) THEN
        CALL RenderNotepageSelectors(selectedWorkspace)
    ENDIF
ENDPROCEDURE

// Show workspace settings and respond to user actions (create/delete/rename)
PROCEDURE ManageWorkspaces
    // Display the settings menu for workspace management
    CALL RenderSettingsMenu()
    
    // Fetch the list of workspaces and render it as a table
    workspaceList ← FetchWorkspacesFromDatabase()
    CALL RenderWorkspaceTable(workspaceList)
    
    // Get the user's chosen action from the menu
    action ← GetUserAction()

    // Perform the chosen action
    IF action = "create" THEN
        CALL CreateWorkspace()
    ELSE IF action = "delete" THEN
        // Ask which workspace to delete and delete it
        workspaceID ← GetUserSelectedWorkspaceID()
        CALL DeleteWorkspace(workspaceID)
    ELSE IF action = "rename" THEN
        // Ask which workspace to rename and rename it
        workspaceID ← GetUserSelectedWorkspaceID()
        CALL RenameWorkspace(workspaceID)
    ENDIF
ENDPROCEDURE

// Create a new workspace after validating the user's input
PROCEDURE CreateWorkspace
    // Ask the user to enter a workspace name
    DISPLAY "Enter name for new workspace:"
    name ← USERINPUT

    // Validate the entered name
    valid ← __InternalValidateName(name)
    
    // If valid, add it to the database; otherwise show an error
    IF valid = TRUE THEN
        CALL AddWorkspaceToDatabase(name)
    ELSE
        DISPLAY "Error: Invalid workspace name"
    ENDIF
ENDPROCEDURE

// Rename an existing workspace with validated input
PROCEDURE RenameWorkspace(workspaceID)
    // Ask the user to enter the new name
    DISPLAY "Enter new name for workspace:"
    name ← USERINPUT

    // Validate the new name
    valid ← __InternalValidateName(name)
    
    // Update the name in the database if valid, otherwise show an error
    IF valid = TRUE THEN
        CALL UpdateWorkspaceName(workspaceID, name)
    ELSE
        DISPLAY "Error: Invalid workspace name"
    ENDIF
ENDPROCEDURE

// Delete the selected workspace
PROCEDURE DeleteWorkspace(workspaceID)
    // Remove the selected workspace from the backend
    CALL RemoveWorkspaceFromDatabase(workspaceID)
ENDPROCEDURE

// Hidden validation function to check for empty input
FUNCTION __InternalValidateName(name) RETURNS BOOLEAN
    // Reject empty strings as invalid names
    IF name = "" THEN
        RETURN FALSE
    ENDIF

    // Input is considered valid
    RETURN TRUE
ENDFUNCTION
