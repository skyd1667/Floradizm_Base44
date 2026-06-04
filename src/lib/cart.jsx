import React, { createContext, useContext, useState, useEffect } from 'react';

const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const [items, setItems] = useState(() => {
    try {
      return JSON.parse(localStorage.getItem('floradizm_cart') || '[]');
    } catch { return []; }
  });
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    localStorage.setItem('floradizm_cart', JSON.stringify(items));
  }, [items]);

  const addItem = (product, quantity = 1) => {
    setItems(prev => {
      const existing = prev.find(i => i.product_id === product.id);
      if (existing) {
        return prev.map(i => i.product_id === product.id
          ? { ...i, quantity: i.quantity + quantity }
          : i
        );
      }
      return [...prev, {
        product_id: product.id,
        name_ko: product.name_ko,
        name_en: product.name_en,
        price: product.price,
        image: product.images?.[0] || '',
        quantity
      }];
    });
    setIsOpen(true);
  };

  const removeItem = (productId) => {
    setItems(prev => prev.filter(i => i.product_id !== productId));
  };

  const updateQuantity = (productId, quantity) => {
    if (quantity <= 0) { removeItem(productId); return; }
    setItems(prev => prev.map(i => i.product_id === productId ? { ...i, quantity } : i));
  };

  const clearCart = () => setItems([]);

  const totalItems = items.reduce((sum, i) => sum + i.quantity, 0);
  const subtotal = items.reduce((sum, i) => sum + i.price * i.quantity, 0);

  return (
    <CartContext.Provider value={{ items, addItem, removeItem, updateQuantity, clearCart, totalItems, subtotal, isOpen, setIsOpen }}>
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => useContext(CartContext);
