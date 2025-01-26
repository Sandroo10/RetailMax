import { register } from "../../supabase/auth";
import { useMutation } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";

export const useRegister = () => {
    const navigate = useNavigate();
  
    return useMutation<void, Error, {username:string, email: string; password: string }>({
      mutationKey: ["register"],
      mutationFn: register,
  
      onSuccess: () => {
        navigate("/");
      },
      onError: (error: Error) => {
        console.error("Sign Up failed:", error);
        throw error;
      },
    });
  };