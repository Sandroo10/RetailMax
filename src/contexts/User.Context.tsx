import { createContext, ReactNode, useState, useCallback } from 'react';
import DefaultProfile from '../assets/pfp.png'

type User = {
    uid: string;
    email?: string;
    displayName?: string;
    photoURL?: string;
    token: string;
} | null;

interface UserContextType {
    currentUser: User | null;
    handleSetUser: (user: User) => void;
    username: string;
    setUsername: React.Dispatch<React.SetStateAction<string>>;
    profilePicture: string;
    setProfilePicture: React.Dispatch<React.SetStateAction<string>>;
}

export const UserContext = createContext<UserContextType>({
    currentUser: null,
    username: 'Anonymous',
    handleSetUser: () => null,
    setUsername: () => null,
    profilePicture: DefaultProfile,
    setProfilePicture: () => null,
});

export const UserProvider = ({ children }: { children: ReactNode }) => {
    const [currentUser, setCurrentUser] = useState<User | null>(null);
    const [username, setUsername] = useState<string>('Anonymous');
    const [profilePicture, setProfilePicture] = useState<string>(DefaultProfile);

    const handleSetUser = useCallback((user: User) => {
        setCurrentUser(user);
      }, []);

    const value: UserContextType = {
        currentUser,
        handleSetUser,
        username,
        setUsername,
        profilePicture,
        setProfilePicture,
    };

    return <UserContext.Provider value={value}>{children}</UserContext.Provider>;
};