// src/services/orderService.ts

import type { CartItem } from "../hooks/cartService";


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
    created_at: string; 
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
        name: string; // Asumimos que la API devuelve al menos el nombre del producto
    };
}

// Tipo para los detalles completos del pedido (usado en fetchOrderById)
export interface OrderDetails extends OrderSummary {
    // Campos heredados de OrderSummary: id, total_price, created_at, status, shippingCity
    
    // Campos adicionales de envío y contacto que el backend devuelve
    fullName: string;
    phone: string;
    shippingAddress: string;
    shippingZip: string;
    shippingFee: number;
    
    // Items del pedido
    items: OrderItemDetails[];
}


const apiURL = "http://localhost:6969/api/v1/orders";

/**
 * Envía la solicitud de creación de pedido (POST).
 */
export async function createOrder(
    cartItems: CartItem[],
    userId: number, 
    shippingData: ShippingData
): Promise<any> {
    
    const itemsDTO: CartItemDTO[] = cartItems.map((item) => ({
        productId: item.id,
        quantity: item.quantity,
    }));

    const SHIPPING_COST = 5000;
    
    const requestBody: OrderRequestDTO = {
        userId: String(userId), // CONVERSIÓN a string para el Back-end
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

        return responseData; 

    } catch (error) {
        const e = error as Error; 
        const errorMessage = e.message || String(error); 
        throw new Error("API Error in createOrder: " + errorMessage);
    }
}

/**
 * Busca una orden específica por su ID (GET /{id}).
 * El tipo de retorno ahora es OrderDetails.
 */
export async function fetchOrderById(orderId: string): Promise<OrderDetails> {
    try {
        const response = await fetch(`${apiURL}/${orderId}`);
        
        if (!response.ok) {
            throw new Error(`Failed to fetch order ${orderId}. Status: ${response.status}`);
        }

        const orderData = await response.json();
        return orderData as OrderDetails; // Aseguramos el tipo
    } catch (error) {
        const e = error as Error; 
        const errorMessage = e.message || String(error); 
        throw new Error("API Error in fetchOrderById: " + errorMessage);
    }
}


/**
 * Obtiene todos los pedidos realizados por un usuario específico (GET /user/{userId}).
 * El tipo de retorno ahora es OrderSummary[].
 */
export async function fetchAllOrdersByUserId(userId: number): Promise<OrderSummary[]> {
    try {
        // CONVERSIÓN a string para la URL
        const response = await fetch(`${apiURL}/user/${String(userId)}`); 

        if (!response.ok) {
            throw new Error(`Failed to fetch orders for user ${userId}. Status: ${response.status}`);
        }

        const data = await response.json();
        // Asumimos que la respuesta es un array de resúmenes de pedidos
        return data as OrderSummary[];
    } catch (error) {
        const e = error as Error; 
        const errorMessage = e.message || String(error); 
        throw new Error("API Error in fetchAllOrdersByUserId: " + errorMessage);
    }
}