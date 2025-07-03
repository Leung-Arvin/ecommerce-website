import React, { createContext, useState, useContext } from "react";

const CartContext = createContext();

export const useCart = () => {
  return useContext(CartContext);
};

export const CartProvider = ({ children }) => {
  const [cartItems, setCartItems] = useState([]);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [notification, setNotification] = useState(null);

  const addToCart = (product) => {
    setCartItems((prevItems) => [...prevItems, product]);
    setNotification(`${product.name} added to cart!`);
    setTimeout(() => setNotification(null), 3000);
  };

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  return (
    <CartContext.Provider
      value={{
        cartItems,
        addToCart,
        toggleSidebar,
        isSidebarOpen,
        notification,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};
