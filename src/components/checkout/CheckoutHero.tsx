import { container, subtitle, title } from "./CheckoutHero.styles";

const CheckoutHero = () => {
  return (
    <div className={container()}>
      <h1 className={title()}>Checkout</h1>
      <p className={subtitle()}>
        Review your cart and complete payment details to finish your order.
      </p>
    </div>
  );
};

export default CheckoutHero;
