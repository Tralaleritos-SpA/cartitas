import { useEffect, useState } from "react";
/* importacion para el grafico */
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

import { fetchActiveUsers } from "../services/userService";
import { fetchAllOrders } from "../services/orderService";
import { clpFormatter } from "../hooks/currencyFormat";

const data = [
  { name: "Ventas", value: 400 },
  { name: "Usuarios", value: 300 },
  { name: "Pedidos", value: 100 },
];

function AdminDashboard() {
  const [usersCount, setUsersCount] = useState<number | null>(null);
  const [salesThisMonth, setSalesThisMonth] = useState<number | null>(null);
  const [pendingOrders, setPendingOrders] = useState<number | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let mounted = true;

    async function loadStats() {
      setLoading(true);
      setError(null);

      try {
        const users = await fetchActiveUsers();
        if (!mounted) return;
        setUsersCount(Array.isArray(users) ? users.length : 0);

        const orders = await fetchAllOrders();
        if (!mounted) return;

        const now = new Date();
        const monthStart = new Date(now.getFullYear(), now.getMonth(), 1);
        const monthEnd = new Date(now.getFullYear(), now.getMonth() + 1, 1);

        let sales = 0;
        let pending = 0;

        if (Array.isArray(orders)) {
          orders.forEach((o: any) => {
            const dateStr = o.created_at ?? o.createdAt ?? null;
            const d = dateStr ? new Date(dateStr) : null;

            if (d && d >= monthStart && d < monthEnd) {
              sales += Number(o.total_price) || 0;
            }

            const status = (o.status ?? "").toString().toUpperCase();
            if (status.includes("PEND")) pending += 1;
          });
        }

        setSalesThisMonth(sales);
        setPendingOrders(pending);
      } catch (err) {
        const message = err instanceof Error ? err.message : String(err);
        setError(message);
      } finally {
        if (mounted) setLoading(false);
      }
    }

    void loadStats();

    return () => {
      mounted = false;
    };
  }, []);

  return (
    <div className="dashboard-container">
      <h2>Dashboard</h2>

      <div className="boxes">
        <div className="box">
          Usuarios activos: <strong>{loading ? "..." : usersCount ?? 0}</strong>
        </div>
        <div className="box">
          Ventas del mes: <strong>{loading ? "..." : salesThisMonth !== null ? clpFormatter.format(salesThisMonth) : "—"}</strong>
        </div>
        <div className="box">
          Pedidos pendientes: <strong>{loading ? "..." : pendingOrders ?? 0}</strong>
        </div>
      </div>

      {error && <div className="error">Error cargando estadísticas: {error}</div>}

      <div className="box chart-box">
        <h5 className="chart-title">Comparación General</h5>
        <ResponsiveContainer width="100%" height={300}>
          <BarChart
            data={data}
            margin={{ top: 20, right: 20, left: 10, bottom: 10 }}
          >
            <CartesianGrid strokeDasharray="3 3" className="chart-grid" />
            <XAxis dataKey="name" className="chart-axis" />
            <YAxis className="chart-axis" />
            <Tooltip wrapperClassName="chart-tooltip" />
            <Bar dataKey="value" className="chart-bar" radius={[6, 6, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}

export default AdminDashboard;
