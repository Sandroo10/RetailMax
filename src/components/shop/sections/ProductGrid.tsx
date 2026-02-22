import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import { useTranslation } from "react-i18next";
import ProductCardGrid from "@/components/product/ProductGrid";
import type { Product } from "@/supabase/products";

interface ProductGridProps {
  products: Product[];
  isLoading: boolean;
  isError: boolean;
  currentPage: number;
  onPageChange: (page: number) => void;
  onResetFilters: () => void;
}

const PAGE_SIZE = 8;

const ProductGrid = ({
  products,
  isLoading,
  isError,
  currentPage,
  onPageChange,
  onResetFilters,
}: ProductGridProps) => {
  const { t } = useTranslation();
  const totalPages = Math.max(1, Math.ceil(products.length / PAGE_SIZE));
  const safePage = Math.min(currentPage, totalPages);
  const pageStart = (safePage - 1) * PAGE_SIZE;
  const pageProducts = products.slice(pageStart, pageStart + PAGE_SIZE);

  return (
    <section className="space-y-5">
      <div className="flex items-center justify-between">
        <p className="text-sm text-muted-foreground">
          {t("shop.showingCount", {
            showing: pageProducts.length,
            total: products.length,
          })}
        </p>
      </div>

      <ProductCardGrid
        emptyMessage={t("shop.emptyAdjustFilters")}
        isError={isError}
        isLoading={isLoading}
        onResetFilters={onResetFilters}
        products={pageProducts}
      />

      {!isLoading && !isError && products.length > PAGE_SIZE ? (
        <div>
          <Pagination>
            <PaginationContent>
              <PaginationItem>
                <PaginationPrevious
                  href="#"
                  onClick={(event) => {
                    event.preventDefault();
                    onPageChange(Math.max(1, safePage - 1));
                  }}
                />
              </PaginationItem>

              {Array.from({ length: totalPages }, (_, index) => index + 1).map((page) => (
                <PaginationItem key={page}>
                  <PaginationLink
                    href="#"
                    isActive={page === safePage}
                    onClick={(event) => {
                      event.preventDefault();
                      onPageChange(page);
                    }}
                  >
                    {page}
                  </PaginationLink>
                </PaginationItem>
              ))}

              <PaginationItem>
                <PaginationNext
                  href="#"
                  onClick={(event) => {
                    event.preventDefault();
                    onPageChange(Math.min(totalPages, safePage + 1));
                  }}
                />
              </PaginationItem>
            </PaginationContent>
          </Pagination>
        </div>
      ) : null}
    </section>
  );
};

export default ProductGrid;
