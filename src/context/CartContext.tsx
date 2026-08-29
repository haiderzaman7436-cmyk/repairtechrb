import React, { createContext, useContext, useState, useEffect } from 'react';
import { useAuth } from './AuthContext';
import { db } from '../lib/firebase';
import { doc, setDoc, onSnapshot } from 'firebase/firestore';

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
  loading: boolean;
}

const CartContext = createContext<CartContextType>({} as CartContextType);

export function CartProvider({ children }: { children: React.ReactNode }) {
  const [items, setItems] = useState<CartItem[]>([]);
  const [loading, setLoading] = useState(true);
  const { user } = useAuth();

  // Load from Firestore
  useEffect(() => {
    if (!user) {
      setItems([]);
      setLoading(false);
      return;
    }

    const cartRef = doc(db, 'carts', user.uid);
    const unsubscribe = onSnapshot(cartRef, (docSnap) => {
      if (docSnap.exists()) {
        setItems(docSnap.data().items || []);
      } else {
        setItems([]);
      }
      setLoading(false);
    }, (error) => {
      console.error("Error fetching cart:", error);
      setLoading(false);
    });

    return () => unsubscribe();
  }, [user]);

  const saveCart = async (newItems: CartItem[]) => {
    if (!user) return;
    try {
      const cartRef = doc(db, 'carts', user.uid);
      await setDoc(cartRef, { items: newItems }, { merge: true });
    } catch (error) {
      console.error("Error saving cart to Firebase:", error);
    }
  };

  const addToCart = (product: any, quantity = 1) => {
    setItems(prev => {
      let newItems;
      const existing = prev.find(i => i.id === product.id);
      if (existing) {
        newItems = prev.map(i => i.id === product.id ? { ...i, quantity: i.quantity + quantity } : i);
      } else {
        newItems = [...prev, {
          id: product.id,
          title: product.title,
          priceNum: product.priceNum,
          image: product.image,
          quantity
        }];
      }
      saveCart(newItems);
      return newItems;
    });
  };

  const removeFromCart = (id: number | string) => {
    setItems(prev => {
      const newItems = prev.filter(i => i.id !== id);
      saveCart(newItems);
      return newItems;
    });
  };

  const updateQuantity = (id: number | string, quantity: number) => {
    if (quantity < 1) return;
    setItems(prev => {
      const newItems = prev.map(i => i.id === id ? { ...i, quantity } : i);
      saveCart(newItems);
      return newItems;
    });
  };

  const clearCart = () => {
    setItems([]);
    saveCart([]);
  };

  const totalItems = items.reduce((sum, item) => sum + item.quantity, 0);
  const totalPrice = items.reduce((sum, item) => sum + (item.priceNum * item.quantity), 0);

  return (
    <CartContext.Provider value={{ items, addToCart, removeFromCart, updateQuantity, clearCart, totalItems, totalPrice, loading }}>
      {children}
    </CartContext.Provider>
  );
}

export const useCart = () => useContext(CartContext);
