import { useFetch } from "../hooks/useFetch";
import { fetchRoles, updateRoleActive } from "../services/roleService";
import { useEffect, useState } from "react";

export default function AdminRolesList() {
    const {
        data: dataRole,
        loading: loadingRole,
        error: errorRole,
    } = useFetch(fetchRoles);

    const [localRoles, setLocalRoles] = useState<any[] | null>(null);

    useEffect(() => {
        if (dataRole) setLocalRoles(dataRole as any[]);
    }, [dataRole]);

    const handleToggle = async (r: any) => {
        try {
            const newActive = !r.active;
            await updateRoleActive(r.id, newActive);
            setLocalRoles(prev => prev ? prev.map(item => item.id === r.id ? { ...item, active: newActive } : item) : prev);
        } catch (err) {
            console.error("Error toggling role:", err);
            alert("No se pudo actualizar el role. Revisa la consola.");
        }
    };

    return (
        <div className="dashboard-container">
            <h2>Roles Existentes</h2>
            {loadingRole && <p>Cargando roles...</p>}
            {errorRole && <div className="alert alert-danger mt-3">{errorRole.message}</div>}

            {localRoles && (
                <table className="data-table">
                    <thead>
                        <tr>
                            <th>Nombre</th>
                            <th>Estado</th>
                            <th>Acciones</th>
                        </tr>
                    </thead>
                    <tbody>
                        {localRoles.map((r: any, index: number) => (
                            <tr key={index}>
                                <td>{r.name}</td>
                                <td>{r.active ? <label className="text-success">Activo</label> : <label className="text-danger">Desactivado</label>}</td>
                                <td>
                                    <button className="button button-primary w-100 my-1" onClick={() => handleToggle(r)}>{r.active ? "Desactivar" : "Activar"}</button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            )}
        </div>
    );
}
