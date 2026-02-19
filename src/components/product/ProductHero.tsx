import { container, subtitle, title } from "./ProductHero.styles";

const ProductHero = () => {
  return (
    <div className={container()}>
      <h1 className={title()}>Product Details</h1>
      <p className={subtitle()}>
        Review item specs and add products directly to your cart.
      </p>
    </div>
  );
};

export default ProductHero;
