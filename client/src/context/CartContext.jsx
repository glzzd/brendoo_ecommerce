import React, { createContext, useState, useEffect, useContext } from 'react';
import { useAuth } from './AuthContext';

const CartContext = createContext();

export const useCart = () => useContext(CartContext);

export const CartProvider = ({ children }) => {
  const { user } = useAuth();
  const cartKey = user ? `cart_${user.id}` : 'cart';

  const [cartItems, setCartItems] = useState(() => {
    // Initial load only checks 'cart' because auth might not be ready or user is null initially
    // But actually, if AuthContext loads fast, we might have user.
    // However, useState initializer runs once. 
    // We'll rely on useEffect to switch keys, but we can try to be smart here.
    const savedCart = localStorage.getItem('cart'); 
    return savedCart ? JSON.parse(savedCart) : [];
  });

  // Sync with storage key changes (User login/logout)
  useEffect(() => {
    const savedCart = localStorage.getItem(cartKey);
    if (savedCart) {
      setCartItems(JSON.parse(savedCart));
    } else {
      setCartItems([]);
    }
  }, [cartKey]);

  // Persist to storage
  useEffect(() => {
    localStorage.setItem(cartKey, JSON.stringify(cartItems));
  }, [cartItems, cartKey]);

  const addToCart = (product, quantity = 1) => {
    setCartItems((prevItems) => {
      const existingItem = prevItems.find((item) => item.id === product.id);
      if (existingItem) {
        return prevItems.map((item) =>
          item.id === product.id
            ? { ...item, quantity: item.quantity + quantity }
            : item
        );
      }
      return [...prevItems, { ...product, quantity }];
    });
  };

  const removeFromCart = (productId) => {
    setCartItems((prevItems) => prevItems.filter((item) => item.id !== productId));
  };

  const updateQuantity = (productId, quantity) => {
    if (quantity < 1) return;
    setCartItems((prevItems) =>
      prevItems.map((item) =>
        item.id === productId ? { ...item, quantity } : item
      )
    );
  };

  const mergeCart = (userCartItems) => {
    setCartItems((prevItems) => {
      // Create a map of the user's cart items for easy lookup
      const mergedMap = new Map();
      
      // Add all items from the user's saved cart
      userCartItems.forEach(item => {
        mergedMap.set(item.id, { ...item });
      });
      
      // Merge guest cart items
      prevItems.forEach(guestItem => {
        if (mergedMap.has(guestItem.id)) {
          // If item exists, sum the quantities
          const existingItem = mergedMap.get(guestItem.id);
          existingItem.quantity += guestItem.quantity;
        } else {
          // If not, add it to the map
          mergedMap.set(guestItem.id, { ...guestItem });
        }
      });
      
      return Array.from(mergedMap.values());
    });
  };

  const clearCart = () => {
    setCartItems([]);
  };

  const cartCount = cartItems.reduce((total, item) => total + item.quantity, 0);

  return (
    <CartContext.Provider
      value={{
        cartItems,
        addToCart,
        removeFromCart,
        updateQuantity,
        mergeCart,
        clearCart,
        cartCount,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};
