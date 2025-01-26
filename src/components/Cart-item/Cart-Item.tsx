interface CartItemProps {
    cartItem: {
        name: string;
        quantity: number;
        imageUrl: string;
        price: number;
    };
}

const CartItem = ({ cartItem }: CartItemProps) => {
    const { name, quantity, imageUrl, price } = cartItem;

    return (
        <div className="w-full flex h-20 mb-4">
            <img src={imageUrl} alt={name} className="w-[30%]" />
            <div className="w-[70%] flex flex-col items-start justify-center px-5">
                <span className="text-base">{name}</span>
                <span className="text-base">
                    {quantity} x ${price}
                </span>
            </div>
        </div>
    );
};

export default CartItem;
