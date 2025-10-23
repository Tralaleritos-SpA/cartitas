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
import AdminPanel from "./pages/AdminPanel";
import Dashboard from "./pages/Dashboard";
function App() {
    return (
        <>
            <Layout>
                <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="/Productos" element={<Products />} />
                    <Route path="/Productos/:category" element={<Products />} />
                    <Route
                        path="/Productos/:category/:id"
                        element={<ProductPage />}
                    />
                    <Route path="/Eventos" element={<Eventos />} />
                    <Route path="/login" element={<Login />} />
                    <Route path="/register" element={<Register />} />

                    {/*si no encuentra la pag manda 404*/}
                    <Route path="*" element={<NotFound />} />
                    {/* panel de administrador */}
                    <Route path="/admin" element={<AdminPanel />}>
                        <Route index element={<Dashboard />} />
                        <Route path="dashboard" element={<Dashboard />} />
                    </Route>


                </Routes>
            </Layout>
        </>
    );
}

export default App;
