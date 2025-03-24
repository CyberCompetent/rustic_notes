import React, { createContext, useContext, useState } from "react";

type SettingsContextType = {
  isOpen: boolean;
  initialSection: "Account" | "Workspaces" | "Theme"; // Only these options available
  openSettings: (section: "Account" | "Workspaces" | "Theme") => void;
  closeSettings: () => void;
};

const SettingsContext = createContext<SettingsContextType | undefined>(undefined);

export const SettingsProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [initialSection, setInitialSection] = useState<"Account" | "Workspaces" | "Theme">("Account");

  const openSettings = (section: "Account" | "Workspaces" | "Theme") => {
    setInitialSection(section);
    setIsOpen(true);
  };

  const closeSettings = () => setIsOpen(false);

  return (
    <SettingsContext.Provider value={{ isOpen, initialSection, openSettings, closeSettings }}>
      {children}
    </SettingsContext.Provider>
  );
};

export const useSettings = () => {
  const context = useContext(SettingsContext);
  if (!context) throw new Error("useSettings must be used within a SettingsProvider");
  return context;
};
