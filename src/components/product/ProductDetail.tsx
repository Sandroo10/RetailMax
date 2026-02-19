import { useParams } from "react-router-dom";
import { useCartContext } from "@/hooks/useCartContext";
import { useSingleProduct } from "@/hooks/useProducts";
import {
  addButton,
  content,
  description,
  image,
  imageWrap,
  loadingState,
  name,
  price,
  stock,
  wrapper,
} from "./ProductDetail.styles";

const ProductDetail = () => {
  const { id } = useParams<{ id: string }>();
  const { data: product, isLoading, isError } = useSingleProduct(id);
  const { addItemToCart } = useCartContext();

  if (isLoading) {
    return <p className={loadingState()}>Loading product details...</p>;
  }

  if (isError || !product) {
    return <p className={loadingState()}>Could not load this product.</p>;
  }

  return (
    <section className={wrapper()}>
      <div className={imageWrap()}>
        <img alt={product.name} className={image()} src={product.image_url} />
      </div>

      <div className={content()}>
        <h2 className={name()}>{product.name}</h2>
        <p className={description()}>{product.description}</p>
        <p className={price()}>${product.price}</p>
        <p className={stock({ inStock: Boolean(product.in_stock) })}>
          {product.in_stock ? "In stock" : "Out of stock"}
        </p>

        <button
          aria-label={`Add ${product.name} to cart`}
          className={addButton()}
          onClick={() => addItemToCart({ ...product, quantity: 1 })}
          type="button"
        >
          Add to cart
        </button>
      </div>
    </section>
  );
};

export default ProductDetail;
