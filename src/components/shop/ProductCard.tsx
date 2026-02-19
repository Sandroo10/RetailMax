import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
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
  const { t } = useTranslation();
  const { addItemToCart } = useCartContext();

  return (
    <article className={card()}>
      <Link
        aria-label={t("shop.openProductDetailsAria", { name: product.name })}
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
            aria-label={t("shop.addToCartAria", { name: product.name })}
            className={button()}
            onClick={() => addItemToCart({ ...product, quantity: 1 })}
            type="button"
          >
            {t("shop.addToCart")}
          </button>
        </div>
      </div>
    </article>
  );
};

export default ProductCard;
