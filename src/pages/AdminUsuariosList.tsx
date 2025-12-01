import { useDelete } from "../hooks/useDelete";
import { useFetch } from "../hooks/useFetch";
import { deleteUser, fetchUsers, updateUserActive } from "../services/userService";
import { useEffect, useState } from "react";

export default function AdminUsuariosList() {
    const { data: users, loading, error } = useFetch(fetchUsers);
    const { remove, loading: delLoading, error: delError } = useDelete(deleteUser);
    const [localUsers, setLocalUsers] = useState<any[] | null>(null);

    useEffect(() => {
        if (users) setLocalUsers(users as any[]);
    }, [users]);

    const handleToggle = async (u: any) => {
        try {
            const newActive = !u.active;
            await updateUserActive(u.id, newActive);
            setLocalUsers(prev => prev ? prev.map(item => item.id === u.id ? { ...item, active: newActive } : item) : prev);
        } catch (err) {
            console.error("Error toggling user:", err);
            alert("No se pudo actualizar el usuario. Revisa la consola.");
        }
    };

    return (
        <div className="dashboard-container">
            <h2>Usuarios Existentes</h2>

            {loading && <p>Cargando usuarios...</p>}
            {error && <div className="alert alert-danger mt-3">{error.message}</div>}

            {localUsers && (
                <table className="data-table">
                    <thead>
                        <tr>
                            <th>Nombre</th>
                            <th>Email</th>
                            <th>Acciones</th>
                        </tr>
                    </thead>
                    <tbody>
                        {localUsers.map((u: any) => (
                            <tr key={u.id}>
                                <td>{u.name}</td>
                                <td>{u.email}</td>
                                <td>
                                    <button className="button button-primary" onClick={() => handleToggle(u)}>{u.active ? "Desactivar" : "Activar"}</button>
                                    <button className="button button-danger ms-2" onClick={() => remove(u.id)}>Eliminar</button>
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
