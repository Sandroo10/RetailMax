import { Link } from "react-router-dom";
import { useCartContext } from "@/hooks/useCartContext";
import {
  actions,
  checkoutButton,
  container,
  content,
  empty,
  image,
  list,
  name,
  price,
  row,
  total,
} from "./CartDropdown.styles";

interface CartDropdownProps {
  onNavigate: () => void;
}

const CartDropdown = ({ onNavigate }: CartDropdownProps) => {
  const { cartItems, totalValue } = useCartContext();

  return (
    <aside className={container()}>
      <div className={list()}>
        {cartItems.length === 0 ? (
          <p className={empty()}>Your cart is empty.</p>
        ) : (
          cartItems.map((item) => (
            <article className={row()} key={item.id}>
              <img alt={item.name} className={image()} src={item.image_url} />
              <div className={content()}>
                <p className={name()}>{item.name}</p>
                <p className={price()}>
                  {item.quantity} x ${item.price}
                </p>
              </div>
            </article>
          ))
        )}
      </div>

      <div className={actions()}>
        <span className={total()}>Total: ${totalValue.toFixed(2)}</span>
        <Link
          aria-label="Go to checkout"
          className={checkoutButton()}
          onClick={onNavigate}
          to="/checkout"
        >
          Checkout
        </Link>
      </div>
    </aside>
  );
};

export default CartDropdown;
