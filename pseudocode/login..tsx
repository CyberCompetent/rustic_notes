// @ts-nocheck
// Login.ts
// Core variables
loginData = { username: '', password: '' };
errorMessage = '';

// Form handling
function handleInputChange(field, value) {
  loginData[field] = value;
}

// Login process
async function handleLoginSubmit() {
  try {
    response = sendToServer('/api/login', loginData);
    
    if (!response.success) {
      errorMessage = 'Incorrect username or password';
      return;
    }
    
    // Sync user data
    saveToLocalStorage('userSettings', response.settings);
    saveToLocalStorage('userNotes', response.notes);
    
    // Navigate to editor
    navigateTo('/NoteEditor');
    
  } catch (error) {
    errorMessage = 'Server connection error. Please try again.';
  }
}

// Login backend logic
function handleLoginRequest(data) {
  user = findUserByUsername(data.username);
  
  if (!user || !verifyPassword(data.password, user.password)) {
    return { success: false };
  }
  
  // Get user data
  settings = getUserSettings(user.id);
  notes = getUserNotes(user.id);
  
  return { 
    success: true, 
    settings: settings,
    notes: notes
  };
}