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
    setCartItems((prevItems) => {
      // Check if the product already exists in the cart
      const existingItemIndex = prevItems.findIndex(
        (item) => item.id === product.id
      );

      if (existingItemIndex >= 0) {
        // If exists, increase quantity
        return prevItems.map((item, index) =>
          index === existingItemIndex
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      } else {
        // If not exists, add new item with quantity 1
        return [...prevItems, { ...product, quantity: 1 }];
      }
    });

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
