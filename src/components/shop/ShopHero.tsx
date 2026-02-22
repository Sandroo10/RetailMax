import { ChevronRight } from "lucide-react";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { categoryBySlug } from "@/data/categories";

interface ShopHeroProps {
  categorySlug?: string;
}

const ShopHero = ({ categorySlug }: ShopHeroProps) => {
  const { t } = useTranslation();
  const category = categorySlug ? categoryBySlug[categorySlug] : undefined;
  const categoryLabel = category ? t(category.labelKey) : t("navigation.shop");

  return (
    <section className="rounded-lg border border-border bg-surface-1 p-6 shadow-soft sm:p-8">
      <div className="mb-3 flex flex-wrap items-center gap-2 text-xs font-semibold uppercase tracking-[0.12em] text-muted-foreground">
        <Link className="transition hover:text-brand" to="/">
          {t("navigation.home")}
        </Link>
        <ChevronRight className="h-3.5 w-3.5" />
        <Link className="transition hover:text-brand" to="/shop">
          {t("navigation.shop")}
        </Link>
        {category ? (
          <>
            <ChevronRight className="h-3.5 w-3.5" />
            <span className="text-brand">{categoryLabel}</span>
          </>
        ) : null}
      </div>

      <div className="space-y-2">
        <h1 className="text-[2rem] font-bold leading-tight text-foreground sm:text-[2.4rem]">
          {category ? categoryLabel : t("navigation.shop")}
        </h1>
        <p className="max-w-2xl text-sm text-muted-foreground sm:text-base">
          {t("shop.pageDescription")}
        </p>
      </div>
    </section>
  );
};

export default ShopHero;
