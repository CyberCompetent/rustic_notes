//import { useState } from "react";
//import reactLogo from "./assets/react.svg";
//import { invoke } from "@tauri-apps/api/core";
//import "./App.css";

import SettingsMenu from '@/components/SideBar/SettingsMenu';
import { WorkspaceProvider } from '@/context/WorkspaceContext'; // Adjust the import path as needed
import { SettingsProvider } from "@/context/SettingsContext";

import TopBar from './components/TopBar';
import SideBar from './components/SideBar';
import TextEditor from './components/TextEditor';


function NoteEditor() {
  return (
    <SettingsProvider>
      <WorkspaceProvider>
        <div className="flex h-dvh font-sans">
          <SideBar />
          <div className="flex flex-col flex-grow">
            <TopBar />
            <div className=" pt-2 flex-grow h-full bg-bg text-text"> {/* Explicit height for debugging */}
              <TextEditor
              ></TextEditor>
            </div>
          </div>
        </div>
        <SettingsMenu />
      </WorkspaceProvider>
    </SettingsProvider>
  );
}

export default NoteEditor;

