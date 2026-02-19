import type { CartItem } from "@/contexts/types";
import { useCartContext } from "@/hooks/useCartContext";
import {
  content,
  controlButton,
  controls,
  description,
  image,
  name,
  price,
  quantity,
  row,
} from "./CheckoutItemRow.styles";

interface CheckoutItemRowProps {
  item: CartItem;
}

const CheckoutItemRow = ({ item }: CheckoutItemRowProps) => {
  const { addItemToCart, clearItemsFromCart, removeItemFromCart } =
    useCartContext();

  return (
    <article className={row()}>
      <img alt={item.name} className={image()} src={item.image_url} />

      <div className={content()}>
        <p className={name()}>{item.name}</p>
        <p className={description()}>{item.description}</p>
      </div>

      <div className="flex items-center gap-4">
        <div className={controls()}>
          <button
            aria-label={`Decrease quantity for ${item.name}`}
            className={controlButton()}
            onClick={() => removeItemFromCart(item)}
            type="button"
          >
            -
          </button>
          <span className={quantity()}>{item.quantity}</span>
          <button
            aria-label={`Increase quantity for ${item.name}`}
            className={controlButton()}
            onClick={() => addItemToCart(item)}
            type="button"
          >
            +
          </button>
          <button
            aria-label={`Remove ${item.name} from cart`}
            className={controlButton()}
            onClick={() => clearItemsFromCart(item)}
            type="button"
          >
            ×
          </button>
        </div>
        <span className={price()}>${(item.price * item.quantity).toFixed(2)}</span>
      </div>
    </article>
  );
};

export default CheckoutItemRow;
