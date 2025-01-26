import Button from '../Button.component/Button';
import CartItem from '../Cart-item/Cart-Item';
import { useContext } from 'react';
import { CartContext } from '../../contexts/Cart.context';
import { useNavigate } from 'react-router-dom';

export const CartDropdown = () => {
    const { cartItems } = useContext(CartContext);
    const navigate = useNavigate();

    const goToCheckoutHandler = () => {
        navigate('/checkout');
    };

    return (
        <div className="absolute w-60 h-80 flex flex-col p-5 border border-black bg-white top-24 right-10 z-50">
            <div className="h-60 flex flex-col overflow-y-scroll">
                {cartItems.length ? (
                    cartItems.map((item) => (
                        <CartItem key={item.id} cartItem={item} />
                    ))
                ) : (
                    <span className="text-lg my-12 mx-auto">
                        Your cart is empty
                    </span>
                )}
            </div>
            <Button onClick={goToCheckoutHandler}>GO TO CHECKOUT</Button>
        </div>
    );
};

export default CartDropdown;
