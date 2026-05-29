export interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  image: string;
  category: string;
}

export interface CartItem {
  id: string;
  name: string;
  price: number;
  qty: number;
}

export interface Order {
  items: Array<{ id: string; name: string; price: number; qty: number }>;
  total: number;
  customer: {
    name: string;
    email: string;
    notes: string;
  };
}
