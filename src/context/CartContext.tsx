import React, { createContext, useContext, useState, useEffect } from 'react';

export type CartItem = {
  id: number | string;
  title: string;
  priceNum: number;
  image: string;
  quantity: number;
};

interface CartContextType {
  items: CartItem[];
  addToCart: (product: any, quantity?: number) => void;
  removeFromCart: (id: number | string) => void;
  updateQuantity: (id: number | string, quantity: number) => void;
  clearCart: () => void;
  totalItems: number;
  totalPrice: number;
}

const CartContext = createContext<CartContextType>({} as CartContextType);

export function CartProvider({ children }: { children: React.ReactNode }) {
  const [items, setItems] = useState<CartItem[]>([]);

  // Load from local storage
  useEffect(() => {
    const saved = localStorage.getItem('repairtech_cart');
    if (saved) setItems(JSON.parse(saved));
  }, []);

  // Save to local storage
  useEffect(() => {
    localStorage.setItem('repairtech_cart', JSON.stringify(items));
  }, [items]);

  const addToCart = (product: any, quantity = 1) => {
    setItems(prev => {
      const existing = prev.find(i => i.id === product.id);
      if (existing) {
        return prev.map(i => i.id === product.id ? { ...i, quantity: i.quantity + quantity } : i);
      }
      return [...prev, { 
        id: product.id, 
        title: product.title, 
        priceNum: product.priceNum, 
        image: product.image,
        quantity 
      }];
    });
  };

  const removeFromCart = (id: number | string) => {
    setItems(prev => prev.filter(i => i.id !== id));
  };

  const updateQuantity = (id: number | string, quantity: number) => {
    if (quantity < 1) return;
    setItems(prev => prev.map(i => i.id === id ? { ...i, quantity } : i));
  };

  const clearCart = () => setItems([]);

  const totalItems = items.reduce((sum, item) => sum + item.quantity, 0);
  const totalPrice = items.reduce((sum, item) => sum + (item.priceNum * item.quantity), 0);

  return (
    <CartContext.Provider value={{ items, addToCart, removeFromCart, updateQuantity, clearCart, totalItems, totalPrice }}>
      {children}
    </CartContext.Provider>
  );
}

export const useCart = () => useContext(CartContext);
