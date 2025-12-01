import RoleCreationForm from "../components/RoleCreationForm";
import { Link } from "react-router-dom";

function AdminRoles() {
    // lista movida a `AdminRolesList`
    return (
        <div className="dashboard-container">
            <h2>Roles</h2>
            <div className="box">
                <RoleCreationForm />
            </div>

            <div className="mt-3">
                <h3>Roles</h3>
                <p>Para ver o editar roles existentes, visita la lista:</p>
                <Link to="/admin/roles/existentes" className="button button-primary">Ver roles existentes</Link>
            </div>
        </div>
    );
}

export default AdminRoles;
