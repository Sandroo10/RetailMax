import { createContext, ReactNode, useState, useCallback, useEffect } from "react";
import DefaultProfile from "../assets/pfp.png";
import { getProfileInfo } from "../supabase/account/index"; // Fetch profile info

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
  username: "Anonymous",
  handleSetUser: () => null,
  setUsername: () => null,
  profilePicture: DefaultProfile,
  setProfilePicture: () => null,
});

export const UserProvider = ({ children }: { children: ReactNode }) => {
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [username, setUsername] = useState<string>("Anonymous");
  const [profilePicture, setProfilePicture] = useState<string>(DefaultProfile);

  const handleSetUser = useCallback((user: User) => {
    setCurrentUser(user);
  }, []);

  useEffect(() => {
    const fetchProfileInfo = async () => {
      if (currentUser) {
        try {
          const profile = await getProfileInfo(currentUser.uid); // Replace `uid` with your user ID key
          if (profile) {
            setUsername(profile.username || "Anonymous");
            setProfilePicture(profile.avatar_url || DefaultProfile);
          }
        } catch (error) {
          if (error instanceof Error) {
            console.error("Error fetching profile info:", error.message);
          } else {
            console.error("An unexpected error occurred:", error);
          }
        }
      }
    };
  
    fetchProfileInfo();
  }, [currentUser]);
  

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
