import { ChevronRight } from "lucide-react";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";

const ProfileHero = () => {
  const { t } = useTranslation();

  return (
    <section className="rounded-lg border border-border bg-surface-1 p-6 shadow-soft sm:p-8">
      <div className="mb-3 flex flex-wrap items-center gap-2 text-xs font-semibold uppercase tracking-[0.12em] text-muted-foreground">
        <Link className="transition hover:text-brand" to="/">
          {t("navigation.home")}
        </Link>
        <ChevronRight className="h-3.5 w-3.5" />
        <span className="text-brand">{t("navigation.profile")}</span>
      </div>
      <h1 className="text-[2rem] font-bold text-foreground sm:text-[2.5rem]">
        {t("profile.accountTitle")}
      </h1>
      <p className="mt-2 max-w-2xl text-sm text-muted-foreground sm:text-base">
        {t("profile.accountSubtitle")}
      </p>
    </section>
  );
};

export default ProfileHero;
