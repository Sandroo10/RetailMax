import { useContext } from "react";
import { UserContext } from "@/contexts/User.Context";

export const useUserContext = () => {
  return useContext(UserContext);
};
