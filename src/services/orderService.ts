// src/services/orderService.ts

// Asegúrate de que OrderTypes.ts contenga Order, OrderItem, OrderSummary
import type { Order, OrderSummary } from "../types/OrderTypes";
import type { CartItem } from "../hooks/cartService";

// --- DTOs Locales (Input para el Backend) ---
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

// **NOTA IMPORTANTE:**
// Las interfaces OrderSummary y OrderItemDetails que definiste en el borrador
// deben estar ubicadas en tu archivo de tipos (ej: ../types/OrderTypes.ts)
// si quieres que este archivo se mantenga limpio.
// Las mantendré aquí solo por referencia si no las has movido todavía:
/*
export interface OrderSummary { ... } 
export interface OrderItemDetails { ... } 
*/

const apiURL = "http://localhost:6969/api/v1/orders";

// ----------------------------------------------------------------------
// --- FUNCIONES DE ACCESO A LA API ---
// ----------------------------------------------------------------------

/**
 * Envía la solicitud de creación de pedido (POST).
 */
export async function createOrder(
    cartItems: CartItem[],
    userId: string,
    shippingData: ShippingData
): Promise<Order> {
    // Usa el tipo Order completo

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

            return data as Order;
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

/**
 * Busca una orden específica por su ID (GET /{id}).
 * Retorna el pedido completo (Order).
 */
export async function fetchOrderById(orderId: string): Promise<Order> {
    // Usa el tipo Order completo
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
        return orderData as Order;
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

/**
 * Actualiza el estado del pedido (PUT /{id}/status). (Para el Admin)
 * Retorna el pedido actualizado (Order).
 */
export async function updateOrderStatus(
    orderId: string,
    newStatus: string
): Promise<Order> {
    // Usa el tipo Order completo
    try {
        const response = await fetch(`${apiURL}/${orderId}/status`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ status: newStatus }),
        });

        if (!response.ok) {
            const responseData = await response.json();
            const errorMsg =
                typeof responseData === "string"
                    ? responseData
                    : "Error desconocido al actualizar el estado del pedido.";
            throw new Error(
                `Failed to update order status. Status: ${response.status}: ${errorMsg}`
            );
        }

        const updatedOrder: Order = await response.json();
        return updatedOrder;
    } catch (error) {
        const e = error as Error;
        const errorMessage = e.message || String(error);
        throw new Error("API Error in updateOrderStatus: " + errorMessage);
    }
}

// En src/services/orderService.ts

export async function fetchAllOrders(): Promise<OrderSummary[]> {
    try {
        const response = await fetch(apiURL); // apiURL es "http://localhost:6969/api/v1/orders"

        if (!response.ok) {
            // Manejo de errores HTTP (404, 500, etc.)
            throw new Error(
                `Failed to fetch all orders. Status: ${response.status}`
            );
        }

        const data = await response.json();

        // Asumimos que la respuesta es un array de pedidos que se mapea a OrderSummary[]
        return data as OrderSummary[];
    } catch (error) {
        // Manejo de errores de red o errores lanzados en el bloque try
        const e = error as Error;
        const errorMessage = e.message || String(error);
        throw new Error("API Error in fetchAllOrders: " + errorMessage);
    }
}
