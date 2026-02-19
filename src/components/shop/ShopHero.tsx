import { categoryBySlug } from "@/data/categories";
import { useTranslation } from "react-i18next";
import {
  container,
  content,
  backdrop,
  subtitle,
  title,
} from "./ShopHero.styles";

interface ShopHeroProps {
  categorySlug?: string;
}

const ShopHero = ({ categorySlug }: ShopHeroProps) => {
  const { t } = useTranslation();
  const category = categorySlug ? categoryBySlug[categorySlug] : undefined;
  const categoryLabel = category ? t(category.labelKey) : "";

  return (
    <div className={container()}>
      <div className={backdrop()} />
      <div className={content()}>
        <h1 className={title()}>
          {category ? categoryLabel : t("shop.heroTitle")}
        </h1>
        <p className={subtitle()}>
          {category
            ? t("shop.heroSubtitleCategory", { category: categoryLabel })
            : t("shop.heroSubtitle")}
        </p>
      </div>
    </div>
  );
};

export default ShopHero;
