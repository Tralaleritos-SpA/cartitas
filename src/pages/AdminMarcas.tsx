import BrandCreationForm from "../components/BrandCreationForm";
import { useDelete } from "../hooks/useDelete";
import { useFetch } from "../hooks/useFetch";
import { deleteBrand, fetchBrands } from "../services/brandService";

function AdminMarcas() {
    const {
        data: dataBrand,
        loading: loadingBrand,
        error: errorBrand,
    } = useFetch(fetchBrands);

    const { remove, loading, error } = useDelete(deleteBrand);
    return (
        <div className="dashboard-container">
            <h2>Marcas</h2>
            <div className="box">
                <BrandCreationForm />
            </div>

            <div className="mt-3">
                <h3>Marcas Existentes</h3>
                {loadingBrand && <p>Cargando marcas...</p>}
                {errorBrand && (
                    <div className="alert alert-danger mt-3">
                        {errorBrand.message}
                    </div>
                )}
                {dataBrand && (
                    <table className="data-table">
                        <thead>
                            <tr>
                                <th>Nombre</th>
                                <th>Estado</th>
                                <th>Cambiar Estado</th>
                            </tr>
                        </thead>
                        <tbody>
                            {dataBrand.map((data, index) => (
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

export default AdminMarcas;
