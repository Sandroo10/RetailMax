import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
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
  const { t } = useTranslation();
  const { cartItems, totalValue } = useCartContext();

  return (
    <aside className={container()}>
      <div className={list()}>
        {cartItems.length === 0 ? (
          <p className={empty()}>{t("header.cartEmpty")}</p>
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
        <span className={total()}>
          {t("header.cartTotal", { total: totalValue.toFixed(2) })}
        </span>
        <Link
          aria-label={t("header.goToCheckoutAria")}
          className={checkoutButton()}
          onClick={onNavigate}
          to="/checkout"
        >
          {t("navigation.checkout")}
        </Link>
      </div>
    </aside>
  );
};

export default CartDropdown;
