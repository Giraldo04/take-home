import { persistentMap } from '@nanostores/persistent';
import type { CartItem } from './types';

type CartState = Record<string, CartItem>;

// Estado del carrito: mapa id -> item. Persiste en localStorage automáticamente.
export const cart = persistentMap<CartState>(
  'cart:',
  {},
  { encode: JSON.stringify, decode: JSON.parse },
);

export function addItem(p: { id: string; name: string; price: number }): void {
  const existing = cart.get()[p.id];
  cart.setKey(p.id, {
    id: p.id,
    name: p.name,
    price: p.price,
    qty: (existing?.qty ?? 0) + 1,
  });
}

export function decrementItem(id: string): void {
  const existing = cart.get()[id];
  if (!existing) return;
  if (existing.qty <= 1) {
    removeItem(id);
  } else {
    cart.setKey(id, { ...existing, qty: existing.qty - 1 });
  }
}

export function removeItem(id: string): void {
  const { [id]: _removed, ...rest } = cart.get();
  cart.set(rest);
}

export function clearCart(): void {
  cart.set({});
}

export function getItems(): CartItem[] {
  return Object.values(cart.get());
}

export function getCount(): number {
  return getItems().reduce((sum, i) => sum + i.qty, 0);
}

export function getTotal(): number {
  return getItems().reduce((sum, i) => sum + i.price * i.qty, 0);
}
