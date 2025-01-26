import { supabase } from "../supabase";
import { FillProfileInfoPayload } from "./index.types";

export const fillProfileInfo = async (payload: FillProfileInfoPayload) => {
  if (!payload.id) {
    throw new Error("Missing required field: id");
  }

  const { data, error } = await supabase
    .from("profiles")
    .upsert({
      id: payload.id,
      username: payload.username,
      avatar_url: payload.avatar_url, 
    })
    .select("*")
    .single();

  if (error) {
    throw new Error(error.message);
  }

  return data;
};



export const getProfileInfo = async (id: string | number) => {
  const { data, error } = await supabase
    .from("profiles")
    .select("*")
    .eq("id", id)
    .single(); 

  if (error) {
    console.error("Error fetching profile info:", error.message);
    throw new Error(error.message); 
  }

  return data; 
};
