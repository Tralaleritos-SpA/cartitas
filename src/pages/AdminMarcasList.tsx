import { useFetch } from "../hooks/useFetch";
import { fetchBrands, updateBrandActive } from "../services/brandService";
import { useEffect, useState } from "react";

export default function AdminMarcasList() {
    const {
        data: dataBrand,
        loading: loadingBrand,
        error: errorBrand,
    } = useFetch(fetchBrands);

    const [localBrands, setLocalBrands] = useState<any[] | null>(null);

    useEffect(() => {
        if (dataBrand) setLocalBrands(dataBrand as any[]);
    }, [dataBrand]);

    const handleToggle = async (b: any) => {
        try {
            const newActive = !b.active;
            await updateBrandActive(b.id, newActive);
            setLocalBrands(prev => prev ? prev.map(item => item.id === b.id ? { ...item, active: newActive } : item) : prev);
        } catch (err) {
            console.error("Error toggling brand:", err);
            alert("No se pudo actualizar la marca. Revisa la consola.");
        }
    };

    return (
        <div className="dashboard-container">
            <h2>Marcas Existentes</h2>

            {loadingBrand && <p>Cargando marcas...</p>}
            {errorBrand && (
                <div className="alert alert-danger mt-3">{errorBrand.message}</div>
            )}

            {localBrands && (
                <table className="data-table">
                    <thead>
                        <tr>
                            <th>Nombre</th>
                            <th>Estado</th>
                            <th>Acciones</th>
                        </tr>
                    </thead>
                    <tbody>
                        {localBrands.map((b: any, index: number) => (
                            <tr key={index}>
                                <td>{b.name}</td>
                                <td>{b.active ? <label className="text-success">Activo</label> : <label className="text-danger">Desactivado</label>}</td>
                                <td>
                                    <button className="button button-primary w-100 my-1" onClick={() => handleToggle(b)}>{b.active ? "Desactivar" : "Activar"}</button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            )}
        </div>
    );
}
