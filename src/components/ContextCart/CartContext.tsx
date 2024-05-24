"use client";
import { ICatlogProducts } from "@/types/Catalog/catalogProducts";
import { useState, useContext, createContext } from "react";

const CartContext = createContext<CartContextType>({
  cart: [],
});

interface CartContextType {
  cart: ICatlogProducts[];
}

export const CartContextProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [cart, setCart] = useState<any[]>([]);
  return (
    <CartContext.Provider
      value={{
        cart,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCartContext = () => useContext(CartContext);
