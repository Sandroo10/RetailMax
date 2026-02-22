import type { ComponentProps } from "react";
import ProductCard from "@/components/product/ProductCard";

type ProductCardProps = ComponentProps<typeof ProductCard>;

const ShopProductCard = (props: ProductCardProps) => {
  return <ProductCard {...props} />;
};

export default ShopProductCard;
