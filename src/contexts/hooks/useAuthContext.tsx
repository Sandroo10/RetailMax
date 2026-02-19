import { UserContext } from "../User.Context";
import { useContext } from "react";

export const useAuthContext = () => {
  return useContext(UserContext);
};
