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
    const productWithQuantity = { ...product, quantity: 1 };
    setCartItems((prevItems) => [...prevItems, productWithQuantity]);
    setNotification(`${product.name} added to cart!`);
    setTimeout(() => setNotification(null), 3000);
  };

  const handleDeleteItem = (indexToRemove) => {
    setCartItems((prevItems) =>
      prevItems.filter((_, i) => i !== indexToRemove)
    );
  };

  const updateItemQuantity = (index, amount) => {
    setCartItems((prevItems) =>
      prevItems.map((item, i) =>
        i === index
          ? { ...item, quantity: Math.max(1, item.quantity + amount) }
          : item
      )
    );
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
        handleDeleteItem,
        updateItemQuantity,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};
