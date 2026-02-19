import {
  createContext,
  useCallback,
  useEffect,
  useMemo,
  useState,
} from "react";
import type { ReactNode } from "react";
import { getProfileInfo } from "@/supabase/account";
import { defaultProfileImage } from "@/assets";
import type { AuthUser } from "./types";

interface UserContextType {
  currentUser: AuthUser | null;
  handleSetUser: (user: AuthUser | null) => void;
  username: string;
  setUsername: React.Dispatch<React.SetStateAction<string>>;
  profilePicture: string;
  setProfilePicture: React.Dispatch<React.SetStateAction<string>>;
}

export const UserContext = createContext<UserContextType>({
  currentUser: null,
  handleSetUser: () => undefined,
  username: "Anonymous",
  setUsername: () => undefined,
  profilePicture: defaultProfileImage,
  setProfilePicture: () => undefined,
});

export const UserProvider = ({ children }: { children: ReactNode }) => {
  const [currentUser, setCurrentUser] = useState<AuthUser | null>(null);
  const [username, setUsername] = useState("Anonymous");
  const [profilePicture, setProfilePicture] = useState(defaultProfileImage);

  const handleSetUser = useCallback((user: AuthUser | null) => {
    setCurrentUser(user);
  }, []);

  useEffect(() => {
    if (!currentUser) {
      setUsername("Anonymous");
      setProfilePicture(defaultProfileImage);
      return;
    }

    const fetchProfileInfo = async () => {
      try {
        const profile = await getProfileInfo(currentUser.uid);
        setUsername(profile.username || "Anonymous");
        setProfilePicture(profile.avatar_url || defaultProfileImage);
      } catch (error) {
        if (error instanceof Error) {
          console.error("Error fetching profile info:", error.message);
        } else {
          console.error("Unexpected profile fetch error:", error);
        }
      }
    };

    void fetchProfileInfo();
  }, [currentUser]);

  const value = useMemo<UserContextType>(
    () => ({
      currentUser,
      handleSetUser,
      username,
      setUsername,
      profilePicture,
      setProfilePicture,
    }),
    [currentUser, handleSetUser, username, profilePicture],
  );

  return <UserContext.Provider value={value}>{children}</UserContext.Provider>;
};
