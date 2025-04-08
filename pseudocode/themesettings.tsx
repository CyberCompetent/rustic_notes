// Load saved theme and mode settings from the backend storage
savedTheme ← rustStorage.getItem("selectedTheme")  // Make a request to the Rust backend for the saved theme
savedMode ← rustStorage.getItem("darkMode")        // Make a request to the Rust backend for the saved mode

// Define default theme and mode values
defaultTheme ← "DeepIce"
defaultMode ← "Dark"

// PROCEDURE to apply the selected theme to the page using CSS variables
PROCEDURE SetSelectedTheme(theme)
    CALL rootElement.setAttribute("data-theme", theme)
ENDPROCEDURE

// PROCEDURE to apply the selected mode to the page using CSS variables
PROCEDURE SetSelectedMode(mode)
    CALL rootElement.setAttribute("data-mode", mode)
ENDPROCEDURE

// Apply the saved theme if it exists, otherwise use the default theme
IF savedTheme ≠ NULL THEN
    CALL SetSelectedTheme(savedTheme)       // Set the saved theme from storage
ELSE
    CALL SetSelectedMode(defaultTheme)      // Fall back to the default theme
ENDIF

// Apply the saved mode if it exists, otherwise use the default mode
IF savedMode ≠ NULL THEN
    CALL SetSelectedMode(savedMode)         // Set the saved mode from storage
ELSE
    CALL SetSelectedMode(defaultMode)       // Fall back to the default mode
ENDIF

// RENDER the UI elements for theme and mode switching
RENDER ThemeChanger()
RENDER ModeSwitch()

// PROCEDURE to handle clicking the mode switch
PROCEDURE HandleClick
    CALL OpenSettings("Account")            // Open the settings menu with the "Account" tab active
ENDPROCEDURE