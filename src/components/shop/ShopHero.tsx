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
    <section className="relative overflow-hidden rounded-lg border border-border/80 bg-surface-1 p-6 shadow-soft sm:p-8">
      <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(120deg,hsl(var(--brand)/0.1),transparent_36%),linear-gradient(180deg,hsl(var(--surface-1)),hsl(var(--surface-2)/0.78))]" />
      <div className="relative">
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
          <h1 className="text-[2.15rem] font-bold leading-tight text-foreground sm:text-[2.75rem]">
            {category ? categoryLabel : t("navigation.shop")}
          </h1>
          <p className="max-w-2xl text-sm text-muted-foreground sm:text-base">
            {t("shop.pageDescription")}
          </p>
        </div>
      </div>
    </section>
  );
};

export default ShopHero;
