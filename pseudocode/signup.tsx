// Signup.ts
// Core variables
signupData = { username: '', email: '', password: '' };
errorMessage = '';

// Form handling
function handleInputChange(field, value) {
  signupData[field] = value;
}

// Signup process
async function handleSignupSubmit() {
  // Client-side validation
  if (signupData.username.length < 3) {
    errorMessage = 'Username must be longer than 3 characters';
    return;
  }
  
  if (!validateEmail(signupData.email) || !validatePassword(signupData.password)) {
    errorMessage = 'Please check your email format and password requirements';
    return;
  }
  
  // Send to backend
  try {
    response = sendToServer('/api/signup', signupData);
    
    if (!response.success) {
      // Handle redundancy validation failures
      if (response.error === 'EMAIL_EXISTS') {
        errorMessage = 'This email is already registered';
      } else if (response.error === 'USERNAME_EXISTS') {
        errorMessage = 'This username is already taken';
      } else {
        errorMessage = 'Signup failed. Please try again.';
      }
      return;
    }
    
    // Success - show message
    showSuccessMessage('Account created successfully! Please login.');
    navigateTo('/Login');
    
  } catch (error) {
    errorMessage = 'Server connection error. Please try again.';
  }
}

// Signup backend logic
function handleSignupRequest(data) {
  // Check for existing email/username
  if (emailExistsInDatabase(data.email)) {
    return { success: false, error: 'EMAIL_EXISTS' };
  }
  
  if (usernameExistsInDatabase(data.username)) {
    return { success: false, error: 'USERNAME_EXISTS' };
  }
  
  // Create account
  hashedPassword = hashPassword(data.password);
  userId = createUserInDatabase(data.username, data.email, hashedPassword);
  createUserSettingsInDatabase(userId);
  
  return { success: true };
}