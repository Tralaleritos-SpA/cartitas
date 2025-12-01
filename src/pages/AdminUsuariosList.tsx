import { useFetch } from "../hooks/useFetch";
import { fetchUsers, updateUserActive } from "../services/userService";
import { useEffect, useState } from "react";
import { useModal } from "../hooks/useModal";

export default function AdminUsuariosList() {
    const { data: users, loading: userLoading, error: userError } = useFetch(fetchUsers);
    const [localUsers, setLocalUsers] = useState<any[] | null>(null);
    const { openModal, Modal } = useModal();

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
            openModal("Error", "No se pudo actualizar el usuario. Revisa la consola.");
        }
    };

    return (
        <div className="dashboard-container">
            <h2>Usuarios Existentes</h2>

            {userLoading && <p>Cargando usuarios...</p>}
            {userError && <div className="alert alert-danger mt-3">{userError.message}</div>}

            {localUsers && (
                <table className="data-table">
                    <thead>
                        <tr>
                            <th>Nombre</th>
                            <th>Email</th>
                            <th>Estado</th>
                            <th>Acciones</th>
                        </tr>
                    </thead>
                    <tbody>
                        {localUsers.map((u: any) => (
                            <tr key={u.id}>
                                <td>{u.name}</td>
                                <td>{u.email}</td>
                                <td>
                                    {u.active ? (
                                        <label className="text-success">Activo</label>
                                    ) : (
                                        <label className="text-danger">Desactivado</label>
                                    )}
                                </td>
                                <td>
                                    <button className="button button-primary w-100 my-1" onClick={() => handleToggle(u)}>{u.active ? "Desactivar" : "Activar"}</button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            )}
            <Modal />
        </div>
    );
}
