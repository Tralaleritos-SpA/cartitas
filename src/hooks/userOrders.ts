import { useEffect, useState } from "react";
import {
    fetchAllOrdersByUserId,
    type OrderSummary,
} from "../services/orderService";

export function useOrders(userId: string | null) {
    const [orders, setOrders] = useState<OrderSummary[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        if (userId == null) return;
        let mounted = true;
        setLoading(true);
        setError(null);

        // userId is already a string (or null)
        fetchAllOrdersByUserId(userId)
            .then((res) => {
                if (!mounted) return;
                setOrders(res);
            })
            .catch((err) => {
                if (!mounted) return;
                setError(err?.message || "Error cargando pedidos");
            })
            .finally(() => {
                if (!mounted) return;
                setLoading(false);
            });

        return () => {
            mounted = false;
        };
    }, [userId]);

    return { orders, loading, error, setOrders };
}
