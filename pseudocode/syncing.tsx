// ===== NOTEPAGE SAVING AND SYNC PROCESS =====

PROCEDURE SaveAndSyncNotepage(notepageData, userSettings)
    // Initialize variables
    localSaveStatus ← FALSE
    compressedData ← NULL
    encryptedData ← NULL
    syncStatus ← FALSE
    
    // Save data to local database first
    localSaveStatus ← SaveToLocalDatabase(notepageData, userSettings)
    
    // Check if local save was successful
    IF localSaveStatus = FALSE THEN
        OUTPUT "Error: Failed to save to local database"
        RETURN
    ENDIF
    
    // Compress and encrypt relevant data for syncing
    compressedData ← CompressData(notepageData)
    encryptedData ← EncryptData(compressedData, userSettings.encryptionKey)
    
    // Check if compression and encryption were successful
    IF encryptedData = NULL THEN
        OUTPUT "Error: Failed to prepare data for sync"
        RETURN
    ENDIF
    
    // Send encrypted data to server
    syncStatus ← SendToServer(encryptedData, notepageData.id)
    
    // Check if server sync was successful
    IF syncStatus = TRUE THEN
        OUTPUT "Note page successfully saved and synced"
    ELSE
        OUTPUT "Warning: Saved locally but sync failed"
    ENDIF
ENDPROCEDURE

FUNCTION SaveToLocalDatabase(notepageData, userSettings) RETURNS BOOLEAN
    // Prepare data for local storage
    localData ← FormatForLocalStorage(notepageData, userSettings)
    
    // Attempt to save to local database
    TRY
        result ← LocalDatabase.saveData(localData)
        RETURN result
    CATCH error
        LogError("Local save error", error)
        RETURN FALSE
    ENDTRY
ENDFUNCTION

// ===== LOGIN AND DATA RETRIEVAL PROCESS =====

PROCEDURE LoginAndRetrieveData(username, password)
    // Initialize variables
    loginSuccess ← FALSE
    jwtToken ← ""
    serverData ← NULL
    decryptedData ← NULL
    localSaveStatus ← FALSE
    
    // Attempt to login
    loginResult ← AttemptLogin(username, password)
    
    // Check if login was successful
    IF loginResult.success = TRUE THEN
        loginSuccess ← TRUE
        jwtToken ← loginResult.token
    ELSE
        OUTPUT "Error: Login failed"
        RETURN
    ENDIF
    
    // Request data from server using JWT token
    serverData ← RequestDataFromServer(jwtToken)
    
    // Check if data retrieval was successful
    IF serverData = NULL THEN
        OUTPUT "Error: Failed to retrieve data from server"
        RETURN
    ENDIF
    
    // Decrypt the received data
    decryptedData ← DecryptData(serverData, loginResult.decryptionKey)
    
    // Check if decryption was successful
    IF decryptedData = NULL THEN
        OUTPUT "Error: Failed to decrypt data"
        RETURN
    ENDIF
    
    // Save decrypted data to local database
    localSaveStatus ← SaveToLocalDatabase(decryptedData, loginResult.userSettings)
    
    // Check if local save was successful
    IF localSaveStatus = TRUE THEN
        OUTPUT "Data successfully retrieved and saved locally"
    ELSE
        OUTPUT "Error: Failed to save retrieved data locally"
    ENDIF
ENDPROCEDURE

FUNCTION AttemptLogin(username, password) RETURNS LoginResult
    // Create login request
    loginRequest ← CreateLoginRequest(username, password)
    
    // Send login request to server
    response ← SendLoginRequest(loginRequest)
    
    // Process response
    IF response.statusCode = 200 THEN
        // Create and return login result with token and keys
        result ← CreateLoginResult(TRUE, response.token, response.decryptionKey, response.userSettings)
        RETURN result
    ELSE
        // Return failed login result
        RETURN CreateLoginResult(FALSE, "", NULL, NULL)
    ENDIF
ENDFUNCTION

FUNCTION RequestDataFromServer(jwtToken) RETURNS Data
    // Create data request with JWT token
    request ← CreateDataRequest(jwtToken)
    
    // Send request to server
    response ← SendDataRequest(request)
    
    // Check if request was successful
    IF response.statusCode = 200 THEN
        RETURN response.data
    ELSE
        LogError("Data request failed", response.statusCode, response.message)
        RETURN NULL
    ENDIF
ENDFUNCTION