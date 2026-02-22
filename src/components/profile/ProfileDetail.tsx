import { zodResolver } from "@hookform/resolvers/zod";
import { UserCircle2 } from "lucide-react";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { Link } from "react-router-dom";
import { z } from "zod";
import { useTranslation } from "react-i18next";
import { defaultProfileImage } from "@/assets";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useToast } from "@/components/ui/toast";
import { useUserContext } from "@/hooks/useUserContext";
import { fillProfileInfo } from "@/supabase/account";

const createProfileSchema = (t: (key: string) => string) =>
  z.object({
    username: z.string().min(1, t("profile.usernameRequired")),
    avatarUrl: z.union([
      z.string().url(t("profile.avatarUrlInvalid")),
      z.literal(""),
    ]),
  });

type ProfileValues = z.infer<ReturnType<typeof createProfileSchema>>;

const ProfileDetail = () => {
  const { t } = useTranslation();
  const { pushToast } = useToast();
  const {
    currentUser,
    profilePicture,
    setProfilePicture,
    setUsername,
    username,
  } = useUserContext();
  const profileSchema = createProfileSchema(t);
  const sidebarItems = [
    t("profile.sidebarProfile"),
    t("profile.sidebarOrders"),
    t("profile.sidebarSettings"),
  ];

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
    return (
      <section className="rounded-lg border border-border bg-surface-1 p-8 text-center shadow-soft">
        <p className="text-base font-semibold text-foreground">{t("profile.signInToEdit")}</p>
        <Button asChild className="mt-4" variant="primary">
          <Link to="/auth">{t("navigation.signIn")}</Link>
        </Button>
      </section>
    );
  }

  const onSubmit = async (values: ProfileValues) => {
    const updated = await fillProfileInfo({
      id: currentUser.uid,
      username: values.username,
      avatar_url: values.avatarUrl || null,
    });

    setUsername(updated.username || "");
    setProfilePicture(updated.avatar_url || defaultProfileImage);

    pushToast({
      title: t("profile.updated"),
      description: t("profile.updatedDescription"),
      variant: "success",
    });
  };

  const preview = watch("avatarUrl") || defaultProfileImage;

  return (
    <div className="grid gap-5 lg:grid-cols-[15rem_1fr]">
      <aside className="rounded-lg border border-border bg-surface-1 p-4 shadow-soft">
        <p className="mb-3 text-xs font-semibold uppercase tracking-[0.16em] text-muted-foreground">
          {t("profile.accountTitle")}
        </p>
        <nav className="grid gap-2" aria-label={t("profile.accountSectionsAria")}>
          {sidebarItems.map((item, index) => (
            <button
              className={[
                "rounded-md px-3 py-2 text-left text-sm font-semibold transition",
                index === 0
                  ? "bg-brand text-primary-foreground"
                  : "border border-border bg-surface-2 text-foreground hover:border-brand/40",
              ].join(" ")}
              key={item}
              type="button"
            >
              {item}
            </button>
          ))}
        </nav>
      </aside>

      <section className="space-y-4 rounded-lg border border-border bg-surface-1 p-5 shadow-soft sm:p-6">
        <div className="flex flex-wrap items-center justify-between gap-4 border-b border-border pb-4">
          <div className="flex items-center gap-3">
            <div className="relative h-16 w-16 overflow-hidden rounded-full border border-border bg-surface-2">
              {preview ? (
                <img
                  alt={t("profile.currentProfileAlt")}
                  className="h-full w-full object-cover"
                  src={preview}
                />
              ) : (
                <UserCircle2 className="h-full w-full p-2 text-muted-foreground" />
              )}
            </div>
            <div>
              <p className="text-base font-bold text-foreground">{username || t("profile.anonymous")}</p>
              <p className="text-sm text-muted-foreground">{currentUser.email}</p>
            </div>
          </div>

          <p className="text-xs text-muted-foreground">{t("profile.visibleAcross")}</p>
        </div>

        <form className="grid gap-4" onSubmit={handleSubmit(onSubmit)}>
          <div className="grid gap-1.5">
            <label className="text-sm font-semibold text-foreground" htmlFor="profile-username">
              {t("profile.username")}
            </label>
            <Input
              aria-label={t("profile.username")}
              id="profile-username"
              placeholder={t("profile.usernamePlaceholder")}
              {...register("username")}
            />
            <p className="text-xs text-muted-foreground">
              {t("profile.usernameHelper")}
            </p>
            {errors.username ? (
              <p className="text-xs text-danger">{errors.username.message}</p>
            ) : null}
          </div>

          <div className="grid gap-1.5">
            <label className="text-sm font-semibold text-foreground" htmlFor="profile-avatar-url">
              {t("profile.avatarUrl")}
            </label>
            <Input
              aria-label={t("profile.avatarUrl")}
              id="profile-avatar-url"
              placeholder={t("profile.avatarUrlPlaceholder")}
              {...register("avatarUrl")}
            />
            <p className="text-xs text-muted-foreground">{t("profile.avatarUrlHelper")}</p>
            {errors.avatarUrl ? (
              <p className="text-xs text-danger">{errors.avatarUrl.message}</p>
            ) : null}
          </div>

          <div className="flex justify-end">
            <Button
              aria-label={t("profile.saveProfileAria")}
              isLoading={isSubmitting}
              loadingText={t("profile.saving")}
              type="submit"
              variant="primary"
            >
              {t("profile.saveChanges")}
            </Button>
          </div>
        </form>
      </section>
    </div>
  );
};

export default ProfileDetail;
