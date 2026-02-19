import { categoryBySlug } from "@/data/categories";
import { container, content, backdrop, subtitle, title } from "./ShopHero.styles";

interface ShopHeroProps {
  categorySlug?: string;
}

const ShopHero = ({ categorySlug }: ShopHeroProps) => {
  const category = categorySlug ? categoryBySlug[categorySlug] : undefined;

  return (
    <div className={container()}>
      <div className={backdrop()} />
      <div className={content()}>
        <h1 className={title()}>
          {category ? category.label : "Shop Products"}
        </h1>
        <p className={subtitle()}>
          {category
            ? `Explore in-stock ${category.label.toLowerCase()} with search, price filters, and quick add-to-cart actions.`
            : "Browse all categories, compare prices, and build your cart quickly."}
        </p>
      </div>
    </div>
  );
};

export default ShopHero;
