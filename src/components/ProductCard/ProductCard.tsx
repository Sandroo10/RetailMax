import { useContext } from "react";
import { Link } from "react-router-dom";
import Button from "../Button.component/Button";
import { CartContext } from "../../contexts/Cart.context";
import { buttonTypes } from "../Button.component/button-types";

interface Product {
    id: number;
    name: string;
    image_url: string;
    price: number;
}

interface ProductCardProps {
    product: Product;
}

export const ProductCard = ({ product }: ProductCardProps) => {
    const { id, name, image_url, price } = product;
    const { addItemToCart } = useContext(CartContext);

    const addProductToCart = () => {
        const cartItem = { ...product, quantity: 1 };
        addItemToCart(cartItem);
    };

    return (
        <div className="group w-full h-full flex flex-col items-center relative">
            <div className="w-full sm:h-60 h-28">
                <Link to={`/product/${id}`}>
                    <img
                        src={image_url}
                        alt={name}
                        className="w-full h-full object-cover hover:opacity-80 transition-opacity duration-300"
                    />
                </Link>
            </div>

            <div className="absolute inset-0 flex items-center justify-center bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none">
                <Button btnType={buttonTypes.inverted} onClick={addProductToCart}>
                    Add to cart
                </Button>
            </div>

            <div className="w-full flex justify-between items-center text-lg mt-2 px-2">
                <span className="text-left text-gray-800 truncate">{name}</span>
                <span className="text-right text-gray-800">${price}</span>
            </div>
        </div>
    );
};

export default ProductCard;
