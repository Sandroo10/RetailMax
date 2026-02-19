import type { CartItem } from "@/contexts/types";
import { useTranslation } from "react-i18next";
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
  const { t } = useTranslation();
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
            aria-label={t("checkout.decreaseQuantityAria", { name: item.name })}
            className={controlButton()}
            onClick={() => removeItemFromCart(item)}
            type="button"
          >
            -
          </button>
          <span className={quantity()}>{item.quantity}</span>
          <button
            aria-label={t("checkout.increaseQuantityAria", { name: item.name })}
            className={controlButton()}
            onClick={() => addItemToCart(item)}
            type="button"
          >
            +
          </button>
          <button
            aria-label={t("checkout.removeItemAria", { name: item.name })}
            className={controlButton()}
            onClick={() => clearItemsFromCart(item)}
            type="button"
          >
            X
          </button>
        </div>
        <span className={price()}>
          ${(item.price * item.quantity).toFixed(2)}
        </span>
      </div>
    </article>
  );
};

export default CheckoutItemRow;
