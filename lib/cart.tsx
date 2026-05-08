"use client";
import React, { createContext, useContext, useEffect, useMemo, useState } from "react";
import type { CartItem } from "./types";

type CartContextType = { items: CartItem[]; addItem: (item: CartItem) => void; removeItem: (variantId: string) => void; updateQty: (variantId: string, quantity: number) => void; clearCart: () => void; subtotal: number; count: number; };
const CartContext = createContext<CartContextType | null>(null);
const KEY = "afrodita_cart_v4";

export function CartProvider({ children }: { children: React.ReactNode }) {
  const [items, setItems] = useState<CartItem[]>([]);
  useEffect(() => { try { setItems(JSON.parse(localStorage.getItem(KEY) || "[]")); } catch {} }, []);
  useEffect(() => { localStorage.setItem(KEY, JSON.stringify(items)); }, [items]);
  function addItem(item: CartItem) { setItems(current => { const found=current.find(x=>x.variantId===item.variantId); if(found){ return current.map(x=>x.variantId===item.variantId?{...x, quantity: Math.min(x.quantity+item.quantity, item.stock)}:x); } return [...current,item]; }); }
  function removeItem(variantId: string) { setItems(current=>current.filter(x=>x.variantId!==variantId)); }
  function updateQty(variantId: string, quantity: number) { setItems(current=>current.map(x=>x.variantId===variantId?{...x, quantity: Math.max(1, Math.min(quantity, x.stock))}:x)); }
  function clearCart(){ setItems([]); }
  const subtotal = useMemo(()=>items.reduce((sum,item)=>sum+item.price*item.quantity,0),[items]);
  const count = useMemo(()=>items.reduce((sum,item)=>sum+item.quantity,0),[items]);
  return <CartContext.Provider value={{items,addItem,removeItem,updateQty,clearCart,subtotal,count}}>{children}</CartContext.Provider>;
}
export function useCart(){ const ctx=useContext(CartContext); if(!ctx) throw new Error("useCart debe usarse dentro de CartProvider"); return ctx; }
