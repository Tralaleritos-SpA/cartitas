// src/services/orderService.ts

import type { CartItem } from "../hooks/cartService";
import { SHIPPING_COST } from "../config/constants";

type CartItemDTO = {
    productId: string;
    quantity: number;
};

type OrderRequestDTO = {
    userId: string;
    items: CartItemDTO[];
    fullName: string;
    phone: string;
    shippingFee: number;
    shippingAddress: string;
    shippingCity: string;
    shippingZip: string;
};

type ShippingData = {
    fullName: string;
    phone: string;
    address: string;
    city: string;
    zip: string;
    region: string;
    country: string;
};

export interface OrderSummary {
    id: string;
    total_price: number;
    created_at: Date;
    status: string;
    shippingCity: string;
}

export interface OrderItemDetails {
    id: string;
    quantity: number;
    unitPrice: number;
    subTotal: number;
    product: {
        id: string;
        name: string;
    };
}

export interface OrderDetails extends OrderSummary {
    fullName: string;
    phone: string;
    shippingAddress: string;
    shippingZip: string;
    shippingFee: number;
    items: OrderItemDetails[];
}

const apiURL = "http://localhost:6969/api/v1/orders";

export async function createOrder(
    cartItems: CartItem[],
    userId: string,
    shippingData: ShippingData
): Promise<OrderDetails> {
    const itemsDTO: CartItemDTO[] = cartItems.map((item) => ({
        productId: item.id,
        quantity: item.quantity,
    }));

    const requestBody: OrderRequestDTO = {
        userId,
        items: itemsDTO,
        shippingFee: SHIPPING_COST,
        fullName: shippingData.fullName,
        phone: shippingData.phone,
        shippingAddress: shippingData.address,
        shippingCity: shippingData.city,
        shippingZip: shippingData.zip,
    };

    try {
        const response = await fetch(apiURL, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(requestBody),
        });

        if (response.ok) {
            const data = await response.json().catch(() => null);
            try {
                console.debug(
                    "orderService.createOrder - success response:",
                    data
                );
            } catch {}

            // Normalize created_at to Date. API may return created_at or createdAt.
            if (data) {
                if (typeof data.created_at === "string") {
                    data.created_at = new Date(data.created_at);
                } else if (typeof data.createdAt === "string") {
                    data.created_at = new Date(data.createdAt);
                }
            }

            return data as OrderDetails;
        }

        // For error responses, try to read JSON first; if parsing fails, read as text.
        let errorBody: any = null;
        try {
            errorBody = await response.json();
        } catch (e) {
            try {
                errorBody = await response.text();
            } catch (e2) {
                errorBody = null;
            }
        }

        const errorMsg =
            typeof errorBody === "string"
                ? errorBody
                : errorBody?.message ?? `HTTP ${response.status}`;

        try {
            console.debug("orderService.createOrder - error response:", {
                status: response.status,
                body: errorBody,
            });
        } catch {}

        throw new Error(`API Error Status ${response.status}: ${errorMsg}`);
    } catch (error) {
        const errorMessage =
            error instanceof Error ? error.message : String(error);
        throw new Error(
            "API Error in orderService.createOrder: " + errorMessage
        );
    }
}

export async function fetchOrderById(orderId: string): Promise<OrderDetails> {
    try {
        const response = await fetch(`${apiURL}/${orderId}`);

        if (!response.ok) {
            throw new Error(
                `Failed to fetch order ${orderId}. Status: ${response.status}`
            );
        }

        const orderData = await response.json();
        if (orderData) {
            if (typeof orderData.created_at === "string") {
                orderData.created_at = new Date(orderData.created_at);
            } else if (typeof orderData.createdAt === "string") {
                orderData.created_at = new Date(orderData.createdAt);
            }
        }
        return orderData as OrderDetails;
    } catch (error) {
        const errorMessage =
            error instanceof Error ? error.message : String(error);
        throw new Error(
            "API Error in orderService.fetchOrderById: " + errorMessage
        );
    }
}

export async function fetchAllOrdersByUserId(
    userId: string
): Promise<OrderSummary[]> {
    try {
        const response = await fetch(`${apiURL}/user/${userId}`);

        if (!response.ok) {
            throw new Error(
                `Failed to fetch orders for user ${userId}. Status: ${response.status}`
            );
        }

        const data = await response.json();
        if (Array.isArray(data)) {
            const mapped = data.map((o: any) => ({
                ...o,
                created_at:
                    typeof o.createdAt === "string"
                        ? new Date(o.createdAt)
                        : typeof o.created_at === "string"
                        ? new Date(o.created_at)
                        : o.createdAt ?? o.created_at,
            })) as OrderSummary[];

            return mapped;
        }
        return [];
    } catch (error) {
        const errorMessage =
            error instanceof Error ? error.message : String(error);
        throw new Error(
            "API Error in orderService.fetchAllOrdersByUserId: " + errorMessage
        );
    }
}
