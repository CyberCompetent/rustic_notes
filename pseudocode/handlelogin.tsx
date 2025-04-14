PROCEDURE Login(username, password)
    // Client side sends login details to server
    loginData = {
        "username": username,
        "password": password
    }
    
    // Server side validates and sanitizes inputs
    sanitizedUsername = SanitizeInput(loginData.username)
    sanitizedPassword = SanitizeInput(loginData.password)
    
    // Check details against database records
    query = "SELECT * FROM accounts WHERE username = " + sanitizedUsername
    result = ExecuteDatabaseQuery(query)
    
    // Verify if credentials match
    IF result IS NOT empty THEN
        storedPasswordHash = result.passwordHash
        IF VerifyPassword(sanitizedPassword, storedPasswordHash) THEN
            // Generate JWT token with account details
            userDetails = {
                "userID": result.userID,
                "username": result.username,
                "role": result.role
                // Other relevant info from database
            }
            
            token = GenerateJWT(userDetails)
            
            // Send token to client
            RETURN {
                "status": "success",
                "token": token,
                "redirect": "/noteEditor"
            }
        ELSE
            // Passwords don't match
            RETURN {
                "status": "error",
                "message": "Invalid username or password"
            }
        END IF
    ELSE
        // No matching username found
        RETURN {
            "status": "error", 
            "message": "Invalid username or password"
        }
    END IF
END PROCEDURE