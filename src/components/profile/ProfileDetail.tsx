import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { defaultProfileImage } from "@/assets";
import { useUserContext } from "@/hooks/useUserContext";
import { fillProfileInfo } from "@/supabase/account";
import {
  avatar,
  avatarWrap,
  button,
  card,
  empty,
  errorText,
  fieldGroup,
  form,
  input,
  label,
  successText,
} from "./ProfileDetail.styles";

const profileSchema = z.object({
  username: z.string().min(1, "Username is required"),
  avatarUrl: z.union([z.string().url("Enter a valid URL"), z.literal("")]),
});

type ProfileValues = z.infer<typeof profileSchema>;

const ProfileDetail = () => {
  const { currentUser, profilePicture, setProfilePicture, setUsername, username } =
    useUserContext();
  const [saveMessage, setSaveMessage] = useState("");

  const {
    handleSubmit,
    register,
    reset,
    watch,
    formState: { errors, isSubmitting },
  } = useForm<ProfileValues>({
    resolver: zodResolver(profileSchema),
    defaultValues: {
      username: username || "",
      avatarUrl: profilePicture === defaultProfileImage ? "" : profilePicture,
    },
  });

  useEffect(() => {
    reset({
      username: username || "",
      avatarUrl: profilePicture === defaultProfileImage ? "" : profilePicture,
    });
  }, [username, profilePicture, reset]);

  if (!currentUser) {
    return <p className={empty()}>Sign in to edit your profile.</p>;
  }

  const onSubmit = async (values: ProfileValues) => {
    const updated = await fillProfileInfo({
      id: currentUser.uid,
      username: values.username,
      avatar_url: values.avatarUrl || null,
    });

    setUsername(updated.username || "Anonymous");
    setProfilePicture(updated.avatar_url || defaultProfileImage);
    setSaveMessage("Profile updated.");
  };

  const preview = watch("avatarUrl") || defaultProfileImage;

  return (
    <section className={card()}>
      <div className={avatarWrap()}>
        <img alt="Current profile" className={avatar()} src={preview} />
        <div>
          <p className="text-sm font-semibold">{username || "Anonymous"}</p>
          <p className="text-xs text-muted-foreground">{currentUser.email}</p>
        </div>
      </div>

      <form className={form()} onSubmit={handleSubmit(onSubmit)}>
        <div className={fieldGroup()}>
          <label className={label()} htmlFor="profile-username">
            Username
          </label>
          <input className={input()} id="profile-username" {...register("username")} />
          {errors.username ? (
            <p className={errorText()}>{errors.username.message}</p>
          ) : null}
        </div>

        <div className={fieldGroup()}>
          <label className={label()} htmlFor="profile-avatar-url">
            Avatar URL
          </label>
          <input className={input()} id="profile-avatar-url" {...register("avatarUrl")} />
          {errors.avatarUrl ? (
            <p className={errorText()}>{errors.avatarUrl.message}</p>
          ) : null}
        </div>

        {saveMessage ? <p className={successText()}>{saveMessage}</p> : null}

        <button aria-label="Save profile" className={button()} type="submit">
          {isSubmitting ? "Saving..." : "Save changes"}
        </button>
      </form>
    </section>
  );
};

export default ProfileDetail;
