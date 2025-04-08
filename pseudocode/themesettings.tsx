// @ts-nocheck

//ThemeSettings.tsx
const savedTheme = rustStorage.getItem('selectedTheme'); //make a request to the rust backend to send the item stored in the database
const savedMode = rustStorage.getItem('darkMode');
const defaultTheme = "DeepIce"
const defaultMode = "Dark"

function setSelectedTheme(theme) { //declaring the function to change the theme in the css varibles
    rootElement.setAttribute('data-theme', theme);
}
function setSelectedMode(mode) { //declaring the function to change the mode in the css varibles 
    rootElement.setAttribute('data-mode', mode);
}


if (savedTheme) { //checks if savedTheme is null (making sure there was a theme stored in the database)
    setSelectedTheme(savedTheme); //if there was a valid saved theme set it to that
  } else {
    setSelectedMode(defaultTheme); //else set it to the default
  }

  if (savedMode) {
    setSelectedMode(savedMode); //if there was a valid saved mode set it to that
  } else {
    setSelectedMode(defaultMode); //else set it to the default
  }

  return { //render as ui
    <ThemeChanger />
    <ModeSwitch />
  }

  //ModeSwitch.tsx
  
  function handleClick() {
      openSettings("Account");  // Open settings with "Account" section selected
  }