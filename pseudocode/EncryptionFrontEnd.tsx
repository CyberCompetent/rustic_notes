// User logs in
PROCEDURE login(username, password)
    // Derive or decrypt the user's private key from their password
    privateKey ← DECRYPT_PRIVATE_KEY(password)

    // Request the encrypted workspace AES keys from the server
    encryptedAESKeys ← SERVER_API.GET_ENCRYPTED_AES_KEYS(username)

    // Initialise empty list to hold decrypted AES keys
    aesKeys ← EMPTY_LIST

    // For each encrypted key, decrypt it using the private key
    FOR EACH encryptedKey IN encryptedAESKeys DO
        aesKey ← DECRYPT_WITH_PRIVATE_KEY(encryptedKey, privateKey)
        APPEND aesKey TO aesKeys
    END FOR

    // Store the decrypted AES keys locally
    CALL STORE_KEYS_LOCALLY(aesKeys)
END PROCEDURE

// User creates a new workspace
PROCEDURE create_workspace()
    // Generate a new random AES key for the workspace
    aesKey ← GENERATE_RANDOM_AES_KEY()

    // Get the user's own public key
    publicKey ← GET_OWN_PUBLIC_KEY()

    // Encrypt the AES key using the public key
    encryptedAESKey ← ENCRYPT_WITH_PUBLIC_KEY(aesKey, publicKey)

    // Send the encrypted AES key to the server to create the workspace
    CALL SERVER_API.CREATE_WORKSPACE(encryptedAESKey)
END PROCEDURE

// Decrypt and view a note
FUNCTION view_note(encryptedNote, workspaceID)
    // Load the AES key for this specific workspace
    aesKey ← LOAD_AES_KEY_FOR_WORKSPACE(workspaceID)

    // Decrypt the note using the AES key
    decryptedNote ← DECRYPT_WITH_AES(encryptedNote, aesKey)

    RETURN decryptedNote
END FUNCTION
