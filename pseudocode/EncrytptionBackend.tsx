// Add a user to a workspace
PROCEDURE add_user_to_workspace(workspaceID, userID, userPublicKey)
    // Retrieve the AES key for the workspace
    aesKey ← GET_WORKSPACE_AES_KEY(workspaceID)

    // Encrypt the AES key with the user's public key
    encryptedAESKey ← ENCRYPT_WITH_PUBLIC_KEY(aesKey, userPublicKey)

    // Store the encrypted key, linked to the user and workspace
    CALL STORE_ENCRYPTED_WORKSPACE_KEY(workspaceID, userID, encryptedAESKey)
END PROCEDURE

// Remove a user from a workspace
PROCEDURE remove_user_from_workspace(workspaceID, userID)
    // Delete the user’s encrypted AES key for that workspace
    CALL DELETE_ENCRYPTED_WORKSPACE_KEY(workspaceID, userID)
END PROCEDURE

// Handle login request
FUNCTION login(username, password)
    // Authenticate the user credentials
    IF AUTH(username, password) THEN
        // If valid, return all AES keys encrypted for the user
        encryptedKeys ← GET_USER_ENCRYPTED_KEYS(username)
        RETURN encryptedKeys
    ELSE
        RETURN "Invalid login"
    END IF
END FUNCTION
