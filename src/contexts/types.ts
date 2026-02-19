export interface CartItem {
  id: number;
  name: string;
  price: number;
  image_url: string;
  quantity: number;
  description?: string;
  in_stock?: boolean;
  category?: string;
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

export interface AuthUser {
  uid: string;
  email?: string;
  displayName?: string;
  photoURL?: string;
  token: string;
}
