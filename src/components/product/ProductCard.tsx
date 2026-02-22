import { memo, useMemo } from "react";
import { Eye, ShoppingBag, Star } from "lucide-react";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import type { Product } from "@/supabase/products";
import { useCartContext } from "@/hooks/useCartContext";
import {
  getLocalizedProductDescription,
  getLocalizedProductName,
} from "@/lib/product-localization";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/toast";

interface ProductCardProps {
  product: Product;
  showQuickAction?: boolean;
  priorityImage?: boolean;
}

const formatPrice = (price: number) => {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    maximumFractionDigits: 0,
  }).format(price);
};

const ProductCardComponent = ({
  product,
  showQuickAction = true,
  priorityImage = false,
}: ProductCardProps) => {
  const { i18n, t } = useTranslation();
  const { addItemToCart } = useCartContext();
  const { pushToast } = useToast();
  const language = i18n.resolvedLanguage ?? i18n.language;
  const localizedName = getLocalizedProductName(product, language);
  const localizedDescription = getLocalizedProductDescription(
    product,
    language,
  );

  const rating = useMemo(
    () => Number((3.8 + (product.id % 11) * 0.11).toFixed(1)),
    [product.id],
  );
  const reviewCount = useMemo(() => 12 + product.id * 7, [product.id]);

  const badge = useMemo(() => {
    if (!product.in_stock) {
      return { label: t("product.outOfStock"), variant: "danger" as const };
    }

    if (product.id % 5 === 0) {
      return { label: t("shop.badgeSale"), variant: "brand" as const };
    }

    if (product.id % 3 === 0) {
      return { label: t("shop.badgeNew"), variant: "success" as const };
    }

    return { label: t("shop.badgeFeatured"), variant: "neutral" as const };
  }, [product.id, product.in_stock, t]);

  const handleAddToCart = () => {
    addItemToCart({ ...product, quantity: 1 });
    pushToast({
      title: t("shop.addedToCartTitle", { name: localizedName }),
      description: t("shop.addedToCartDescription"),
      variant: "success",
    });
  };

  return (
    <article className="group hover-lift flex h-full flex-col overflow-hidden rounded-lg border border-border bg-surface-1 shadow-soft">
      <div className="relative isolate overflow-hidden bg-surface-2">
        <Badge className="absolute left-3 top-3 z-10" variant={badge.variant}>
          {badge.label}
        </Badge>

        <Link
          aria-label={t("shop.openProductDetailsAria", { name: localizedName })}
          className="block aspect-[4/3] w-full"
          to={`/product/${product.id}`}
        >
          <img
            alt={localizedName}
            className="h-full w-full object-cover transition duration-200 ease-out group-hover:scale-[1.04]"
            decoding="async"
            loading={priorityImage ? "eager" : "lazy"}
            src={product.image_url}
          />
        </Link>

        {showQuickAction ? (
          <Link
            className="absolute bottom-3 right-3 inline-flex items-center gap-1.5 rounded-pill border border-border bg-surface-1/95 px-3 py-1.5 text-xs font-semibold text-foreground opacity-0 shadow-soft backdrop-blur transition duration-180 group-hover:opacity-100"
            to={`/product/${product.id}`}
          >
            <Eye className="h-3.5 w-3.5" />
            {t("shop.quickView")}
          </Link>
        ) : null}
      </div>

      <div className="flex flex-1 flex-col gap-3 p-4">
        <div className="min-h-[5.25rem]">
          <h3 className="line-clamp-1 text-base font-bold text-foreground">
            {localizedName}
          </h3>
          <p className="mt-1 line-clamp-2 min-h-[2.75rem] text-sm text-muted-foreground">
            {localizedDescription}
          </p>
        </div>

        <div className="flex min-h-5 items-center justify-between text-xs text-muted-foreground">
          <div className="flex items-center gap-1 tabular-nums">
            <Star className="h-3.5 w-3.5 fill-brand text-brand" />
            <span className="font-semibold text-foreground">{rating}</span>
            <span>{t("shop.reviewCount", { count: reviewCount })}</span>
          </div>
          <span>
            {product.in_stock ? t("product.inStock") : t("shop.unavailable")}
          </span>
        </div>

        <div className="mt-auto space-y-3">
          <p className="text-xl font-bold text-foreground">
            {formatPrice(product.price)}
          </p>
          <Button
            aria-label={t("shop.addToCartAria", { name: localizedName })}
            className="w-full"
            disabled={!product.in_stock}
            onClick={handleAddToCart}
            size="md"
            variant={product.in_stock ? "primary" : "secondary"}
          >
            <ShoppingBag className="h-4 w-4" />
            {product.in_stock ? t("shop.addToCart") : t("product.outOfStock")}
          </Button>
        </div>
      </div>
    </article>
  );
};

const ProductCard = memo(ProductCardComponent);

export default ProductCard;
