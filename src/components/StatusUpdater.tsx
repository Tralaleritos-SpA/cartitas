import React, { useState, useEffect } from 'react';
import { updateOrderStatus } from '../services/orderService';
import type { OrderSummary, Order } from '../types/OrderTypes';

interface StatusUpdaterProps {
    orderId: string;
    currentStatus: string;
    // Función para notificar al padre (AdminOrdersList) que la lista debe actualizarse
    onStatusUpdate: (updatedOrder: OrderSummary) => void;
}

const orderStatuses = ['PENDIENTE','ENVIADO', 'CANCELADO'];

export const StatusUpdater: React.FC<StatusUpdaterProps> = ({ orderId, currentStatus, onStatusUpdate }) => {
    const [newStatus, setNewStatus] = useState(currentStatus);
    const [isUpdating, setIsUpdating] = useState(false);
    const [message, setMessage] = useState('');

    const handleUpdate = async (e: React.FormEvent) => {
        e.preventDefault();
        if (newStatus === currentStatus) return;

        setIsUpdating(true);
        setMessage('');

        try {
            // Llama a la función del servicio para actualizar el estado
            const updatedOrder: Order = await updateOrderStatus(orderId, newStatus);
            
            // Crea un OrderSummary consistente para actualizar la lista principal
            const createdAtValue = (updatedOrder as any).createdAt;
            const createdAtStr = typeof createdAtValue === 'string'
                ? createdAtValue
                : createdAtValue instanceof Date
                    ? createdAtValue.toISOString()
                    : String(createdAtValue);

            const summary: OrderSummary = {
                id: updatedOrder.id,
                total_price: updatedOrder.total_price,
                created_at: createdAtStr,
                status: updatedOrder.status,
                shippingCity: updatedOrder.shippingCity,
            };
            
            onStatusUpdate(summary); // Notifica al componente padre
            setMessage(`✅ Actualizado a ${updatedOrder.status}.`);
        } catch (error) {
            setMessage(`❌ Error al actualizar: ${error instanceof Error ? error.message : 'Desconocido'}`);
        } finally {
            setIsUpdating(false);
            setTimeout(() => setMessage(''), 3000); // Limpia el mensaje
        }
    };
    
    // Mantiene el select sincronizado si el estado se actualiza externamente
    useEffect(() => {
        setNewStatus(currentStatus);
    }, [currentStatus]);

    return (
        <form onSubmit={handleUpdate} style={{ display: 'inline-flex', alignItems: 'center', marginLeft: '20px' }}>
            <select
                value={newStatus}
                onChange={(e) => setNewStatus(e.target.value)}
                disabled={isUpdating}
                style={{ padding: '5px', marginRight: '10px' }}
            >
                {orderStatuses.map((status) => (
                    <option key={status} value={status}>
                        {status}
                    </option>
                ))}
            </select>
            <button
                type="submit"
                disabled={isUpdating || newStatus === currentStatus}
                style={{ padding: '5px 10px', cursor: 'pointer' }}
            >
                {isUpdating ? '...' : 'Actualizar'}
            </button>
            {message && <span style={{ marginLeft: '10px', fontSize: '0.9em' }}>{message}</span>}
        </form>
    );
};