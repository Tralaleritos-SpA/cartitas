import React, { useEffect, useState, useCallback, useMemo } from "react";
import { fetchAllOrders } from "../services/orderService";
import { useAdminOrderDetails } from "../hooks/useAdminOrder";
import AdminOrderRow from "../components/AdminOrderRow";
import OrderDetailsView from "../components/OrderDetailsView";
import { type OrderSummary } from "../types/OrderTypes";
import { useModal } from "../hooks/useModal";

function AdminOrdersList() {
    const [orders, setOrders] = useState<OrderSummary[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string>("");
    const [openOrderId, setOpenOrderId] = useState<string | null>(null);

    // Hook para la gestión de detalles y caché (usa fetchOrderById)
    const { cache, load, loadingIds } = useAdminOrderDetails();
    const { openModal, Modal } = useModal();

    // Search and filters
    const [search, setSearch] = useState<string>("");
    const [statusFilter, setStatusFilter] = useState<string>("ALL");
    const [cityFilter, setCityFilter] = useState<string>("ALL");

    // 1. Lógica para cargar TODOS los pedidos (usa GET /api/v1/orders)
    const loadOrders = useCallback(async () => {
        setLoading(true);
        setError("");
        try {
            const fetchedOrders = await fetchAllOrders();
            setOrders(fetchedOrders);
        } catch (err) {
            setError(
                `Error al cargar los pedidos: ${
                    err instanceof Error ? err.message : "Desconocido"
                }`
            );
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
                openModal(
                    "Error",
                    "No se pudieron cargar los detalles del pedido."
                );
                setOpenOrderId(null);
            }
        }
    };

    // 3. Lógica para actualizar el estado en la lista local (sin recargar)
    const handleListUpdate = (updatedOrder: OrderSummary) => {
        setOrders((prevOrders) =>
            prevOrders.map((order) =>
                order.id === updatedOrder.id ? updatedOrder : order
            )
        );
    };

    // NOTE: render-time early returns were moved below so hooks (useMemo/useState)
    // are always called in the same order across renders. See React hooks rules.

    // derived lists for filter dropdowns
    const statusOptions = useMemo(() => {
        const s = Array.from(
            new Set(orders.map((o) => o.status).filter(Boolean))
        );
        return s;
    }, [orders]);

    const cityOptions = useMemo(() => {
        const c = Array.from(
            new Set(orders.map((o) => o.shippingCity).filter(Boolean))
        );
        return c;
    }, [orders]);

    const filteredOrders = useMemo(() => {
        let list = orders;

        if (search.trim()) {
            const q = search.toLowerCase();
            list = list.filter((o) => {
                const idMatch = o.id?.toLowerCase().includes(q);
                const totalMatch = String(o.total_price).includes(q);
                const cityMatch = String(o.shippingCity || "")
                    .toLowerCase()
                    .includes(q);
                const userAny = (o as any).user || {};
                const userName = (
                    userAny.name ||
                    userAny.last_name ||
                    userAny.fullName ||
                    ""
                )
                    .toString()
                    .toLowerCase();
                const userEmail = (userAny.email || (o as any).userEmail || "")
                    .toString()
                    .toLowerCase();
                const userMatch = userName.includes(q) || userEmail.includes(q);
                return idMatch || totalMatch || cityMatch || userMatch;
            });
        }

        if (statusFilter !== "ALL") {
            list = list.filter((o) => o.status === statusFilter);
        }

        if (cityFilter !== "ALL") {
            list = list.filter((o) => o.shippingCity === cityFilter);
        }

        return list;
    }, [orders, search, statusFilter, cityFilter]);

    // Render loading / error / empty states AFTER hooks so hook order stays stable
    if (loading)
        return (
            <div className="container mt-4 text-center">
                Cargando pedidos...
            </div>
        );

    if (error)
        return (
            <div className="container mt-4 alert alert-danger">
                Error: {error}
            </div>
        );

    if (orders.length === 0)
        return (
            <div className="container mt-4 alert alert-info">
                No hay pedidos registrados.
            </div>
        );

    return (
        <div className="container mt-4">
            <h2 className="mb-4">Gestión de Pedidos</h2>

            <div className="mb-3 d-flex gap-2 flex-wrap align-items-center">
                <input
                    className="form-control me-2"
                    style={{ maxWidth: 320 }}
                    placeholder="Buscar por ID, usuario, ciudad o total..."
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                />

                <select
                    className="form-select"
                    style={{ maxWidth: 180 }}
                    value={statusFilter}
                    onChange={(e) => setStatusFilter(e.target.value)}
                >
                    <option value="ALL">Todos los estados</option>
                    {statusOptions.map((s) => (
                        <option key={s} value={s}>
                            {s}
                        </option>
                    ))}
                </select>

                <select
                    className="form-select"
                    style={{ maxWidth: 180 }}
                    value={cityFilter}
                    onChange={(e) => setCityFilter(e.target.value)}
                >
                    <option value="ALL">Todas las ciudades</option>
                    {cityOptions.map((c) => (
                        <option key={c} value={c}>
                            {c}
                        </option>
                    ))}
                </select>

                <button
                    className="btn button-primary btn-sm"
                    onClick={() => {
                        setSearch("");
                        setStatusFilter("ALL");
                        setCityFilter("ALL");
                    }}
                >
                    Limpiar filtros
                </button>
            </div>

            <table className="table table-hover">
                <thead>
                    <tr>
                        <th>ID Pedido</th>
                        <th>Fecha</th>
                        <th>Total</th>
                        <th>Usuario</th>
                        <th>Ciudad Envío</th>
                        <th>Estado</th>
                        <th>Actualizar Estado</th>
                        <th>Detalles</th>
                    </tr>
                </thead>
                <tbody>
                    {filteredOrders.map((order) => (
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
                                    <td colSpan={8}>
                                        {/* Muestra cargando si no está en caché y está cargando */}
                                        {loadingIds[order.id] &&
                                        !cache[order.id] ? (
                                            <p className="text-center my-2">
                                                Cargando detalles...
                                            </p>
                                        ) : cache[order.id] ? (
                                            // Muestra la vista de detalles si está en caché
                                            <OrderDetailsView
                                                details={cache[order.id]!}
                                            />
                                        ) : null}
                                    </td>
                                </tr>
                            )}
                        </React.Fragment>
                    ))}
                </tbody>
            </table>
            <Modal />
        </div>
    );
}

export default AdminOrdersList;
