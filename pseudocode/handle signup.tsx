PROCEDURE RegisterUser(userDetails)
    // Initialize variables
    validationResult ← FALSE
    userExists ← FALSE
    verificationCode ← ""
    clientCode ← ""
    codeMatches ← FALSE
    
    // Receive input validated details from client side
    
    // Revalidate and sanitize details in case the client side validation was bypassed
    validationResult ← ValidateAndSanitizeInput(userDetails)
    
    // Check if validation failed
    IF validationResult = FALSE THEN
        // Send error message back to client side
        SendErrorMessage("Username must be longer than 3 characters")
        RETURN
    ENDIF
    
    // Check if the user name or email address are already in the accounts table
    userExists ← CheckIfUserExists(userDetails.username, userDetails.email)
    
    // If user already exists, send error
    IF userExists = TRUE THEN
        // Send error message back to client side
        SendErrorMessage("Account with this username already exists")
        RETURN
    ENDIF
    
    // Generate and send a validation email to the email address with a code
    verificationCode ← GenerateVerificationCode()
    SendValidationEmail(userDetails.email, verificationCode)
    
    // Tell the client side to render the code input
    RequestCodeFromClient()
    
    // Receive code sent from client
    clientCode ← ReceiveCodeFromClient()
    
    // Compare the code received to the one which was sent
    IF clientCode ≠ verificationCode THEN
        // Codes don't match - send error message
        SendErrorMessage("Incorrect code")
        OfferNewCode()
        RETURN
    ENDIF
    
    // Hash and salt the password
    hashedPassword ← HashAndSaltPassword(userDetails.password)
    
    // Update user details with hashed password
    userDetails.password ← hashedPassword
    
    // Write the details to records in the accounts table
    AddUserToDatabase(userDetails)
    
    // Send a success message to the client side telling them to login
    SendSuccessMessage("Registration successful. You can now login.")
ENDPROCEDURE

FUNCTION ValidateAndSanitizeInput(userDetails) RETURNS BOOLEAN
    // Check username length
    IF LENGTH(userDetails.username) < 4 THEN
        RETURN FALSE
    ENDIF
    
    // Sanitize username to prevent injection attacks
    userDetails.username ← SanitizeString(userDetails.username)
    
    // Validate email format
    IF NOT IsValidEmail(userDetails.email) THEN
        RETURN FALSE
    ENDIF
    
    // Sanitize email
    userDetails.email ← SanitizeString(userDetails.email)
    
    // Check password complexity
    IF NOT IsPasswordComplex(userDetails.password) THEN
        RETURN FALSE
    ENDIF
    
    // All validation checks passed
    RETURN TRUE
ENDFUNCTION

FUNCTION CheckIfUserExists(username, email) RETURNS BOOLEAN
    // Query database for existing username or email
    result ← QueryDatabase("SELECT COUNT(*) FROM accounts WHERE username = ? OR email = ?", username, email)
    
    // If count > 0, user exists
    IF result > 0 THEN
        RETURN TRUE
    ELSE
        RETURN FALSE
    ENDIF
ENDFUNCTION

FUNCTION GenerateVerificationCode() RETURNS STRING
    // Generate random 6-digit code
    code ← ""
    FOR i ← 1 TO 6
        digit ← RANDOM(0, 9)
        code ← code & TOSTRING(digit)
    NEXT i
    
    RETURN code
ENDFUNCTION

FUNCTION HashAndSaltPassword(password) RETURNS STRING
    // Generate random salt
    salt ← GenerateRandomSalt()
    
    // Combine password with salt and hash
    hashedPassword ← ApplyHashFunction(password & salt)
    
    // Return the salt and hash combination
    RETURN salt & ":" & hashedPassword
ENDFUNCTION

PROCEDURE AddUserToDatabase(userDetails)
    // Insert user record into accounts table
    ExecuteQuery("INSERT INTO accounts (username, email, password, registration_date) VALUES (?, ?, ?, ?)", 
                 userDetails.username, userDetails.email, userDetails.password, CURRENTDATE())
ENDPROCEDURE