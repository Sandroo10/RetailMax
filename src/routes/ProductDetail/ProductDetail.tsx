import { useParams } from "react-router-dom";
import { useGetSingleProduct } from "../../components/Query/products";
import { buttonTypes } from "../../components/Button.component/button-types";
import Button from "../../components/Button.component/Button";
import { CartContext } from "../../contexts/Cart.context";
import { useContext } from "react";
import { CartItem } from "../../contexts/types";

const ProductDetail = () => {
  const { id } = useParams<{ id: string }>();

  const productId = id ? id.split("-").pop() : undefined;
  const { addItemToCart } = useContext(CartContext);

  const addProductToCart = () => {
    if (!product || !product.id) {
      console.error("Product or Product ID is undefined");
      return;
    }

    const cartItem: CartItem = {
      id: product.id,
      name: product.name,
      description: product.description,
      price: product.price,
      image_url: product.image_url,
      in_stock: product.in_stock,
      category: product.category,
      quantity: 1,
    };

    addItemToCart(cartItem);
  };

  const { data: product, isLoading, isError } = useGetSingleProduct(productId);

  if (isLoading) {
    return <div>Loading product details...</div>;
  }

  if (isError || !product) {
    return <div>Error loading product. Please try again later.</div>;
  }

  return (
    <div className="max-w-4xl mx-auto p-4">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <img
          src={product.image_url}
          alt={product.name}
          className="w-full h-auto rounded-lg shadow-lg"
        />
        <div>
          <h2 className="text-2xl font-bold mb-2">{product.name}</h2>
          <p className="text-lg text-gray-600 mb-4 dark:text-white">
            {product.description}
          </p>
          <p className="text-xl font-semibold mb-2">Price: ${product.price}</p>
          <p
            className={`text-lg ${product.in_stock ? "text-green-600" : "text-red-600"}`}
          >
            {product.in_stock ? "In Stock" : "Out of Stock"}
          </p>
          <Button btnType={buttonTypes.inverted} onClick={addProductToCart}>
            Add to cart
          </Button>
        </div>
      </div>
    </div>
  );
};

export default ProductDetail;
