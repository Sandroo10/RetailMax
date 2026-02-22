import { ChevronRight } from "lucide-react";
import { Link, useParams } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { useSingleProduct } from "@/hooks/useProducts";
import { getLocalizedProductName } from "@/lib/product-localization";

const ProductHero = () => {
  const { i18n, t } = useTranslation();
  const { id } = useParams<{ id: string }>();
  const { data: product } = useSingleProduct(id);
  const language = i18n.resolvedLanguage ?? i18n.language;
  const localizedName = product ? getLocalizedProductName(product, language) : "";

  return (
    <section className="rounded-lg border border-border bg-surface-1 p-5 shadow-soft sm:p-6">
      <div className="mb-3 flex flex-wrap items-center gap-2 text-xs font-semibold uppercase tracking-[0.12em] text-muted-foreground">
        <Link className="transition hover:text-brand" to="/">
          {t("navigation.home")}
        </Link>
        <ChevronRight className="h-3.5 w-3.5" />
        <Link className="transition hover:text-brand" to="/shop">
          {t("navigation.shop")}
        </Link>
        {product ? (
          <>
            <ChevronRight className="h-3.5 w-3.5" />
            <span className="text-brand">{localizedName}</span>
          </>
        ) : null}
      </div>

      <h1 className="text-2xl font-bold text-foreground sm:text-3xl">
        {product ? localizedName : t("product.heroTitle")}
      </h1>
    </section>
  );
};

export default ProductHero;
