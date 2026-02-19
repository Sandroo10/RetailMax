import { categorySlugFromDbValue } from "@/data/categories";
import { useProductList } from "@/hooks/useProducts";
import ProductCard from "@/components/shop/ProductCard";
import { useTranslation } from "react-i18next";
import { grid, heading, state, wrapper } from "./FeaturedProducts.styles";

const FeaturedProducts = () => {
  const { t } = useTranslation();
  const { data: products = [], isLoading, isError } = useProductList();

  if (isLoading) {
    return <p className={state()}>{t("home.loadingFeaturedProducts")}</p>;
  }

  if (isError) {
    return <p className={state()}>{t("home.errorFeaturedProducts")}</p>;
  }

  const featuredProducts = products.slice(0, 8).map((product) => ({
    ...product,
    category: categorySlugFromDbValue(product.category),
  }));

  return (
    <section className={wrapper()}>
      <h2 className={heading()}>{t("home.featuredPicks")}</h2>
      <div className={grid()}>
        {featuredProducts.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </section>
  );
};

export default FeaturedProducts;
