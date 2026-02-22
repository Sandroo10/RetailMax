import { NavLink } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { categoryDefinitions } from "@/data/categories";

interface CategoryLinksProps {
  categorySlug?: string;
}

const CategoryLinks = ({ categorySlug }: CategoryLinksProps) => {
  const { t } = useTranslation();

  return (
    <nav aria-label={t("shop.categoryNavAria")} className="flex flex-wrap items-center gap-2">
      <NavLink
        className={
          !categorySlug
            ? "rounded-pill border border-brand bg-brand px-3 py-1.5 text-sm font-semibold text-primary-foreground"
            : "rounded-pill border border-border bg-surface-1 px-3 py-1.5 text-sm font-semibold text-muted-foreground transition duration-180 hover:border-brand/60 hover:text-foreground"
        }
        to="/shop"
      >
        {t("shop.allCategories")}
      </NavLink>

      {categoryDefinitions.map((category) => (
        <NavLink
          className={
            category.slug === categorySlug
              ? "rounded-pill border border-brand bg-brand px-3 py-1.5 text-sm font-semibold text-primary-foreground"
              : "rounded-pill border border-border bg-surface-1 px-3 py-1.5 text-sm font-semibold text-muted-foreground transition duration-180 hover:border-brand/60 hover:text-foreground"
          }
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
