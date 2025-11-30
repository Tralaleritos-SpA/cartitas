import React from 'react';
import type { OrderSummary } from '../types/OrderTypes';
import { StatusUpdater } from './StatusUpdater'; // Asumiremos que StatusUpdater se mueve a un archivo separado.

interface AdminOrderRowProps {
    order: OrderSummary;
    isOpen: boolean;
    onToggle: (orderId: string) => void;
    onStatusUpdate: (updatedOrder: OrderSummary) => void; // Propagador de actualización
}

const AdminOrderRow: React.FC<AdminOrderRowProps> = ({ order, isOpen, onToggle, onStatusUpdate }) => {
    
    // Mapeo del estado a una clase de color simple para visualización
    const getStatusClass = (status: string): string => {
        switch (status) {
            case 'ENVIADO': return 'text-success';
            case 'PENDIENTE': return 'text-warning';
            case 'CANCELADO': return 'text-danger';
            default: return '';
        }
    };

    const formattedDate = new Date(order.created_at).toLocaleDateString('es-CL');
    const formattedTotal = `$${order.total_price.toLocaleString('es-CL')}`;

    return (
        <tr onClick={() => onToggle(order.id)} style={{ cursor: 'pointer' }}>
            {/* Columna 1: ID Pedido (Corto) */}
            <td>{order.id.substring(0, 8)}...</td>
            
            {/* Columna 2: Fecha */}
            <td>{formattedDate}</td>
            
            {/* Columna 3: Total */}
            <td>{formattedTotal}</td>
            
            {/* Columna 4: Ciudad */}
            <td>{order.shippingCity}</td>
            
            {/* Columna 5: Estado */}
            <td className={getStatusClass(order.status)}>
                <strong>{order.status}</strong>
            </td>
            
            {/* Columna 6: Acciones (Control de Estado) */}
            <td>
                <StatusUpdater 
                    orderId={order.id} 
                    currentStatus={order.status}
                    onStatusUpdate={onStatusUpdate} // Pasa el handler al componente hijo
                />
            </td>
            
            {/* Columna 7: Toggle (Despliegue) */}
            <td>
                <button 
                    className="btn btn-sm btn-outline-secondary" 
                    onClick={(e) => { e.stopPropagation(); onToggle(order.id); }} // Previene que la fila también haga toggle
                >
                    {isOpen ? '▲' : '▼'}
                </button>
            </td>
        </tr>
    );
};



export default AdminOrderRow;