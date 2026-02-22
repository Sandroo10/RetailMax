import { useMemo, useState } from "react";
import { ArrowLeft, Minus, Plus, Share2, Star } from "lucide-react";
import { Link, useParams } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { useCartContext } from "@/hooks/useCartContext";
import { useSingleProduct } from "@/hooks/useProducts";
import {
  getLocalizedProductDescription,
  getLocalizedProductName,
} from "@/lib/product-localization";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useToast } from "@/components/ui/toast";

const formatPrice = (price: number) =>
  new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
  }).format(price);

const ProductDetail = () => {
  const { i18n, t } = useTranslation();
  const { id } = useParams<{ id: string }>();
  const { data: product, isLoading, isError } = useSingleProduct(id);
  const { addItemToCart } = useCartContext();
  const { pushToast } = useToast();
  const [quantity, setQuantity] = useState(1);
  const language = i18n.resolvedLanguage ?? i18n.language;

  const rating = useMemo(
    () => (product ? Number((4.1 + (product.id % 8) * 0.1).toFixed(1)) : 4.6),
    [product],
  );

  const reviewCount = useMemo(
    () => (product ? 20 + product.id * 5 : 0),
    [product],
  );

  if (isLoading) {
    return (
      <div className="space-y-5">
        <div className="grid gap-5 rounded-lg border border-border bg-surface-1 p-5 shadow-soft lg:grid-cols-[1.08fr_1fr]">
          <Skeleton className="aspect-square w-full rounded-lg" />
          <div className="space-y-3">
            <Skeleton className="h-5 w-28" />
            <Skeleton className="h-10 w-4/5" />
            <Skeleton className="h-4 w-3/5" />
            <Skeleton className="h-20 w-full" />
            <Skeleton className="h-11 w-full" />
          </div>
        </div>
        <Skeleton className="h-40 w-full rounded-lg" />
      </div>
    );
  }

  if (isError || !product) {
    return (
      <div className="rounded-lg border border-danger/40 bg-danger/10 p-8 text-center">
        <p className="text-base font-semibold text-danger">
          {t("product.errorDetails")}
        </p>
        <Button asChild className="mt-4" variant="secondary">
          <Link to="/shop">{t("product.backToShop")}</Link>
        </Button>
      </div>
    );
  }

  const stockVariant = product.in_stock ? "success" : "danger";
  const categoryLabel = product.category
    .replace(/-/g, " ")
    .replace(/\b\w/g, (character) => character.toUpperCase());
  const localizedName = getLocalizedProductName(product, language);
  const localizedDescription = getLocalizedProductDescription(
    product,
    language,
  );

  const handleAddToCart = () => {
    const safeQuantity = Math.max(1, quantity);

    for (let index = 0; index < safeQuantity; index += 1) {
      addItemToCart({ ...product, quantity: 1 });
    }

    pushToast({
      title: t("product.addedToCartTitle", {
        count: safeQuantity,
        name: localizedName,
      }),
      description: t("product.addedToCartDescription"),
      variant: "success",
    });
  };

  const handleShare = async () => {
    try {
      if (navigator.share) {
        await navigator.share({
          title: localizedName,
          text: localizedDescription,
          url: window.location.href,
        });
        return;
      }

      await navigator.clipboard.writeText(window.location.href);
      pushToast({
        title: t("product.linkCopiedTitle"),
        description: t("product.linkCopiedDescription"),
        variant: "info",
      });
    } catch {
      pushToast({
        title: t("product.shareUnavailableTitle"),
        description: t("product.shareUnavailableDescription"),
        variant: "error",
      });
    }
  };

  return (
    <div className="space-y-6">
      <section className="grid gap-5 rounded-lg border border-border bg-surface-1 p-5 shadow-soft lg:grid-cols-[1.08fr_1fr] lg:gap-7 lg:p-6">
        <div className="space-y-3">
          <div className="overflow-hidden rounded-lg border border-border bg-surface-2">
            <img
              alt={localizedName}
              className="aspect-square h-full w-full object-cover"
              decoding="async"
              src={product.image_url}
            />
          </div>

          <div className="flex gap-2">
            <button
              aria-label={t("product.selectedImageAria")}
              className="h-16 w-16 overflow-hidden rounded-md border border-brand bg-surface-2"
              type="button"
            >
              <img
                alt={`${localizedName} thumbnail`}
                className="h-full w-full object-cover"
                src={product.image_url}
              />
            </button>
          </div>
        </div>

        <div className="space-y-4">
          <div className="flex flex-wrap items-center gap-2">
            <Badge variant={stockVariant}>
              {product.in_stock
                ? t("product.inStock")
                : t("product.outOfStock")}
            </Badge>
            <Badge variant="neutral">
              {t("product.skuLabel", { id: product.id })}
            </Badge>
          </div>

          <div className="space-y-2">
            <h2 className="text-2xl font-bold text-foreground sm:text-3xl">
              {localizedName}
            </h2>
            <div className="flex items-center gap-2 text-sm">
              <div className="flex items-center gap-1 text-brand">
                <Star className="h-4 w-4 fill-brand" />
                <span className="font-semibold text-foreground">{rating}</span>
              </div>
              <span className="text-muted-foreground">
                {t("product.reviewsCount", { count: reviewCount })}
              </span>
            </div>
          </div>

          <p className="text-3xl font-bold text-foreground">
            {formatPrice(product.price)}
          </p>

          <p className="text-sm leading-7 text-muted-foreground">
            {localizedDescription}
          </p>

          <div className="flex items-center gap-2">
            <p className="text-sm font-semibold text-foreground">
              {t("product.quantity")}
            </p>
            <div className="inline-flex items-center rounded-pill border border-border bg-surface-2 p-1">
              <button
                aria-label={t("product.decreaseQuantityAria")}
                className="inline-flex h-8 w-8 items-center justify-center rounded-full text-muted-foreground transition hover:text-foreground"
                onClick={() =>
                  setQuantity((current) => Math.max(1, current - 1))
                }
                type="button"
              >
                <Minus className="h-4 w-4" />
              </button>
              <span className="w-8 text-center text-sm font-semibold text-foreground">
                {quantity}
              </span>
              <button
                aria-label={t("product.increaseQuantityAria")}
                className="inline-flex h-8 w-8 items-center justify-center rounded-full text-muted-foreground transition hover:text-foreground"
                onClick={() =>
                  setQuantity((current) => Math.min(10, current + 1))
                }
                type="button"
              >
                <Plus className="h-4 w-4" />
              </button>
            </div>
          </div>

          <div className="grid gap-2 sm:grid-cols-[1fr_auto_auto]">
            <Button
              aria-label={t("shop.addToCartAria", { name: localizedName })}
              className="w-full"
              disabled={!product.in_stock}
              onClick={handleAddToCart}
              size="lg"
              variant="primary"
            >
              {t("shop.addToCart")}
            </Button>
            <Button asChild size="lg" variant="secondary">
              <Link to="/shop">
                <ArrowLeft className="h-4 w-4" />
                {t("product.continueShopping")}
              </Link>
            </Button>
            <Button
              aria-label={t("product.shareAria")}
              onClick={() => void handleShare()}
              size="lg"
              variant="ghost"
            >
              <Share2 className="h-4 w-4" />
              {t("product.share")}
            </Button>
          </div>

          <dl className="grid gap-2 rounded-md border border-border bg-surface-2 p-3 text-sm">
            <div className="flex items-center justify-between gap-4">
              <dt className="text-muted-foreground">{t("product.category")}</dt>
              <dd className="font-semibold text-foreground">{categoryLabel}</dd>
            </div>
            <div className="flex items-center justify-between gap-4">
              <dt className="text-muted-foreground">
                {t("product.availability")}
              </dt>
              <dd className="font-semibold text-foreground">
                {product.in_stock
                  ? t("product.readyToShip")
                  : t("product.backorder")}
              </dd>
            </div>
          </dl>
        </div>
      </section>

      <Tabs defaultValue="description">
        <TabsList>
          <TabsTrigger value="description">
            {t("product.tabDescription")}
          </TabsTrigger>
          <TabsTrigger value="specs">{t("product.tabSpecs")}</TabsTrigger>
          <TabsTrigger value="shipping">
            {t("product.tabShippingReturns")}
          </TabsTrigger>
        </TabsList>

        <TabsContent value="description">
          <p className="text-sm leading-7 text-muted-foreground">
            {localizedDescription}
          </p>
        </TabsContent>

        <TabsContent value="specs">
          <ul className="grid gap-2 text-sm text-muted-foreground">
            <li>{t("product.spec1")}</li>
            <li>
              {t("product.spec2", {
                sku: `RM-${product.id.toString().padStart(5, "0")}`,
              })}
            </li>
            <li>{t("product.spec3", { category: categoryLabel })}</li>
          </ul>
        </TabsContent>

        <TabsContent value="shipping">
          <ul className="grid gap-2 text-sm text-muted-foreground">
            <li>{t("product.shipping1")}</li>
            <li>{t("product.shipping2")}</li>
            <li>{t("product.shipping3")}</li>
          </ul>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default ProductDetail;
