import CategoryCreationForm from "../components/CategoryCreationForm";
import { useFetch } from "../hooks/useFetch";
import { fetchActiveCategories } from "../services/categoryService";

function AdminCategorias() {
    const {
        data: dataCategory,
        loading: loadingCategory,
        error: errorCategory,
    } = useFetch(fetchActiveCategories);

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
                                <th>ID</th>
                                <th>Nombre</th>
                                <th>Estado</th>
                                <th>Toggle Estado</th>
                            </tr>
                        </thead>
                        <tbody>
                            {dataCategory.map((data, index) => (
                                <tr key={index}>
                                    <td>{data.id}</td>
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
                                        <button className="button button-primary w-100 my-1">
                                            toggle
                                        </button>
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
