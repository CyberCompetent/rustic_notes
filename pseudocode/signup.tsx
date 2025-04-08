// Core signup variables
signupData ← { username: "", email: "", password: "" }
errorMessage ← ""

// PROCEDURE to handle input field changes
PROCEDURE HandleInputChange(field, value)
    signupData[field] ← value
ENDPROCEDURE

// PROCEDURE to submit signup form
PROCEDURE HandleSignupSubmit
    // Client-side validation
    IF LENGTH(signupData.username) < 3 THEN
        errorMessage ← "Username must be longer than 3 characters"
        RETURN
    ENDIF

    IF NOT ValidateEmail(signupData.email) OR NOT ValidatePassword(signupData.password) THEN
        errorMessage ← "Please check your email format and password requirements"
        RETURN
    ENDIF

    // Attempt to sign up
    TRY
        response ← SendToServer("/api/signup", signupData)
        
        IF response.success = FALSE THEN
            IF response.error = "EMAIL_EXISTS" THEN
                errorMessage ← "This email is already registered"
            ELSE IF response.error = "USERNAME_EXISTS" THEN
                errorMessage ← "This username is already taken"
            ELSE
                errorMessage ← "Signup failed. Please try again."
            ENDIF
            RETURN
        ENDIF

        CALL ShowSuccessMessage("Account created successfully! Please login.")
        CALL NavigateTo("/Login")

    CATCH error
        errorMessage ← "Server connection error. Please try again."
    ENDTRY
ENDPROCEDURE

// FUNCTION for backend signup request
FUNCTION HandleSignupRequest(data) RETURNS RECORD
    IF EmailExistsInDatabase(data.email) THEN
        RETURN { success: FALSE, error: "EMAIL_EXISTS" }
    ENDIF

    IF UsernameExistsInDatabase(data.username) THEN
        RETURN { success: FALSE, error: "USERNAME_EXISTS" }
    ENDIF

    hashedPassword ← HashPassword(data.password)
    userId ← CreateUserInDatabase(data.username, data.email, hashedPassword)
    CALL CreateUserSettingsInDatabase(userId)

    RETURN { success: TRUE }
ENDFUNCTION
