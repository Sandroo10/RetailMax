interface CartItemProps {
    cartItem: {
        name: string;
        quantity: number;
        image_url: string;
        price: number;
    };
}

const CartItem = ({ cartItem }: CartItemProps) => {
    const { name, quantity, image_url, price } = cartItem;

    return (
        <div className="w-full h-12 flex mb-4">
            <img src={image_url} alt={name} className="w-[30%]" />
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
