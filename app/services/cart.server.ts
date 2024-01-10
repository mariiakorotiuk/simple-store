import { Session } from "@remix-run/node";

export interface CartItem {
  productId: string | number;
  quantity: number;
}

export const SESSION_KEY = "cart";

export type SessionCart = {
  [key: string | number]: number
}

export class Cart {
  constructor(private session: Session) {}

  loadCart(): SessionCart {
    return this.session.get(SESSION_KEY) ?? {}
  }

  saveCart(cart: SessionCart) {
    this.session.set(SESSION_KEY, cart);
  }

  add(productId: string | number) {
    const cart = this.loadCart();
    cart[productId] = (cart[productId] ?? 0) + 1;
    this.saveCart(cart);
  }

  remove(productId: string | number) {
    const cart = this.loadCart();
    if (cart[productId] > 1) {
      cart[productId] = (cart[productId]) - 1;
      this.saveCart(cart);
    }
  }

  removeAll(productId: string | number) {
    const cart = this.loadCart();
    delete cart[productId];
    this.saveCart(cart);
  }

  items(): CartItem[] {
    return Object.entries(this.loadCart()).map(([productId, quantity]) => ({
      productId,
      quantity
    }));
  }
}

export const createCart = (session: Session) => new Cart(session);
