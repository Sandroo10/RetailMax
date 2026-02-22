import { SearchX } from "lucide-react";
import { useTranslation } from "react-i18next";
import type { Product } from "@/supabase/products";
import ProductCard from "@/components/product/ProductCard";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";

interface ProductGridProps {
  products: Product[];
  isLoading?: boolean;
  isError?: boolean;
  emptyMessage?: string;
  onResetFilters?: () => void;
  priorityFirstImage?: boolean;
}

const ProductGrid = ({
  products,
  isLoading,
  isError,
  emptyMessage,
  onResetFilters,
  priorityFirstImage = false,
}: ProductGridProps) => {
  const { t } = useTranslation();
  const resolvedEmptyMessage = emptyMessage || t("shop.emptyProducts");

  if (isLoading) {
    return (
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {Array.from({ length: 8 }).map((_, index) => (
          <div
            className="rounded-lg border border-border bg-surface-1 p-3"
            key={index}
          >
            <Skeleton className="aspect-[4/3] w-full rounded-md" />
            <div className="mt-3 space-y-2">
              <Skeleton className="h-4 w-4/5" />
              <Skeleton className="h-3 w-full" />
              <Skeleton className="h-3 w-3/4" />
              <Skeleton className="h-10 w-full rounded-md" />
            </div>
          </div>
        ))}
      </div>
    );
  }

  if (isError) {
    return (
      <div className="rounded-lg border border-danger/40 bg-danger/10 p-6 text-sm text-danger">
        {t("shop.errorProducts")}
      </div>
    );
  }

  if (!products.length) {
    return (
      <div className="rounded-lg border border-border bg-surface-1 p-8 text-center shadow-soft">
        <div className="mx-auto mb-3 flex h-12 w-12 items-center justify-center rounded-full border border-border bg-surface-2">
          <SearchX className="h-5 w-5 text-muted-foreground" />
        </div>
        <p className="text-base font-semibold text-foreground">
          {t("shop.noProductsFound")}
        </p>
        <p className="mt-1 text-sm text-muted-foreground">
          {resolvedEmptyMessage}
        </p>
        {onResetFilters ? (
          <Button
            className="mt-4"
            onClick={onResetFilters}
            size="sm"
            variant="secondary"
          >
            {t("shop.resetFilters")}
          </Button>
        ) : null}
      </div>
    );
  }

  return (
    <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
      {products.map((product, index) => (
        <ProductCard
          key={product.id}
          priorityImage={priorityFirstImage && index === 0}
          product={product}
        />
      ))}
    </div>
  );
};

export default ProductGrid;
