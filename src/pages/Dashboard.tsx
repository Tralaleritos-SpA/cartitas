import {/* importacion para el grafico */
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

const data = [
  { name: "Ventas", value: 400 },
  { name: "Usuarios", value: 300 },
  { name: "Productos", value: 200 },
  { name: "Pedidos", value: 100 },
];

function Dashboard() {
  return (
    <div className="dashboard-container  ">
      <h2>Dashboard</h2>

        <div className="boxes">
        <div className="box">Usuarios activos: <strong>128</strong></div>
        <div className="box">Ventas del mes: <strong>457</strong></div>
        <div className="box">Productos en stock: <strong>86</strong></div>
        <div className="box">Pedidos pendientes: <strong>12</strong></div>
      </div>

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

export default Dashboard;
