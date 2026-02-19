import { Link } from "react-router-dom";
import type { Product } from "@/supabase/products";
import { useCartContext } from "@/hooks/useCartContext";
import {
  button,
  card,
  content,
  description,
  footer,
  image,
  imageWrap,
  name,
  price,
} from "./ProductCard.styles";

interface ProductCardProps {
  product: Product;
}

const ProductCard = ({ product }: ProductCardProps) => {
  const { addItemToCart } = useCartContext();

  return (
    <article className={card()}>
      <Link
        aria-label={`Open ${product.name} details`}
        className={imageWrap()}
        to={`/product/${product.id}`}
      >
        <img alt={product.name} className={image()} src={product.image_url} />
      </Link>

      <div className={content()}>
        <h3 className={name()}>{product.name}</h3>
        <p className={description()}>{product.description}</p>
        <div className={footer()}>
          <span className={price()}>${product.price}</span>
          <button
            aria-label={`Add ${product.name} to cart`}
            className={button()}
            onClick={() => addItemToCart({ ...product, quantity: 1 })}
            type="button"
          >
            Add to cart
          </button>
        </div>
      </div>
    </article>
  );
};

export default ProductCard;
