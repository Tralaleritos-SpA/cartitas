import CategoryCreationForm from "../components/CategoryCreationForm";
import { Link } from "react-router-dom";

function AdminCategorias() {
    // lista movida a `AdminCategoriasList`

    return (
        <div className="dashboard-container">
            <h2>Categorías</h2>
            <div className="box">
                <CategoryCreationForm />
            </div>

            <div className="mt-3">
                <h3>Categorías</h3>
                <p>Para ver o editar categorías existentes, visita la lista:</p>
                <Link to="/admin/categorias/existentes" className="button button-primary">Ver categorías existentes</Link>
            </div>
        </div>
    );
}

export default AdminCategorias;
