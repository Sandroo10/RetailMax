import { useTranslation } from "react-i18next";
import { container, subtitle, title } from "./ProductHero.styles";

const ProductHero = () => {
  const { t } = useTranslation();

  return (
    <div className={container()}>
      <h1 className={title()}>{t("product.heroTitle")}</h1>
      <p className={subtitle()}>{t("product.heroSubtitle")}</p>
    </div>
  );
};

export default ProductHero;
