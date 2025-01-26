import { useContext } from 'react';
import Button from '../Button.component/Button';
import { CartContext } from '../../contexts/Cart.context';
import { buttonTypes } from '../Button.component/button-types';

interface Product {
    id: string;
    name: string;
    imageUrl: string;
    price: number;
    quantity: number; // Add quantity here
}

interface ProductCardProps {
    product: Product;
}

export const ProductCard = ({ product }: ProductCardProps) => {
    const { name, imageUrl, price } = product;
    const { addItemToCart } = useContext(CartContext);

    const addProductToCart = () => {
        const cartItem = { ...product, quantity: 1 };
        addItemToCart(cartItem);
    };

    return (
        <div className="group w-full h-full flex flex-col items-center relative">
            {/* Image */}
            <div className="w-full sm:h-60 h-28">
                <img
                    src={imageUrl}
                    alt={name}
                    className="w-full h-full object-cover hover:opacity-80 transition-opacity duration-300"
                />
            </div>

            {/* Button overlay */}
            <div className="absolute inset-0 flex items-center justify-center bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <Button btnType={buttonTypes.inverted} onClick={addProductToCart}>
                    Add to cart
                </Button>
            </div>

            {/* Details */}
            <div className="w-full flex justify-between items-center text-lg mt-2 px-2">
                <span className="text-left text-gray-800 truncate">{name}</span>
                <span className="text-right text-gray-800">${price}</span>
            </div>
        </div>
    );
};


export default ProductCard;
