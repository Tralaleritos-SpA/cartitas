import ProductCreationForm from "../components/ProductCreationForm";
import { useDelete } from "../hooks/useDelete";
import { useFetch } from "../hooks/useFetch";
import { deleteProduct, fetchProducts } from "../services/productService";

function AdminProductos() {
    const {
        data: productList,
        loading: productLoading,
        error: productError,
    } = useFetch(fetchProducts);

    const { remove, loading, error } = useDelete(deleteProduct);

    return (
        <div className="dashboard-container">
            <h2>Productos</h2>
            <div className="box">
                <ProductCreationForm />
            </div>

            <div className="mt-3">
                <h3>Marcas Existentes</h3>
                {productLoading && <p>Cargando marcas...</p>}
                {productError && (
                    <div className="alert alert-danger mt-3">
                        {productError.message}
                    </div>
                )}
                {productList && (
                    <table className="data-table">
                        <thead>
                            <tr>
                                <th>Nombre</th>
                                <th>Estado</th>
                                <th>Cambiar Estado</th>
                            </tr>
                        </thead>
                        <tbody>
                            {productList.map((data, index) => (
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

export default AdminProductos;
