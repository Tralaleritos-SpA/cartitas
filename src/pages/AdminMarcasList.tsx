import { useDelete } from "../hooks/useDelete";
import { useFetch } from "../hooks/useFetch";
import { deleteBrand, fetchBrands } from "../services/brandService";

export default function AdminMarcasList() {
    const {
        data: dataBrand,
        loading: loadingBrand,
        error: errorBrand,
    } = useFetch(fetchBrands);

    const { remove, loading, error } = useDelete(deleteBrand);

    return (
        <div className="dashboard-container">
            <h2>Marcas Existentes</h2>

            {loadingBrand && <p>Cargando marcas...</p>}
            {errorBrand && (
                <div className="alert alert-danger mt-3">{errorBrand.message}</div>
            )}

            {dataBrand && (
                <table className="data-table">
                    <thead>
                        <tr>
                            <th>Nombre</th>
                            <th>Estado</th>
                            <th>Acciones</th>
                        </tr>
                    </thead>
                    <tbody>
                        {dataBrand.map((b: any, index: number) => (
                            <tr key={index}>
                                <td>{b.name}</td>
                                <td>{b.active ? <label className="text-success">Activo</label> : <label className="text-danger">Desactivado</label>}</td>
                                <td>
                                    <button className="button button-primary w-100 my-1" onClick={() => remove(b.id)}>toggle</button>
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
