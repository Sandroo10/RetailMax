import { useContext, useState } from 'react';
import { UserContext } from '../../contexts/User.Context';
import DefaultProfile from '../../assets/pfp.png';


const ProfilePage = () => {
    const { username, setUsername, profilePicture } = useContext(UserContext);
    const [newUsername, setNewUsername] = useState(username || '');

    const handleUsernameChange = () => {
        setUsername(newUsername); 
    };

    return (
        <div className="max-w-lg mx-auto my-10 p-6 bg-white shadow rounded">
            <h2 className="text-xl font-bold mb-4">Your Profile</h2>
            <img
                src={profilePicture || DefaultProfile}
                alt="Profile"
                className="w-20 h-20 rounded-full mx-auto mb-6"
            />
            <div className="mb-4">
                <label htmlFor="username" className="block text-sm font-medium">
                    Username
                </label>
                <input
                    type="text"
                    id="username"
                    value={newUsername}
                    onChange={(e) => setNewUsername(e.target.value)}
                    className="w-full p-2 border rounded mt-1"
                />
            </div>
            <button
                onClick={handleUsernameChange}
                className="px-4 py-2 bg-[rgb(41,115,178)] text-white rounded hover:bg-blue-500"
            >
                Save Changes
            </button>
        </div>
    );
};

export default ProfilePage;
