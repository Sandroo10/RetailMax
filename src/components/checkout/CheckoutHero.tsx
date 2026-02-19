import { useTranslation } from "react-i18next";
import { container, subtitle, title } from "./CheckoutHero.styles";

const CheckoutHero = () => {
  const { t } = useTranslation();

  return (
    <div className={container()}>
      <h1 className={title()}>{t("checkout.heroTitle")}</h1>
      <p className={subtitle()}>{t("checkout.heroSubtitle")}</p>
    </div>
  );
};

export default CheckoutHero;
