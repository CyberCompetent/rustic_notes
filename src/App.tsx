//import { useState } from "react";
//import reactLogo from "./assets/react.svg";
//import { invoke } from "@tauri-apps/api/core";
import "./App.css";

import { WorkspaceProvider } from './components/WorkspaceContext'; // Adjust the import path as needed

import TopBar from './components/TopBar';
import SideBar from './components/SideBar';

function App() {
  return (
<WorkspaceProvider>
<div className="flex h-dvh font-sans">
  <SideBar />
  <div className="flex flex-col flex-grow">
    <TopBar />
    <div className="flex-grow h-full"> {/* Explicit height for debugging */}
      <textarea
        className="w-full h-full p-4 text-base bg-gray-50 text-gray-800 border-none outline-none box-border"
        placeholder="Start writing your notes here..."
      ></textarea>
    </div>
  </div>
</div>
</WorkspaceProvider>

  );
}

export default App;

