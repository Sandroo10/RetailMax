import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import type { Product } from "@/supabase/products";
import ProductCard from "@/components/shop/ProductCard";
import { empty, grid, loading, pagination } from "./ProductGrid.styles";

interface ProductGridProps {
  products: Product[];
  isLoading: boolean;
  isError: boolean;
  currentPage: number;
  onPageChange: (page: number) => void;
}

const PAGE_SIZE = 8;

const ProductGrid = ({
  products,
  isLoading,
  isError,
  currentPage,
  onPageChange,
}: ProductGridProps) => {
  if (isLoading) {
    return <p className={loading()}>Loading products...</p>;
  }

  if (isError) {
    return <p className={empty()}>Could not load products.</p>;
  }

  if (products.length === 0) {
    return <p className={empty()}>No products match this filter.</p>;
  }

  const totalPages = Math.max(1, Math.ceil(products.length / PAGE_SIZE));
  const safePage = Math.min(currentPage, totalPages);
  const pageStart = (safePage - 1) * PAGE_SIZE;
  const pageProducts = products.slice(pageStart, pageStart + PAGE_SIZE);

  return (
    <section>
      <div className={grid()}>
        {pageProducts.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>

      <div className={pagination()}>
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

            {Array.from({ length: totalPages }, (_, index) => index + 1).map(
              (page) => (
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
              ),
            )}

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
    </section>
  );
};

export default ProductGrid;
