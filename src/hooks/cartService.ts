// src/services/cartService.ts

const CART_KEY = "cart";

export type CartItem = {
    id: string;
    quantity: number;
};

function readCart(): CartItem[] {
    try {
        const raw = localStorage.getItem(CART_KEY);
        if (!raw) return [];
        const parsed = JSON.parse(raw);
        if (!Array.isArray(parsed)) return [];
        return parsed
            .map((item) => ({
                id: String(item.id),
                quantity: Number(item.quantity) || 1,
            }))
            .filter((item) => item.quantity > 0);
    } catch {
        return [];
    }
}

function writeCart(cart: CartItem[]) {
    localStorage.setItem(CART_KEY, JSON.stringify(cart));
}

export function getCart(): CartItem[] {
    return readCart();
}

export function addToCart(id: string, quantity: number = 1): CartItem[] {
    const cart = readCart();
    const existing = cart.find((item) => item.id === id);

    if (existing) {
        existing.quantity += quantity;
    } else {
        cart.push({ id, quantity });
    }

    writeCart(cart);
    return cart;
}

export function setItemQuantity(id: string, quantity: number): CartItem[] {
    let cart = readCart();

    cart = cart
        .map((item) =>
            item.id === id ? { ...item, quantity } : item
        )
        .filter((item) => item.quantity > 0);

    writeCart(cart);
    return cart;
}

export function clearCart() {
    localStorage.removeItem(CART_KEY);
}
