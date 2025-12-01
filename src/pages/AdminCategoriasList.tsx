import { useDelete } from "../hooks/useDelete";
import { useFetch } from "../hooks/useFetch";
import { deleteCategory, fetchCategories } from "../services/categoryService";

export default function AdminCategoriasList() {
    const {
        data: dataCategory,
        loading: loadingCategory,
        error: errorCategory,
    } = useFetch(fetchCategories);

    const { remove, loading, error } = useDelete(deleteCategory);

    return (
        <div className="dashboard-container">
            <h2>Categorías Existentes</h2>

            {loadingCategory && <p>Cargando categorias...</p>}
            {errorCategory && (
                <div className="alert alert-danger mt-3">{errorCategory.message}</div>
            )}

            {dataCategory && (
                <table className="data-table">
                    <thead>
                        <tr>
                            <th>Nombre</th>
                            <th>Estado</th>
                            <th>Acciones</th>
                        </tr>
                    </thead>
                    <tbody>
                        {dataCategory.map((c: any, index: number) => (
                            <tr key={index}>
                                <td>{c.name}</td>
                                <td>{c.active ? <label className="text-success">Activo</label> : <label className="text-danger">Desactivado</label>}</td>
                                <td>
                                    <button className="button button-primary my-1" onClick={() => remove(c.id)}>toggle</button>
                                    {loading}
                                    {error && <div className="alert alert-danger mt-3">Error: {error.message}</div>}
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            )}
        </div>
    );
}
