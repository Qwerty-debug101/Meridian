import { useState, useCallback } from 'react';
import type { Theme, Screen, CartItem } from '../types';

const SWATCHES = [
  'linear-gradient(135deg,#6b73ff,#3a2a6b)',
  'linear-gradient(135deg,#1f9d63,#0e5e3a)',
  'linear-gradient(135deg,#e0683a,#a8431f)',
  'linear-gradient(135deg,#3a3a47,#16161d)',
  'linear-gradient(135deg,#c98a1a,#7a520d)',
  'linear-gradient(135deg,#d6453d,#8a221c)',
];

export const SWATCHES_LIST = SWATCHES;

export const INITIAL_CART: CartItem[] = [
  { id:'1', name:'Aria Wireless Headphones', category:'Audio', variant:'Color: Midnight', sku:'ARIA-BLK-01', qty:1, total:'$129.00', price:'$129.00', icon:'headphones', swatch:SWATCHES[0], rating:'4.8' },
  { id:'2', name:'Terra Ceramic Mug', category:'Home', variant:'Color: Sand', sku:'TERRA-SND-02', qty:2, total:'$48.00', price:'$24.00', icon:'coffee', swatch:SWATCHES[1], rating:'4.9' },
  { id:'3', name:'Nomad Leather Wallet', category:'Accessories', variant:'Color: Tan', sku:'NOMAD-TAN-01', qty:1, total:'$59.00', price:'$59.00', icon:'wallet', swatch:SWATCHES[2], rating:'4.7' },
];

export function useAppState() {
  const [theme, setTheme] = useState<Theme>('light');
  const [screen, setScreen] = useState<Screen>('home');
  const [qty, setQty] = useState(1);
  const [cart, setCart] = useState<CartItem[]>(INITIAL_CART);

  const toggleTheme = useCallback(() => {
    setTheme(t => t === 'light' ? 'dark' : 'light');
  }, []);

  const go = useCallback((s: Screen) => {
    setScreen(s);
    window.scrollTo(0, 0);
  }, []);

  const cartCount = cart.reduce((sum, it) => sum + it.qty, 0);

  const addToCart = useCallback(() => {
    setCart(prev => {
      const existing = prev.find(it => it.id === '1');
      if (existing) return prev.map(it => it.id === '1' ? { ...it, qty: it.qty + qty } : it);
      return prev;
    });
    go('cart');
  }, [qty, go]);

  const updateQty = useCallback((id: string, delta: number) => {
    setCart(prev => prev.map(it => it.id === id ? { ...it, qty: Math.max(1, it.qty + delta) } : it).filter(it => it.qty > 0));
  }, []);

  const removeItem = useCallback((id: string) => {
    setCart(prev => prev.filter(it => it.id !== id));
  }, []);

  return {
    theme, toggleTheme,
    screen, go,
    qty, incQty: () => setQty(q => q + 1), decQty: () => setQty(q => Math.max(1, q - 1)),
    cart, cartCount, addToCart, updateQty, removeItem,
  };
}
