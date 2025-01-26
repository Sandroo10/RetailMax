import { createContext } from "react";

export interface CartItem {
    id: string;
    name: string;
    price: number;
    imageUrl: string;
    quantity: number;
}

export interface CartContextType {
    isCartOpen: boolean;
    setIsCartOpen: (isOpen: boolean) => void;
    cartItems: CartItem[];
    addItemToCart: (product: CartItem) => void;
    removeItemFromCart: (product: CartItem) => void;
    clearItemsFromCart: (product: CartItem) => void;
    emptyCart: () => void;
    totalQuantity: number;
    totalValue: number;
}

export interface Product {
    id: string;
    name: string;
    imageUrl: string;
    price: number;
    quantity: number;
}
export interface CategoriesContextType {
    categories: Record<string, Product[]>;
}
export interface CartItem extends Product {
    quantity: number;
}

export const CategoriesContext = createContext<CategoriesContextType>({
    categories: {},
});