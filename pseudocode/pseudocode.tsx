// @ts-nocheck

// SettingsContext.tsx
export function openSettings(section) {
    setSection(section);    // Set the section state
    setIsOpen(true);         // Open the settings
}

// SettingsButton.tsx
import { openSettings } from 'SettingsContext.tsx';  // import the openSettings function

function handleClick() {
    openSettings("Account");  // Open settings with "Account" section selected
}

//WorkspaceButton.tsx
import { openSettings } from 'SettingsContext.tsx';  // import the openSettings function

function handleClick() {
    openSettings("Workspaces");  // Open settings with "Workspaces" section selected
}

//SettingsMenu.tsx
import { SettingsContext } from 'SettingsContext.tsx';  // Assuming SettingsContext is exported

function SettingsMenu() {
    const { isOpen } = useContext(SettingsContext);  // Get isOpen from context
    const { section } = useContext(SettingsContext);  // Get section from context

    if (isOpen) {
        renderUi(section);  // Render the UI if settings are open with the correct section selected
    } else {
        return null;  // Don't render anything if settings are closed
    }
}
