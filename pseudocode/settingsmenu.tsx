// PROCEDURE to open the settings menu with a specified section
PROCEDURE OpenSettings(section)
    CALL SetSection(section)    // Set the section state (e.g., "Account" or "Workspaces")
    CALL SetIsOpen(TRUE)        // Set the state to indicate the settings menu is open
ENDPROCEDURE

// PROCEDURE called when the Settings button is clicked
PROCEDURE HandleSettingsClick
    CALL OpenSettings("Account")    // Open settings with the "Account" section selected
ENDPROCEDURE

// PROCEDURE called when the Workspaces button is clicked
PROCEDURE HandleWorkspaceClick
    CALL OpenSettings("Workspaces")    // Open settings with the "Workspaces" section selected
ENDPROCEDURE

// PROCEDURE to render the settings menu based on context values
PROCEDURE RenderSettingsMenu
    isOpen ← GetFromContext("isOpen")        // Get the isOpen boolean value from the context
    section ← GetFromContext("section")      // Get the currently selected section from the context

    IF isOpen = TRUE THEN
        CALL RenderUI(section)    // Render the settings menu UI based on the selected section
    ELSE
        RETURN NULL               // Do not render anything if the settings are closed
    ENDIF
ENDPROCEDURE
