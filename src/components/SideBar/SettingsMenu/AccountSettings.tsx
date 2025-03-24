import React, { useState } from 'react';
import SettingsItem from './SettingsItem';

const AccountSettings: React.FC = () => {
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [activeOption, setActiveOption] = useState<string | null>(null);

    const options = [
        { name: 'Change Profile Picture', svg: 'brightness_1' },
        { name: 'Change Username', svg: 'content_paste' },
        { name: 'Change Password', svg: 'password' },
        { name: 'Change Email', svg: 'email' },
        { name: 'Delete Account', svg: 'warning' },
    ];

    const renderOptionContent = (option: string) => {
        switch (option) {
            case 'Change Profile Picture':
                return (
                    <div className="mt-2 p-2 bg-1-1 rounded">
                        <label className="block text-sm font-medium">Upload New Profile Picture:</label>
                        <input type="file" className="mt-2 w-full p-2 bg-1 rounded" />
                    </div>
                );
            case 'Change Username':
                return (
                    <div className="mt-2 p-2 bg-1-1 rounded">
                        <label className="block text-sm font-medium">Enter New Username:</label>
                        <input
                            type="text"
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                            className="mt-2 w-full p-2 bg-1 rounded"
                            placeholder="New Username"
                        />
                        <button className="mt-2 px-4 py-2 bg-bu rounded hover:bg-bu-1">Save</button>
                    </div>
                );
            case 'Change Password':
                return (
                    <div className="mt-2 p-2 bg-1-1 rounded">
                        <label className="block text-sm font-medium">Enter New Password:</label>
                        <input type="password" className="mt-2 w-full p-2 bg-1 rounded" placeholder="New Password" />
                        <button className="mt-2 px-4 py-2 bg-bu rounded hover:bg-bu-1">Change Password</button>
                    </div>
                );
            case 'Change Email':
                return (
                    <div className="mt-2 p-2 bg-1-1 rounded">
                        <label className="block text-sm font-medium">Enter New Email:</label>
                        <input
                            type="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            className="mt-2 w-full p-2 bg-1 rounded"
                            placeholder="New Email"
                        />
                        <button className="mt-2 px-4 py-2 bg-bu rounded hover:bg-bu-1">Update Email</button>
                    </div>
                );
            case 'Delete Account':
                return (
                    <div className="mt-2 p-2 bg-1-1 rounded">
                        <p className="text-red-500">Are you sure? This action cannot be undone.</p>
                        <button className="mt-2 px-4 py-2 bg-red-600 rounded hover:bg-red-700">Delete Account</button>
                    </div>
                );
            default:
                return null;
        }
    };

    return (
        <div>
            {options.map(({ name, svg }) => (
                <div key={name}>
                    <SettingsItem
                        id={name}
                        svg={svg}
                        onClick={() => setActiveOption(activeOption === name ? null : name)}
                        isActive={activeOption === name}
                        className="py-3"
                    >
                        {name}
                    </SettingsItem>
                    {activeOption === name && renderOptionContent(name)}
                </div>
            ))}
        </div>
    );
};

export default AccountSettings;