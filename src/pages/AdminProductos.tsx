import ProductCreationForm from "../components/ProductCreationForm";
import { Link } from "react-router-dom";

function AdminProductos() {
    // Página de creación — la lista se movió a `AdminProductosList`

    return (
        <div className="dashboard-container">
            <h2>Productos</h2>
            <div className="box">
                <ProductCreationForm />
            </div>

            <div className="mt-3">
                <h3>Productos</h3>
                <p>Para ver o editar productos existentes, visita la lista:</p>
                <Link to="/admin/productos/existentes" className="button button-primary">Ver productos existentes</Link>
            </div>
        </div>
    );
}

export default AdminProductos;
