import { useContext } from 'react';
import { CartContext } from '../../contexts/Cart.context';
import { CartItem } from '../../contexts/types';

interface CheckoutItemProps {
    item: CartItem;
}

const CheckoutItem = ({ item }: CheckoutItemProps) => {
    const { clearItemsFromCart, addItemToCart, removeItemFromCart } =
        useContext(CartContext);

    const clearItemsFromCartHandler = () => clearItemsFromCart(item);
    const addItemHandler = () => addItemToCart(item);
    const removeItemHandler = () => removeItemFromCart(item);

    const { id, imageUrl, name, price, quantity } = item;

    return (
        <div
            className="flex sm:flex-row flex sm:items-center border-b border-gray-700 py-4 w-full"
            key={id}
        >
            {/* Image */}
            <div className="w-full sm:w-[23%] mb-4 sm:mb-0">
                <img src={imageUrl} alt={name} className="w-full h-full object-cover" />
            </div>

            <div className='sm:flex sm:flex-row sm:w-full sm:justify-between'>
            <span className="w-full sm:w-[23%] text-center sm:text-left mb-2 sm:mb-0">
                {name}
            </span>

            {/* Quantity */}
            <div className="w-full sm:w-[23%] flex justify-center sm:justify-start items-center mb-2 sm:mb-0">
                <div onClick={removeItemHandler} className="cursor-pointer">
                    &#10094;
                </div>
                <span className="mx-2.5">{quantity}</span>
                <div onClick={addItemHandler} className="cursor-pointer">
                    &#10095;
                </div>
            </div>

            {/* Price */}
            <span className="w-full sm:w-[23%] text-center sm:text-left mb-2 sm:mb-0">
                ${price}
            </span>

            {/* Remove */}
            <div
                onClick={clearItemsFromCartHandler}
                className="w-full sm:w-[8%] flex justify-center sm:justify-start text-red-500 cursor-pointer"
            >
                &#10005;
            </div>
            </div>
        </div>
    );
};

export default CheckoutItem;
