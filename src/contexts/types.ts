import { createContext } from "react";

export interface CartItem {
    id: number;
    name: string;
    price: number;
    image_url: string;
    quantity: number;
    description?: string;
    in_stock?:boolean;
    category?:string; 
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
    id: number;
    name: string;
    image_url: string;
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