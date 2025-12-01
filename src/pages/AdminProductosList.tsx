import { useDelete } from "../hooks/useDelete";
import { useFetch } from "../hooks/useFetch";
import { deleteProduct, fetchProducts } from "../services/productService";
import { clpFormatter } from "../hooks/currencyFormat";

export default function AdminProductosList() {
    const {
        data: productList,
        loading: productLoading,
        error: productError,
    } = useFetch(fetchProducts);

    const { remove, loading, error } = useDelete(deleteProduct);

    return (
        <div className="dashboard-container">
            <h2>Productos Existentes</h2>

            {productLoading && <p>Cargando productos...</p>}
            {productError && (
                <div className="alert alert-danger mt-3">{productError.message}</div>
            )}

            {productList && (
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
                        {productList.map((p: any) => (
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
                                    <button
                                        className="button button-primary w-100 my-1"
                                        onClick={() => remove(p.id)}
                                    >
                                        toggle
                                    </button>
                                    {loading}
                                    {error && (
                                        <div className="alert alert-danger mt-3">Error: {error.message}</div>
                                    )}
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            )}
        </div>
    );
}
