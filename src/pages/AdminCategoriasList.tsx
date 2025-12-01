import { useFetch } from "../hooks/useFetch";
import { fetchCategories, updateCategoryActive } from "../services/categoryService";
import { useEffect, useState } from "react";
import { useModal } from "../hooks/useModal";

export default function AdminCategoriasList() {
    const {
        data: dataCategory,
        loading: loadingCategory,
        error: errorCategory,
    } = useFetch(fetchCategories);

    const [localCategories, setLocalCategories] = useState<any[] | null>(null);
    const { openModal, Modal } = useModal();

    useEffect(() => {
        if (dataCategory) setLocalCategories(dataCategory as any[]);
    }, [dataCategory]);

    const handleToggle = async (c: any) => {
        try {
            const newActive = !c.active;
            await updateCategoryActive(c.id, newActive);
            setLocalCategories(prev => prev ? prev.map(item => item.id === c.id ? { ...item, active: newActive } : item) : prev);
        } catch (err) {
            console.error("Error toggling category:", err);
            openModal("Error", "No se pudo actualizar la categoría. Revisa la consola.");
        }
    };

    return (
        <div className="dashboard-container">
            <h2>Categorías Existentes</h2>

            {loadingCategory && <p>Cargando categorias...</p>}
            {errorCategory && (
                <div className="alert alert-danger mt-3">{errorCategory.message}</div>
            )}

            {localCategories && (
                <table className="data-table">
                    <thead>
                        <tr>
                            <th>Nombre</th>
                            <th>Estado</th>
                            <th>Acciones</th>
                        </tr>
                    </thead>
                    <tbody>
                        {localCategories.map((c: any, index: number) => (
                            <tr key={index}>
                                <td>{c.name}</td>
                                <td>{c.active ? <label className="text-success">Activo</label> : <label className="text-danger">Desactivado</label>}</td>
                                <td>
                                    <button className="button button-primary my-1" onClick={() => handleToggle(c)}>{c.active ? "Desactivar" : "Activar"}</button>
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
