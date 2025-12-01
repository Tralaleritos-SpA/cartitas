import React from 'react';
import type { OrderSummary } from '../types/OrderTypes';
import { StatusUpdater } from './StatusUpdater'; // Asumiremos que StatusUpdater se mueve a un archivo separado.
import { clpFormatter } from "../hooks/currencyFormat";

interface AdminOrderRowProps {
    order: OrderSummary;
    isOpen: boolean;
    onToggle: (orderId: string) => void;
    onStatusUpdate: (updatedOrder: OrderSummary) => void; // Propagador de actualización
}

const AdminOrderRow: React.FC<AdminOrderRowProps> = ({ order, isOpen, onToggle, onStatusUpdate }) => {
    
    const formatOrderDate = (input?: unknown): Date | null => {
        if (input == null) return null;

        if (input instanceof Date) return isNaN(input.getTime()) ? null : input;
        if (typeof input === "number") {
            const d = new Date(input);
            return isNaN(d.getTime()) ? null : d;
        }

        const s = String(input);
        if (!s) return null;

        const tryParse = (str: string): Date | null => {
            const t = Date.parse(str);
            return isNaN(t) ? null : new Date(t);
        };

        // Common fallbacks: as-is, assume UTC (append Z), replace space with T
        const candidates = [
            s,
            s + "Z",
            s.replace(" ", "T"),
            s.replace(" ", "T") + "Z",
        ];

        for (const c of candidates) {
            const d = tryParse(c);
            if (d) return d;
        }

        const fallback = new Date(s);
        return isNaN(fallback.getTime()) ? null : fallback;
    };

    const formatDateDDMMYYYY = (date: Date) => {
        const dd = String(date.getDate()).padStart(2, "0");
        const mm = String(date.getMonth() + 1).padStart(2, "0");
        const yyyy = date.getFullYear();
        return `${dd}/${mm}/${yyyy}`;
    };

    const formattedDate = (() => {
        const d = formatOrderDate(order.created_at);
        if (d) return formatDateDDMMYYYY(d);
        // final fallback: show something helpful instead of empty
        return order.created_at ? String(order.created_at) : "-";
    })();

    const formattedTotal = clpFormatter.format(order.total_price);

    return (
        <tr onClick={() => onToggle(order.id)} style={{ cursor: 'pointer' }}>
            {/* Columna 1: ID Pedido (Corto) */}
            <td>{order.id.substring(0, 8)}</td>
            <td>
                {formattedDate}
            </td>
            <td>{formattedTotal}</td>
            <td>{order.shippingCity}</td>
            <td>
                <span
                    className={`badge ${
                        order.status === "PENDING" ? "bg-warning" : "bg-success"
                    }`}
                >
                    {order.status}
                </span>
            </td>
            <td>
                <StatusUpdater
                    orderId={order.id}
                    currentStatus={order.status}
                    onStatusUpdate={onStatusUpdate}
                />
            </td>
            <td>
                <button
                    className="button-primary button m-0 btn-sm btn-info"
                    onClick={(e) => { e.stopPropagation(); onToggle(order.id); }}
                >
                    {isOpen ? "Ocultar Detalles" : "Ver Detalles"}
                </button>
            </td>
        </tr>
    );
};



export default AdminOrderRow;