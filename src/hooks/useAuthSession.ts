import { useEffect } from "react";
import { useAuthContext } from "@/contexts/hooks/useAuthContext";
import { supabase } from "@/supabase/supabase";

export const useAuthSession = () => {
  const { handleSetUser } = useAuthContext();

  useEffect(() => {
    const hydrateSession = async () => {
      const {
        data: { session },
      } = await supabase.auth.getSession();

      if (!session) {
        handleSetUser(null);
        return;
      }

      handleSetUser({
        uid: session.user.id,
        email: session.user.email,
        token: session.access_token,
      });
    };

    void hydrateSession();

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      if (!session) {
        handleSetUser(null);
        return;
      }

      handleSetUser({
        uid: session.user.id,
        email: session.user.email,
        token: session.access_token,
      });
    });

    return () => {
      subscription.unsubscribe();
    };
  }, [handleSetUser]);
};
