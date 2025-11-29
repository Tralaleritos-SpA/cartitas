// src/services/orderService.ts

// Asegúrate de que OrderTypes.ts contenga Order, OrderItem, OrderSummary
import type { Order, OrderSummary } from "../types/OrderTypes"; 
import type { CartItem } from "../hooks/cartService";

// --- DTOs Locales (Input para el Backend) ---
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
    userId: number, 
    shippingData: ShippingData
): Promise<Order> { // Usa el tipo Order completo
    
    const itemsDTO: CartItemDTO[] = cartItems.map((item) => ({
        productId: item.id,
        quantity: item.quantity,
    }));

    const SHIPPING_COST = 5000;
    
    const requestBody: OrderRequestDTO = {
        userId: String(userId),
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
        
        const responseData = await response.json();

        if (!response.ok) {
            const errorMsg = typeof responseData === 'string' ? responseData : "Error desconocido al crear el pedido.";
            throw new Error(`API Error Status ${response.status}: ${errorMsg}`);
        }

        return responseData as Order; 

    } catch (error) {
        const e = error as Error; 
        const errorMessage = e.message || String(error); 
        throw new Error("API Error in createOrder: " + errorMessage);
    }
}

/**
 * Busca una orden específica por su ID (GET /{id}).
 * Retorna el pedido completo (Order).
 */
export async function fetchOrderById(orderId: string): Promise<Order> { // Usa el tipo Order completo
    try {
        const response = await fetch(`${apiURL}/${orderId}`);
        
        if (!response.ok) {
            throw new Error(`Failed to fetch order ${orderId}. Status: ${response.status}`);
        }

        const orderData = await response.json();
        return orderData as Order;
    } catch (error) {
        const e = error as Error; 
        const errorMessage = e.message || String(error); 
        throw new Error("API Error in fetchOrderById: " + errorMessage);
    }
}


/**
 * Obtiene todos los pedidos realizados por un usuario específico (GET /user/{userId}).
 * Retorna OrderSummary[].
 */
export async function fetchAllOrdersByUserId(userId: number): Promise<OrderSummary[]> {
    try {
        const response = await fetch(`${apiURL}/user/${String(userId)}`); 

        if (!response.ok) {
            throw new Error(`Failed to fetch orders for user ${userId}. Status: ${response.status}`);
        }

        const data = await response.json();
        return data as OrderSummary[];
    } catch (error) {
        const e = error as Error; 
        const errorMessage = e.message || String(error); 
        throw new Error("API Error in fetchAllOrdersByUserId: " + errorMessage);
    }
}

/**
 * Actualiza el estado del pedido (PUT /{id}/status). (Para el Admin)
 * Retorna el pedido actualizado (Order).
 */
export async function updateOrderStatus(orderId: string, newStatus: string): Promise<Order> { // Usa el tipo Order completo
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
            const errorMsg = typeof responseData === 'string' ? responseData : "Error desconocido al actualizar el estado del pedido.";
            throw new Error(`Failed to update order status. Status: ${response.status}: ${errorMsg}`);
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
            throw new Error(`Failed to fetch all orders. Status: ${response.status}`);
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