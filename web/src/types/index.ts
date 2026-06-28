export interface Product {
  id: string;
  name: string;
  category: string;
  price: string;
  icon: string;
  rating: string;
  badge?: string;
  swatch: string;
  sku?: string;
  description?: string;
  comparePrice?: string;
}

export interface CartItem extends Product {
  qty: number;
  variant: string;
  total: string;
}

export interface Order {
  id: string;
  date: string;
  items: number;
  status: string;
  statusBg: string;
  statusColor: string;
  total: string;
  customer?: string;
  initials?: string;
  pay?: string;
  payBg?: string;
  payColor?: string;
}

export type Theme = 'light' | 'dark';
export type Screen = 'home' | 'plp' | 'pdp' | 'cart' | 'checkout' | 'success' | 'dash';
export type AdminScreen = 'dash' | 'products' | 'orders' | 'customers' | 'inventory' | 'coupons' | 'reports' | 'settings' | 'logs';
