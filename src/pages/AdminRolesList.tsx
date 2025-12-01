import { useDelete } from "../hooks/useDelete";
import { useFetch } from "../hooks/useFetch";
import { deleteRole, fetchRoles } from "../services/roleService";

export default function AdminRolesList() {
    const {
        data: dataRole,
        loading: loadingRole,
        error: errorRole,
    } = useFetch(fetchRoles);

    const { remove, loading, error } = useDelete(deleteRole);
    return (
        <div className="dashboard-container">
            <h2>Roles Existentes</h2>
            {loadingRole && <p>Cargando roles...</p>}
            {errorRole && <div className="alert alert-danger mt-3">{errorRole.message}</div>}

            {dataRole && (
                <table className="data-table">
                    <thead>
                        <tr>
                            <th>Nombre</th>
                            <th>Estado</th>
                            <th>Acciones</th>
                        </tr>
                    </thead>
                    <tbody>
                        {dataRole.map((r: any, index: number) => (
                            <tr key={index}>
                                <td>{r.name}</td>
                                <td>{r.active ? <label className="text-success">Activo</label> : <label className="text-danger">Desactivado</label>}</td>
                                <td>
                                    <button className="button button-primary w-100 my-1" onClick={() => remove(r.id)}>toggle</button>
                                    {loading}
                                    {error && <div className="alert alert-danger mt-3">Error: {error.message}</div>}
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            )}
        </div>
    );
}
