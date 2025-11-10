import CategoryCreationForm from "../components/CategoryCreationForm";
import { useDelete } from "../hooks/useDelete";
import { useFetch } from "../hooks/useFetch";
import { deleteCategory, fetchCategories } from "../services/categoryService";

function AdminCategorias() {
    const {
        data: dataCategory,
        loading: loadingCategory,
        error: errorCategory,
    } = useFetch(fetchCategories);

    const { remove, loading, error } = useDelete(deleteCategory);

    return (
        <div className="dashboard-container">
            <h2>Marcas</h2>
            <div className="box">
                <CategoryCreationForm />
            </div>

            <div className="mt-3">
                <h3>Categorias Existentes</h3>
                {loadingCategory && <p>Cargando categorias...</p>}
                {errorCategory && (
                    <div className="alert alert-danger mt-3">
                        {errorCategory.message}
                    </div>
                )}
                {dataCategory && (
                    <table className="data-table">
                        <thead>
                            <tr>
                                <th>Nombre</th>
                                <th>Estado</th>
                                <th>Cambiar Estado</th>
                            </tr>
                        </thead>
                        <tbody>
                            {dataCategory.map((data, index) => (
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
                                            className="button button-primary my-1"
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

export default AdminCategorias;
