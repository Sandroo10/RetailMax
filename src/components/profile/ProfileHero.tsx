import { useTranslation } from "react-i18next";
import { container, subtitle, title } from "./ProfileHero.styles";

const ProfileHero = () => {
  const { t } = useTranslation();

  return (
    <div className={container()}>
      <h1 className={title()}>{t("profile.heroTitle")}</h1>
      <p className={subtitle()}>{t("profile.heroSubtitle")}</p>
    </div>
  );
};

export default ProfileHero;
