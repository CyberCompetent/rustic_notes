// @ts-nocheck
/* eslint-disable */

PROCEDURE LoadTreeFile()
    // Load workspace structure
    LoadWorkspaceFromDatabase()
    // Fetch notepages from database
    FetchNotepagesForWorkspace()
    // Render notepages in file tree view under workspace
    RenderFileTree()
ENDPROCEDURE

PROCEDURE CreateNewNotepage()
    // When user clicks "new notepage" button
    userInput ← ""
    isValid ← FALSE
    
    // Display modal dialog for notepage name input
    DisplayModal("Enter notepage name:")
    INPUT userInput
    
    // Validate input
    isValid ← ValidateInput(userInput)
    
    IF isValid = TRUE THEN
        // Create new notepage record in database
        newNotepageID ← AddNotepageToDatabase(userInput, currentWorkspaceID, NULL)
        // Update UI to display new notepage
        UpdateUIWithNewNotepage(newNotepageID, userInput)
    ELSE
        // Display error message to user
        OUTPUT "Error: Invalid notepage name"
    ENDIF
ENDPROCEDURE

PROCEDURE OpenNotepage(notepageID)
    // Fetch corresponding notepage JSON data from database using notepage ID
    notepageData ← FetchNotepageData(notepageID)
    // Render JSON data as editable notes in NotEditor
    RenderNotepageInEditor(notepageData)
ENDPROCEDURE

PROCEDURE EditNotes(notepageID)
    // When user edits note content
    noteContent ← GetEditorContent()
    
    // Convert changes to JSON format
    jsonData ← ConvertToJSON(noteContent)
    
    // Store updated JSON in backend database
    UpdateDatabaseWithJSON(notepageID, jsonData)
ENDPROCEDURE

PROCEDURE RenameNotepage(notepageID)
    // When user clicks rename button
    newName ← ""
    isValid ← FALSE
    
    // Display modal dialog for new notepage name
    DisplayModal("Enter new name:")
    INPUT newName
    
    // Validate input
    isValid ← ValidateInput(newName)
    
    IF isValid = TRUE THEN
        // Replace old notepage name with new name in database
        UpdateNotepageName(notepageID, newName)
        // Update UI to reflect renamed notepage
        UpdateUIWithNewName(notepageID, newName)
    ELSE
        // Display error message to user
        OUTPUT "Error: Invalid notepage name"
    ENDIF
ENDPROCEDURE

PROCEDURE DeleteNotepage(notepageID)
    // Remove notepage record from database
    DeleteNotepageFromDatabase(notepageID)
    // Update front-end local storage and UI to reflect deletion
    UpdateUIAfterDeletion(notepageID)
ENDPROCEDURE

PROCEDURE DragNotepage(notepageID, targetID, targetType)
    // When user drags notepage to a new location
    
    IF targetType = "WORKSPACE" THEN
        // Update database entry to change workspace_id value
        UpdateNotepageWorkspace(notepageID, targetID)
        // Update front-end local storage and UI to reflect changes
        UpdateUIAfterWorkspaceChange(notepageID, targetID)
    ELSE IF targetType = "NOTEPAGE" THEN
        // Update database entry to change notepage parent value
        UpdateNotepageParent(notepageID, targetID)
        // Update front-end local storage and UI to reflect changes
        UpdateUIAfterParentChange(notepageID, targetID)
    ENDIF
ENDPROCEDURE

FUNCTION ValidateInput(input) RETURNS BOOLEAN
    // Check if input is not empty
    IF input = "" THEN
        RETURN FALSE
    ENDIF
    
    // Check if input contains only valid characters
    FOR i ← 1 TO LENGTH(input)
        character ← SUBSTRING(input, i, 1)
        IF NOT IsValidCharacter(character) THEN
            RETURN FALSE
        ENDIF
    NEXT i
    
    // Check if name is not already used
    IF IsNameAlreadyUsed(input) THEN
        RETURN FALSE
    ENDIF
    
    RETURN TRUE
ENDFUNCTION