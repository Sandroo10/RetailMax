import { UserContext } from "../User.Context";
import { useContext } from "react";

export const useAuthContext = () => {
  const authContext = useContext(UserContext);

  if (!authContext) {
    throw new Error("use Auth Context inside Auth Context Provider");
  }

  return authContext;
};
