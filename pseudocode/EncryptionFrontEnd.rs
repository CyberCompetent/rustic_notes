// Add a user to a workspace
function add_user_to_workspace($workspace_id, $user_id, $user_public_key) {
    // Get the workspace AES key from database
    $aes_key = get_workspace_aes_key($workspace_id);

    // Encrypt the AES key using the new user's public key
    $encrypted_aes_key = encrypt_with_public_key($aes_key, $user_public_key);

    // Store this encrypted AES key linked to the user + workspace
    store_encrypted_workspace_key($workspace_id, $user_id, $encrypted_aes_key);
}

// Remove a user from a workspace
function remove_user_from_workspace($workspace_id, $user_id) {
    // Delete the encrypted AES key so the user cannot access it anymore
    delete_encrypted_workspace_key($workspace_id, $user_id);
}

// Handle login request
function login($username, $password) {
    // Authenticate user (e.g. check password hash)
    if (auth($username, $password)) {
        // Get all encrypted workspace AES keys for the user
        $encrypted_keys = get_user_encrypted_keys($username);
        return $encrypted_keys;
    } else {
        return "Invalid login";
    }
}
