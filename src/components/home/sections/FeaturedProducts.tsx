import { categorySlugFromDbValue } from "@/data/categories";
import { useProductList } from "@/hooks/useProducts";
import ProductCard from "@/components/shop/ProductCard";
import { grid, heading, state, wrapper } from "./FeaturedProducts.styles";

const FeaturedProducts = () => {
  const { data: products = [], isLoading, isError } = useProductList();

  if (isLoading) {
    return <p className={state()}>Loading featured products...</p>;
  }

  if (isError) {
    return <p className={state()}>Could not load featured products.</p>;
  }

  const featuredProducts = products.slice(0, 8).map((product) => ({
    ...product,
    category: categorySlugFromDbValue(product.category),
  }));

  return (
    <section className={wrapper()}>
      <h2 className={heading()}>Featured picks</h2>
      <div className={grid()}>
        {featuredProducts.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </section>
  );
};

export default FeaturedProducts;
