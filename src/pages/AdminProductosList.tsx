import { useFetch } from "../hooks/useFetch";
import { fetchProducts, updateProductActive } from "../services/productService";
import { clpFormatter } from "../hooks/currencyFormat";
import { useEffect, useState } from "react";

export default function AdminProductosList() {
    const {
        data: productList,
        loading: productLoading,
        error: productError,
    } = useFetch(fetchProducts);

    const [localProducts, setLocalProducts] = useState<any[] | null>(null);

    useEffect(() => {
        if (productList) setLocalProducts(productList as any[]);
    }, [productList]);

    const handleToggle = async (p: any) => {
        try {
            const newActive = !p.active;
            await updateProductActive(p.id, newActive);
            setLocalProducts((prev) => prev ? prev.map(item => item.id === p.id ? { ...item, active: newActive } : item) : prev);
        } catch (err) {
            console.error("Error toggling product active:", err);
            alert("No se pudo actualizar el producto. Revisa la consola.");
        }
    };

    return (
        <div className="dashboard-container">
            <h2>Productos Existentes</h2>

            {productLoading && <p>Cargando productos...</p>}
            {productError && (
                <div className="alert alert-danger mt-3">{productError.message}</div>
            )}

            {localProducts && (
                <table className="data-table">
                    <thead>
                        <tr>
                            <th>Nombre</th>
                            <th>Precio</th>
                            <th>Estado</th>
                            <th>Acciones</th>
                        </tr>
                    </thead>
                            <tbody>
                                {localProducts.map((p: any) => (
                            <tr key={p.id}>
                                <td>{p.name}</td>
                                <td>{clpFormatter.format(p.price ?? 0)}</td>
                                <td>
                                    {p.active ? (
                                        <label className="text-success">Activo</label>
                                    ) : (
                                        <label className="text-danger">Desactivado</label>
                                    )}
                                </td>
                                <td>
                                            <button className="button button-primary w-100 my-1" onClick={() => handleToggle(p)}>{p.active ? "Desactivar" : "Activar"}</button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            )}
        </div>
    );
}
