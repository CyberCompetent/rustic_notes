PROCEDURE ChangeUserDetails(jwtToken, detailType, newValue)
    // Client sends change detail request with JWT token
    changeRequest = {
        "token": jwtToken,
        "detailType": detailType,
        "newValue": newValue
    }
    
    // Server verifies user identity via JWT token
    decodedToken = DecodeJWT(changeRequest.token)
    userID = decodedToken.userID
    
    // Validate what the user wants to change
    IF ValidateDetailChange(detailType, newValue) THEN
        // Update the specified detail in the database
        query = "UPDATE accounts SET " + detailType + " = ? WHERE userID = ?"
        ExecuteDatabaseQuery(query, [newValue, userID])
        
        // Send success message back to client
        RETURN {
            "status": "success",
            "message": "User details updated successfully"
        }
    ELSE
        // Validation failed, send error message
        RETURN {
            "status": "error",
            "message": "Invalid detail change request"
        }
    END IF
END PROCEDURE