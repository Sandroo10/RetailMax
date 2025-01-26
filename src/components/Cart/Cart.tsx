import { useContext } from 'react';
import { CartContext } from '../../contexts/Cart.context';
import shoppingBag from '../../assets/shopping-bag.svg';

export const Cart = () => {
    const { isCartOpen, setIsCartOpen, totalQuantity } =
        useContext(CartContext);

    const cartDropdownToggle = () => setIsCartOpen(!isCartOpen);

    return (
        <div
            className="relative w-12 h-12 flex items-center justify-center cursor-pointer hover:bg-gray-500 rounded"
            onClick={cartDropdownToggle}
        >
            <img src={shoppingBag} alt="Cart" className="w-6 h-6" />
            <span className="absolute bottom-3 text-xs font-bold text-black">
                {totalQuantity}
            </span>
        </div>
    );
};

export default Cart;
