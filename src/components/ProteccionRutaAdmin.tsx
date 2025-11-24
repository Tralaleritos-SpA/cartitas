import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "../hooks/userAutenticacion";

function AdminRoute() {
  const { user } = useAuth();

  // si el usuario no esta logueado lo manda al home
  if (!user) {
    return <Navigate to="/" replace />;
  }

  // si esta logueado pero no es admin lo manda al home
  if (user.role !== "admin") {
    return <Navigate to="/" replace />;
  }

  // si es admin puede ver lo que esta dentro de esta ruta
  return <Outlet />;
}

export default AdminRoute;
