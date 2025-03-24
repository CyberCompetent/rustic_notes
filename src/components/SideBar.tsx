import React from 'react';
import ProfileButton from './SideBar/ProfileButton';
import SortButton from './SideBar/SortButton';
import SearchBar from './SideBar/SearchBar';
import SettingsButton from './SideBar/SettingsButton';
import FileTree from './SideBar/FileTree';

const SideBar: React.FC = () => {
  return (
    <div className="w-64 bg-2 text-white flex flex-col box-border">
      <div className="p-5 bg-1 flex flex-col gap-2 flex-shrink-0 box-border">
        <ProfileButton />
        <SettingsButton />
        <SortButton />
        <SearchBar />
      </div>
      <FileTree />
    </div>
  );
};

export default SideBar;
