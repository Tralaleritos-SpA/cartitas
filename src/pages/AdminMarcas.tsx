import BrandCreationForm from "../components/BrandCreationForm";
import { Link } from "react-router-dom";

function AdminMarcas() {
    // lista movida a `AdminMarcasList`
    return (
        <div className="dashboard-container">
            <h2>Marcas</h2>
            <div className="box">
                <BrandCreationForm />
            </div>

            <div className="mt-3">
                <h3>Marcas</h3>
                <p>Para ver o editar marcas existentes, visita la lista:</p>
                <Link to="/admin/marcas/existentes" className="button button-primary">Ver marcas existentes</Link>
            </div>
        </div>
    );
}

export default AdminMarcas;
