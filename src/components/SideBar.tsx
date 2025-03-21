import React from 'react';
import ProfileButton from './ProfileButton';
import SortButton from './SortButton';
import SearchBar from './SearchBar';
import SettingsButton from './SettingsButton';
import FileTree from './FileTree';

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
