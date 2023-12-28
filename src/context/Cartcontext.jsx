import React, { createContext, useContext, useState } from "react";

const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const [cartItemCount, setCartItemCount] = useState(0);

  return (
    <CartContext.Provider value={{ cartItemCount, setCartItemCount }}>
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => useContext(CartContext);
