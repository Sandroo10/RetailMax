import { useContext } from "react";
import { CartContext } from "@/contexts/Cart.context";

export const useCartContext = () => {
  return useContext(CartContext);
};
