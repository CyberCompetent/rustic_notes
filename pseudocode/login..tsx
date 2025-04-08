// Core login variables
loginData ← { username: "", password: "" }
errorMessage ← ""

// PROCEDURE to handle input field changes
PROCEDURE HandleInputChange(field, value)
    loginData[field] ← value
ENDPROCEDURE

// PROCEDURE to submit login form
PROCEDURE HandleLoginSubmit
    TRY
        response ← SendToServer("/api/login", loginData)    // Send login data to server
        
        IF response.success = FALSE THEN
            errorMessage ← "Incorrect username or password"
            RETURN
        ENDIF

        // Sync user data locally
        CALL SaveToLocalStorage("userSettings", response.settings)
        CALL SaveToLocalStorage("userNotes", response.notes)

        // Redirect to the note editor
        CALL NavigateTo("/NoteEditor")
    
    CATCH error
        errorMessage ← "Server connection error. Please try again."
    ENDTRY
ENDPROCEDURE

// FUNCTION for backend login request
FUNCTION HandleLoginRequest(data) RETURNS RECORD
    user ← FindUserByUsername(data.username)
    
    IF user = NULL OR NOT VerifyPassword(data.password, user.password) THEN
        RETURN { success: FALSE }
    ENDIF

    settings ← GetUserSettings(user.id)
    notes ← GetUserNotes(user.id)

    RETURN {
        success: TRUE,
        settings: settings,
        notes: notes
    }
ENDFUNCTION
