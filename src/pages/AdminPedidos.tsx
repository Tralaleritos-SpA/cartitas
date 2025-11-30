import React, { useEffect, useState, useCallback } from "react";
import { fetchAllOrders } from "../services/orderService";
import { useAdminOrderDetails } from "../hooks/useAdminOrder"; 
import AdminOrderRow from "../components/AdminOrderRow"; 
import OrderDetailsView from "../components/OrderDetailsView"; 
import { type OrderSummary } from "../types/OrderTypes";


function AdminOrdersList() {
    const [orders, setOrders] = useState<OrderSummary[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string>('');
    const [openOrderId, setOpenOrderId] = useState<string | null>(null);

    // Hook para la gestión de detalles y caché (usa fetchOrderById)
    const { cache, load, loadingIds } = useAdminOrderDetails();

    // 1. Lógica para cargar TODOS los pedidos (usa GET /api/v1/orders)
    const loadOrders = useCallback(async () => {
        setLoading(true);
        setError('');
        try {
            const fetchedOrders = await fetchAllOrders(); 
            setOrders(fetchedOrders);
        } catch (err) {
            setError(`Error al cargar los pedidos: ${err instanceof Error ? err.message : 'Desconocido'}`);
        } finally {
            setLoading(false);
        }
    }, []);

    useEffect(() => {
        loadOrders();
    }, [loadOrders]);


    // 2. Lógica de Toggle y Carga de Detalles (similar a MisPedidos.tsx)
    const handleToggle = async (orderId: string) => {
        // Cierra la fila si ya está abierta
        if (openOrderId === orderId) {
            setOpenOrderId(null);
            return;
        }

        setOpenOrderId(orderId);

        // Carga detalles solo si NO están en caché
        if (!cache[orderId]) {
            try {
                await load(orderId);
            } catch {
                alert("No se pudieron cargar los detalles del pedido.");
                setOpenOrderId(null);
            }
        }
    };
    
    // 3. Lógica para actualizar el estado en la lista local (sin recargar)
    const handleListUpdate = (updatedOrder: OrderSummary) => {
        setOrders(prevOrders => 
            prevOrders.map(order => 
                order.id === updatedOrder.id ? updatedOrder : order
            )
        );
    };


    if (loading) return <div className="container mt-4 text-center">Cargando pedidos...</div>;
    if (error) return <div className="container mt-4 alert alert-danger">Error: {error}</div>;
    if (orders.length === 0) return <div className="container mt-4 alert alert-info">No hay pedidos registrados.</div>;

    return (
        <div className="container mt-4">
            <h2 className="mb-4">Gestión de Pedidos</h2>
            
            <table className="table table-hover">
                <thead>
                    <tr>
                        <th>ID Pedido</th>
                        <th>Fecha</th>
                        <th>Total</th>
                        <th>Ciudad Envío</th>
                        <th>Estado</th>
                        <th>Actualizar Estado</th>
                        <th>Detalles</th> 
                    </tr>
                </thead>
                <tbody>
                    {orders.map(order => (
                        <React.Fragment key={order.id}>
                            {/* Fila principal del pedido */}
                            <AdminOrderRow 
                                order={order} 
                                isOpen={openOrderId === order.id} 
                                onToggle={handleToggle} 
                                onStatusUpdate={handleListUpdate}
                            />
                            
                            {/* Fila desplegable con los detalles */}
                            {openOrderId === order.id && (
                                <tr className="table-light">
                                    {/* Debe cubrir todas las columnas (7) */}
                                    <td colSpan={7}>
                                        {/* Muestra cargando si no está en caché y está cargando */}
                                        {loadingIds[order.id] && !cache[order.id] ? (
                                            <p className="text-center my-2">Cargando detalles...</p>
                                        ) : cache[order.id] ? (
                                            // Muestra la vista de detalles si está en caché
                                            <OrderDetailsView details={cache[order.id]!} />
                                        ) : null}
                                    </td>
                                </tr>
                            )}
                        </React.Fragment>
                    ))}
                </tbody>
            </table>
        </div>
    );
}

export default AdminOrdersList;