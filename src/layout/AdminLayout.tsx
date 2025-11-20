import { NavLink, Outlet } from "react-router-dom";
import { useAuth } from "../hooks/userAutenticacion";

function AdminLayout() {
  const { logout } = useAuth();
  return (
    <div className="admin-layout">

      <aside className="sidebar">
        <h3 className="sidebar-title">Panel Admin</h3>
        <ul className="nav-items" style={{ flexDirection: "column" }}>
          <li><NavLink to="/admin" end>Dashboard</NavLink></li>
          <li><NavLink  to="/admin/usuarios">Usuarios</NavLink></li>
          <li><NavLink className="sidebar-link" to="/admin/productos">Productos</NavLink></li>
          <li><NavLink className="sidebar-link" to="/admin/marcas">Marcas</NavLink></li>
          <li><NavLink className="sidebar-link" to="/admin/categorias">Categorías</NavLink></li>
          <li><NavLink to="/" className="sidebar-link" onClick={logout}>
            Cerrar sesión
            </NavLink>
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
