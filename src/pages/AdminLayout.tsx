import { Link, Outlet } from "react-router-dom";

function AdminLayout() {
  return (
    <div className="admin-layout">
      {/* Sidebar */}
      <aside className="sidebar">
        <h3 className="sidebar-title">Panel Admin</h3>
        <ul className="nav-items" style={{ flexDirection: "column" }}>
          <li><Link className="sidebar-link" to="/admin/dashboard">Dashboard</Link></li>
          <li><Link className="sidebar-link" to="/admin/usuarios">Usuarios</Link></li>
          <li><Link className="sidebar-link" to="/admin/productos">Productos</Link></li>
          <li><Link to="/" className="sidebar-link">
            Cerrar sesión
            </Link>
          </li>
        </ul>
      </aside>


      <div className="admin-content">

        <Outlet />
      </div>
    </div>
  );
}

export default AdminLayout;
