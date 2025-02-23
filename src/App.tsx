//import { useState } from "react";
//import reactLogo from "./assets/react.svg";
//import { invoke } from "@tauri-apps/api/core";
import "./App.css";

import { WorkspaceProvider } from './components/WorkspaceContext'; // Adjust the import path as needed

import TopBar from './components/TopBar';
import SideBar from './components/SideBar';
import TextEditor from './components/TextEditor';


function App() {
  return (
<WorkspaceProvider>
<div className="flex h-dvh font-sans">
  <SideBar />
  <div className="flex flex-col flex-grow">
    <TopBar />
    <div className="flex-grow h-full bg-gray-200"> {/* Explicit height for debugging */}
      <TextEditor
      ></TextEditor>
    </div>
  </div>
</div>
</WorkspaceProvider>

  );
}

export default App;

