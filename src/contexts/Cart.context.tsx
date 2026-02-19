import {
  createContext,
  useCallback,
  useMemo,
  useState,
  type ReactNode,
} from "react";
import { type CartItem, type CartContextType } from "./types";

const addCartItem = (
  cartItems: CartItem[],
  productToAdd: CartItem,
): CartItem[] => {
  const existingCartItem = cartItems.find(
    (item) => item.id === productToAdd.id,
  );

  if (existingCartItem) {
    return cartItems.map((item) =>
      item.id === productToAdd.id
        ? { ...item, quantity: item.quantity + 1 }
        : item,
    );
  }

  return [...cartItems, { ...productToAdd, quantity: 1 }];
};

const removeCartItem = (
  cartItems: CartItem[],
  productToRemove: CartItem,
): CartItem[] => {
  const existingCartItem = cartItems.find(
    (item) => item.id === productToRemove.id,
  );

  if (existingCartItem?.quantity === 1) {
    return cartItems.filter((item) => item.id !== productToRemove.id);
  }

  return cartItems.map((item) =>
    item.id === productToRemove.id
      ? { ...item, quantity: item.quantity - 1 }
      : item,
  );
};

const clearCartItems = (
  cartItems: CartItem[],
  itemToClear: CartItem,
): CartItem[] => cartItems.filter((item) => item.id !== itemToClear.id);

export const CartContext = createContext<CartContextType>({
  isCartOpen: false,
  setIsCartOpen: () => undefined,
  cartItems: [],
  addItemToCart: () => undefined,
  removeItemFromCart: () => undefined,
  clearItemsFromCart: () => undefined,
  emptyCart: () => undefined,
  totalQuantity: 0,
  totalValue: 0,
});

interface CartProviderProps {
  children: ReactNode;
}

export const CartProvider = ({ children }: CartProviderProps) => {
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [cartItems, setCartItems] = useState<CartItem[]>([]);

  const emptyCart = useCallback(() => {
    setCartItems([]);
  }, []);

  const addItemToCart = useCallback((productToAdd: CartItem) => {
    setCartItems((prevItems) => addCartItem(prevItems, productToAdd));
  }, []);

  const removeItemFromCart = useCallback((productToRemove: CartItem) => {
    setCartItems((prevItems) => removeCartItem(prevItems, productToRemove));
  }, []);

  const clearItemsFromCart = useCallback((itemToClear: CartItem) => {
    setCartItems((prevItems) => clearCartItems(prevItems, itemToClear));
  }, []);

  const totals = useMemo(() => {
    const totalQuantity = cartItems.reduce(
      (total, cartItem) => total + cartItem.quantity,
      0,
    );

    const totalValue = cartItems.reduce(
      (total, cartItem) => total + cartItem.price * cartItem.quantity,
      0,
    );

    return { totalQuantity, totalValue };
  }, [cartItems]);

  const value = useMemo<CartContextType>(
    () => ({
      isCartOpen,
      setIsCartOpen,
      cartItems,
      addItemToCart,
      removeItemFromCart,
      clearItemsFromCart,
      emptyCart,
      totalQuantity: totals.totalQuantity,
      totalValue: totals.totalValue,
    }),
    [
      isCartOpen,
      cartItems,
      addItemToCart,
      removeItemFromCart,
      clearItemsFromCart,
      emptyCart,
      totals.totalQuantity,
      totals.totalValue,
    ],
  );

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
};
