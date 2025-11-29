import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { type StoredUser } from "../types/UserTypes";
import { useOrders } from "../hooks/userOrders";
import { useOrderDetails } from "../hooks/userOrderDetails";
import OrderRow from "../components/OrderRow";
import OrderDetailsView from "../components/OrderDetailsView";

function MisPedidos() {
  const navigate = useNavigate();
  const [userId, setUserId] = useState<number | null>(null);
  const { orders, loading, error } = useOrders(userId);
  const { cache, load, loadingIds } = useOrderDetails();
  const [openOrderId, setOpenOrderId] = useState<string | null>(null);

  useEffect(() => {
    const userStorage = localStorage.getItem("user");
    if (!userStorage) {
      alert("Debes iniciar sesión para ver tus pedidos.");
      navigate("/login");
      return;
    }
    try {
      const storedUser: StoredUser = JSON.parse(userStorage);
      setUserId(storedUser.id);
    } catch {
      navigate("/login");
    }
  }, [navigate]);

  const handleToggle = async (orderId: string) => {
    if (openOrderId === orderId) {
      setOpenOrderId(null);
      return;
    }

    setOpenOrderId(orderId);

    // carga detalles solo si no están cacheados
    if (!cache[orderId]) {
      try {
        await load(orderId);
      } catch {
        alert("No se pudieron cargar los detalles del pedido.");
        setOpenOrderId(null);
      }
    }
  };

  if (loading) return <div className="container mt-4 text-center">Cargando pedidos...</div>;
  if (error) return <div className="container mt-4 alert alert-danger">Error: {error}</div>;
  if (orders.length === 0) return <div className="container mt-4 alert alert-info">Aún no tienes pedidos.</div>;

  return (
    <div className="container mt-4">
      <h2 className="mb-4">Mis Pedidos</h2>
      <table className="table table-hover">
        <thead>
          <tr>
            <th>ID Pedido</th>
            <th>Fecha</th>
            <th>Total</th>
            <th>Ciudad de Envío</th>
            <th>Estado</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {orders.map(order => (
            <React.Fragment key={order.id}>
              <OrderRow order={order} isOpen={openOrderId === order.id} onToggle={handleToggle} />
              
              {openOrderId === order.id && (
                <tr className="table-light">
                  <td colSpan={6}>
                    {loadingIds[order.id] && !cache[order.id] ? (
                      <p className="text-center my-2">Cargando detalles...</p>
                    ) : cache[order.id] ? (
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

export default MisPedidos;
