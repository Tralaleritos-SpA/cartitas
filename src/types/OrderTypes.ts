import type { User } from "./UserTypes";

// --- Tipos de ítems ---
export interface OrderItem {
    id: string;
    product: any;
    quantity: number;
    unitPrice: number;
    subTotal: number;
}

export interface OrderSummary {
    id: string;
    total_price: number;
    created_at: string;
    status: string;
    shippingCity: string;
    // optional user info for list views (API may include a nested user or simple fields)
    user?: Partial<User> | { fullName?: string; email?: string };
}

export interface Order {
    id: string;
    user: User;
    total_price: number;
    createdAt: Date;
    status: "PENDIENTE" | "SHIPPED" | "ENVIADO" | string;

    fullName: string;
    phone: string;
    shippingAddress: string;
    shippingCity: string;
    shippingZip: string;

    items: OrderItem[];
    shippingFee: number;
}
