import { NavLink } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { categoryDefinitions } from "@/data/categories";
import { container, link } from "./CategoryLinks.styles";

interface CategoryLinksProps {
  categorySlug?: string;
}

const CategoryLinks = ({ categorySlug }: CategoryLinksProps) => {
  const { t } = useTranslation();

  return (
    <nav aria-label={t("shop.categoryNavAria")} className={container()}>
      <NavLink className={link({ active: !categorySlug })} to="/shop">
        {t("shop.allCategories")}
      </NavLink>
      {categoryDefinitions.map((category) => (
        <NavLink
          className={link({ active: category.slug === categorySlug })}
          key={category.slug}
          to={`/shop/${category.slug}`}
        >
          {t(category.labelKey)}
        </NavLink>
      ))}
    </nav>
  );
};

export default CategoryLinks;
