import { useEffect, useMemo, useState } from "react";
import { categoryBySlug } from "@/data/categories";
import { useProductList } from "@/hooks/useProducts";
import CategoryLinks from "./sections/CategoryLinks";
import ProductGrid from "./sections/ProductGrid";
import ShopToolbar from "./sections/ShopToolbar";
import { container } from "./ShopDetail.styles";

interface ShopDetailProps {
  categorySlug?: string;
}

const ShopDetail = ({ categorySlug }: ShopDetailProps) => {
  const [searchQuery, setSearchQuery] = useState("");
  const [maxPrice, setMaxPrice] = useState(10000);
  const [currentPage, setCurrentPage] = useState(1);
  const category = categorySlug ? categoryBySlug[categorySlug] : undefined;

  const { data: products = [], isLoading, isError } = useProductList();

  const filteredProducts = useMemo(() => {
    return products.filter((product) => {
      const matchesCategory = category
        ? product.category.toLowerCase() === category.databaseValue
        : true;

      const matchesSearch = product.name
        .toLowerCase()
        .includes(searchQuery.trim().toLowerCase());

      const matchesPrice = product.price <= maxPrice;

      return matchesCategory && matchesSearch && matchesPrice;
    });
  }, [products, category, searchQuery, maxPrice]);

  useEffect(() => {
    setCurrentPage(1);
  }, [searchQuery, maxPrice, categorySlug]);

  return (
    <div className={container()}>
      <CategoryLinks categorySlug={categorySlug} />
      <ShopToolbar
        maxPrice={maxPrice}
        onPriceChange={setMaxPrice}
        onSearchChange={setSearchQuery}
        searchQuery={searchQuery}
      />
      <ProductGrid
        currentPage={currentPage}
        isError={isError}
        isLoading={isLoading}
        onPageChange={setCurrentPage}
        products={filteredProducts}
      />
    </div>
  );
};

export default ShopDetail;
