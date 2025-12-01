import { useDelete } from "../hooks/useDelete";
import { useFetch } from "../hooks/useFetch";
import { deleteUser, fetchUsers } from "../services/userService";

export default function AdminUsuariosList() {
    const { data: users, loading, error } = useFetch(fetchUsers);
    const { remove, loading: delLoading, error: delError } = useDelete(deleteUser);

    return (
        <div className="dashboard-container">
            <h2>Usuarios Existentes</h2>

            {loading && <p>Cargando usuarios...</p>}
            {error && <div className="alert alert-danger mt-3">{error.message}</div>}

            {users && (
                <table className="data-table">
                    <thead>
                        <tr>
                            <th>Nombre</th>
                            <th>Email</th>
                            <th>Acciones</th>
                        </tr>
                    </thead>
                    <tbody>
                        {users.map((u: any) => (
                            <tr key={u.id}>
                                <td>{u.name}</td>
                                <td>{u.email}</td>
                                <td>
                                    <button className="button button-danger" onClick={() => remove(u.id)}>Eliminar</button>
                                    {delLoading}
                                    {delError && <div className="alert alert-danger mt-3">{delError.message}</div>}
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            )}
        </div>
    );
}
