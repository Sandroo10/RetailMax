import { useMutation } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import { login, logout, register } from "@/supabase/auth";

export const useSignInMutation = () => {
  const navigate = useNavigate();

  return useMutation<void, Error, { email: string; password: string }>({
    mutationKey: ["login"],
    mutationFn: login,
    onSuccess: () => {
      navigate("/");
    },
  });
};

export const useRegisterMutation = () => {
  const navigate = useNavigate();

  return useMutation<
    void,
    Error,
    { username: string; email: string; password: string }
  >({
    mutationKey: ["register"],
    mutationFn: register,
    onSuccess: () => {
      navigate("/");
    },
  });
};

export const useSignOutMutation = () => {
  const navigate = useNavigate();

  return useMutation<void, Error, void>({
    mutationKey: ["logout"],
    mutationFn: logout,
    onSuccess: () => {
      navigate("/");
    },
  });
};
