import UserCreationForm from "../components/UserCreationForm";
import { Link } from "react-router-dom";

function AdminUsuarios() {
    return (
        <div className="dashboard-container">
            <h2>Usuarios</h2>
            <div className="box">
                <UserCreationForm />
            </div>

            <div className="mt-3">
                <h3>Usuarios</h3>
                <p>Para ver o editar usuarios existentes, visita la lista:</p>
                <Link to="/admin/usuarios/existentes" className="button button-primary">Ver usuarios existentes</Link>
            </div>
        </div>
    );
}

export default AdminUsuarios;
