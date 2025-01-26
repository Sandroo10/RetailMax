// CartContext.tsx
import { createContext, useState, useEffect, ReactNode } from "react";
import { CartItem, CartContextType } from "./types";

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

  if (existingCartItem && existingCartItem.quantity === 1) {
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

// Function to clear the entire cart

export const CartContext = createContext<CartContextType>({
  isCartOpen: false,
  setIsCartOpen: () => {},
  cartItems: [],
  addItemToCart: () => {},
  removeItemFromCart: () => {},
  clearItemsFromCart: () => {},
  emptyCart: () => {}, // Added emptyCart function
  totalQuantity: 0,
  totalValue: 0,
});

interface CartProviderProps {
  children: ReactNode;
}

export const CartProvider = ({ children }: CartProviderProps) => {
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [totalQuantity, setTotalQuantity] = useState(0);
  const [totalValue, setTotalValue] = useState(0);

  const emptyCart = () => {
    setCartItems([]); // Clear the entire cart
  };

  const addItemToCart = (productToAdd: CartItem) => {
    setCartItems(addCartItem(cartItems, productToAdd));
  };

  const removeItemFromCart = (productToRemove: CartItem) => {
    setCartItems(removeCartItem(cartItems, productToRemove));
  };

  const clearItemsFromCart = (itemToClear: CartItem) => {
    setCartItems(clearCartItems(cartItems, itemToClear));
  };

  useEffect(() => {
    const newTotalQuantity = cartItems.reduce(
      (total, cartItem) => total + cartItem.quantity,
      0,
    );
    setTotalQuantity(newTotalQuantity);
  }, [cartItems]);

  useEffect(() => {
    const newTotalValue = cartItems.reduce(
      (total, cartItem) => total + cartItem.price * cartItem.quantity,
      0,
    );
    setTotalValue(newTotalValue);
  }, [cartItems]);

  const value: CartContextType = {
    isCartOpen,
    setIsCartOpen,
    addItemToCart,
    cartItems,
    removeItemFromCart,
    totalQuantity,
    clearItemsFromCart,
    totalValue,
    emptyCart, // Provide emptyCartHandler here
  };

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
};
