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

// placeholder inicial — se reemplaza por datos reales mensuales
const initialChartData: { name: string; value: number }[] = [];

function AdminDashboard() {
  const [usersCount, setUsersCount] = useState<number | null>(null);
  const [salesThisMonth, setSalesThisMonth] = useState<number | null>(null);
  const [pendingOrders, setPendingOrders] = useState<number | null>(null);
  const [monthlyData, setMonthlyData] = useState<{ name: string; value: number }[]>(initialChartData);
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
          // calcular ventas del mes actual y pedidos pendientes
          orders.forEach((o: any) => {
            const dateStr = o.created_at ?? o.createdAt ?? null;
            const d = dateStr ? new Date(dateStr) : null;

            if (d && d >= monthStart && d < monthEnd) {
              sales += Number(o.total_price) || 0;
            }

            const status = (o.status ?? "").toString().toUpperCase();
            if (status.includes("PEND")) pending += 1;
          });

          // --- construir datos mensuales para los últimos 12 meses ---
          const now = new Date();
          const months: Date[] = [];
          for (let i = 11; i >= 0; i--) {
            months.push(new Date(now.getFullYear(), now.getMonth() - i, 1));
          }

          const monthKeys = months.map((m) => `${m.getFullYear()}-${String(m.getMonth() + 1).padStart(2, "0")}`);
          const totalsMap: Record<string, number> = {};
          monthKeys.forEach((k) => (totalsMap[k] = 0));

          orders.forEach((o: any) => {
            const dateStr = o.created_at ?? o.createdAt ?? null;
            const d = dateStr ? new Date(dateStr) : null;
            if (!d) return;
            const key = `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}`;
            if (key in totalsMap) {
              totalsMap[key] += Number(o.total_price) || 0;
            }
          });

          const chartData = months.map((m) => {
            const key = `${m.getFullYear()}-${String(m.getMonth() + 1).padStart(2, "0")}`;
            const label = m.toLocaleString("es-CL", { month: "short", year: "numeric" });
            return { name: label, value: totalsMap[key] || 0 };
          });

          setMonthlyData(chartData);
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
        <h5 className="chart-title">Ventas (últimos 12 meses)</h5>
        <ResponsiveContainer width="100%" height={300}>
          <BarChart
            data={monthlyData}
            margin={{ top: 20, right: 20, left: 10, bottom: 10 }}
          >
            <CartesianGrid strokeDasharray="3 3" className="chart-grid" />
            <XAxis dataKey="name" className="chart-axis" />
            <YAxis className="chart-axis" tickFormatter={(v) => clpFormatter.format(Number(v))} />
            <Tooltip formatter={(value: any) => clpFormatter.format(Number(value))} wrapperClassName="chart-tooltip" />
            <Bar dataKey="value" className="chart-bar" radius={[6, 6, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}

export default AdminDashboard;
