import { Link, Outlet } from "react-router-dom";

function AdminLayout() {
  return (
    <div className="admin-layout">

      <aside className="sidebar">
        <h3 className="sidebar-title">Panel Admin</h3>
        <ul className="nav-items" style={{ flexDirection: "column" }}>
          <li><Link className="sidebar-link" to="/admin">Dashboard</Link></li>
          <li><Link className="sidebar-link" to="/admin/usuarios">Usuarios</Link></li>
          <li><Link className="sidebar-link" to="/admin/productos">Productos</Link></li>
          <li><Link className="sidebar-link" to="/admin/productos">Marcas</Link></li>
          <li><Link className="sidebar-link" to="/admin/productos">Categorías</Link></li>
          <li><Link to="/" className="sidebar-link">
            Cerrar sesión
            </Link>
          </li>
        </ul>
      </aside>
      <div className="admin-content">
        <Outlet />{/* aqui se renderizan las páginas hijas */}
      </div>
    </div>
  );
}

export default AdminLayout;
