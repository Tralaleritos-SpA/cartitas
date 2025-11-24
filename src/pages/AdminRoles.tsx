import RoleCreationForm from "../components/RoleCreationForm";
import { useDelete } from "../hooks/useDelete";
import { useFetch } from "../hooks/useFetch";
import { deleteRole, fetchRoles } from "../services/roleService";

function AdminRoles() {
    const {
        data: dataRole,
        loading: loadingRole,
        error: errorRole,
    } = useFetch(fetchRoles);

    const { remove, loading, error } = useDelete(deleteRole);
    return (
        <div className="dashboard-container">
            <h2>Roles</h2>
            <div className="box">
                <RoleCreationForm />
            </div>

            <div className="mt-3">
                <h3>Roles Existentes</h3>
                {loadingRole && <p>Cargando roles...</p>}
                {errorRole && (
                    <div className="alert alert-danger mt-3">
                        {errorRole.message}
                    </div>
                )}
                {dataRole && (
                    <table className="data-table">
                        <thead>
                            <tr>
                                <th>Nombre</th>
                                <th>Estado</th>
                                <th>Cambiar Estado</th>
                            </tr>
                        </thead>
                        <tbody>
                            {dataRole.map((data, index) => (
                                <tr key={index}>
                                    <td>{data.name}</td>
                                    <td>
                                        {data.active ? (
                                            <label className="text-success">
                                                Activo
                                            </label>
                                        ) : (
                                            <label className="text-danger">
                                                Desactivado
                                            </label>
                                        )}
                                    </td>
                                    <td>
                                        <button
                                            className="button button-primary w-100 my-1"
                                            onClick={() => remove(data.id)}
                                        >
                                            toggle
                                        </button>
                                        {loading}
                                        {error && (
                                            <div className="alert alert-danger mt-3">
                                                Error: {error.message}
                                            </div>
                                        )}
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                )}
            </div>
        </div>
    );
}

export default AdminRoles;
