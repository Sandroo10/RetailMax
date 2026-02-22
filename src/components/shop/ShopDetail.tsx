import { useEffect, useMemo, useState } from "react";
import { useTranslation } from "react-i18next";
import { categoryBySlug } from "@/data/categories";
import { useProductList } from "@/hooks/useProducts";
import {
  getLocalizedProductDescription,
  getLocalizedProductName,
} from "@/lib/product-localization";
import type { Product } from "@/supabase/products";
import CategoryLinks from "./sections/CategoryLinks";
import ProductGrid from "./sections/ProductGrid";
import ShopToolbar from "./sections/ShopToolbar";

interface ShopDetailProps {
  categorySlug?: string;
}

type SortValue = "featured" | "priceLow" | "priceHigh" | "newest";

const sortProducts = (products: Product[], sortBy: SortValue) => {
  if (sortBy === "priceLow") {
    return [...products].sort((a, b) => a.price - b.price);
  }

  if (sortBy === "priceHigh") {
    return [...products].sort((a, b) => b.price - a.price);
  }

  if (sortBy === "newest") {
    return [...products].sort(
      (a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime(),
    );
  }

  return [...products].sort((a, b) => {
    if (a.in_stock !== b.in_stock) {
      return Number(b.in_stock) - Number(a.in_stock);
    }

    return new Date(b.created_at).getTime() - new Date(a.created_at).getTime();
  });
};

const ShopDetail = ({ categorySlug }: ShopDetailProps) => {
  const { i18n } = useTranslation();
  const [searchQuery, setSearchQuery] = useState("");
  const [maxPrice, setMaxPrice] = useState(10000);
  const [sortBy, setSortBy] = useState<SortValue>("featured");
  const [currentPage, setCurrentPage] = useState(1);
  const category = categorySlug ? categoryBySlug[categorySlug] : undefined;
  const language = i18n.resolvedLanguage ?? i18n.language;

  const { data: products = [], isLoading, isError } = useProductList();

  const filteredProducts = useMemo(() => {
    const normalizedSearchQuery = searchQuery.trim().toLowerCase();

    const list = products.filter((product) => {
      const matchesCategory = category
        ? product.category.toLowerCase() === category.databaseValue
        : true;

      const localizedName = getLocalizedProductName(product, language).toLowerCase();
      const localizedDescription = getLocalizedProductDescription(
        product,
        language,
      ).toLowerCase();
      const matchesSearch =
        !normalizedSearchQuery ||
        localizedName.includes(normalizedSearchQuery) ||
        localizedDescription.includes(normalizedSearchQuery);

      const matchesPrice = product.price <= maxPrice;

      return matchesCategory && matchesSearch && matchesPrice;
    });

    return sortProducts(list, sortBy);
  }, [products, category, searchQuery, maxPrice, sortBy, language]);

  useEffect(() => {
    setCurrentPage(1);
  }, [searchQuery, maxPrice, categorySlug, sortBy]);

  const clearFilters = () => {
    setSearchQuery("");
    setMaxPrice(10000);
    setSortBy("featured");
  };

  return (
    <div className="space-y-5">
      <CategoryLinks categorySlug={categorySlug} />

      <ShopToolbar
        maxPrice={maxPrice}
        onClearFilters={clearFilters}
        onPriceChange={setMaxPrice}
        onSearchChange={setSearchQuery}
        onSortChange={setSortBy}
        searchQuery={searchQuery}
        sortBy={sortBy}
      />

      <ProductGrid
        currentPage={currentPage}
        isError={isError}
        isLoading={isLoading}
        onPageChange={setCurrentPage}
        onResetFilters={clearFilters}
        products={filteredProducts}
      />
    </div>
  );
};

export default ShopDetail;
