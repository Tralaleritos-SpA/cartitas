import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";
import "../src/assets/css/color-palette.css";
import { Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import Products from "./pages/Products";
import Login from "./pages/Login";
import Register from "./pages/Register";
import ProductPage from "./pages/ProductPage";
import Layout from "./layout/Layout";
import NotFound from "./pages/404";
import Eventos from "./pages/Eventos";
import AdminPanel from "./layout/AdminLayout";
import AdminDashboard from "./pages/AdminDashboard";
import AdminProductos from "./pages/AdminProductos";
import AdminMarcas from "./pages/AdminMarcas";
import AdminCategorias from "./pages/AdminCategorias";
import AdminProductosList from "./pages/AdminProductosList";
import AdminMarcasList from "./pages/AdminMarcasList";
import AdminCategoriasList from "./pages/AdminCategoriasList";
import AdminRolesList from "./pages/AdminRolesList";
import AdminUsuariosList from "./pages/AdminUsuariosList";
import AdminRoute from "./components/ProteccionRutaAdmin";

import Carrito from "./pages/Carrito";
import APITest from "./pages/ApiTest";
import AdminUsuarios from "./pages/AdminUsuarios";
import AdminRoles from "./pages/AdminRoles";
import DireccionEnvio from "./pages/DireccionEnvio";
import MisPedidos from "./pages/MisPedidos";
import AdminPedidos from "./pages/AdminPedidos";
function App() {
    return (
        <>
            <Layout>
                <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="/Productos" element={<Products />} />
                    <Route path="/Productos/:category" element={<Products />} />
                    <Route path="/Producto/:id" element={<ProductPage />} />
                    <Route path="/Eventos" element={<Eventos />} />
                    <Route path="/Carrito" element={<Carrito />} />
                    <Route path="/login" element={<Login />} />
                    <Route path="/register" element={<Register />} />
                    <Route path="/direccion" element={<DireccionEnvio />} />
                    <Route path="/Mispedidos" element={<MisPedidos />} />

                    <Route path="/APItest" element={<APITest />} />

                    {/* panel de administrador */}
                    <Route element={<AdminRoute />}>
                        <Route path="/admin" element={<AdminPanel />}>
                            <Route index element={<AdminDashboard />} />
                            <Route
                                path="/admin/productos"
                                element={<AdminProductos />}
                            />
                            <Route
                                path="/admin/productos/existentes"
                                element={<AdminProductosList />}
                            />
                            <Route
                                path="/admin/usuarios"
                                element={<AdminUsuarios />}
                            />
                            <Route
                                path="/admin/usuarios/existentes"
                                element={<AdminUsuariosList />}
                            />
                            <Route
                                path="/admin/roles"
                                element={<AdminRoles />}
                            />
                            <Route
                                path="/admin/roles/existentes"
                                element={<AdminRolesList />}
                            />
                            <Route
                                path="/admin/marcas"
                                element={<AdminMarcas />}
                            />
                            <Route
                                path="/admin/marcas/existentes"
                                element={<AdminMarcasList />}
                            />
                            <Route
                                path="/admin/categorias"
                                element={<AdminCategorias />}
                            />
                            <Route
                                path="/admin/categorias/existentes"
                                element={<AdminCategoriasList />}
                            />
                            <Route
                                path="/admin/pedidos"
                                element={<AdminPedidos />}
                            />
                        </Route>
                    </Route>

                    {/*si no encuentra la pag manda 404*/}
                    <Route path="*" element={<NotFound />} />
                </Routes>
            </Layout>
        </>
    );
}

export default App;
