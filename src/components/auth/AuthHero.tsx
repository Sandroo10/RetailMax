import { useTranslation } from "react-i18next";
import { container, subtitle, title } from "./AuthHero.styles";

const AuthHero = () => {
  const { t } = useTranslation();

  return (
    <div className={container()}>
      <h1 className={title()}>{t("auth.heroTitle")}</h1>
      <p className={subtitle()}>{t("auth.heroSubtitle")}</p>
    </div>
  );
};

export default AuthHero;
