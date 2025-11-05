import BrandCreationForm from "../components/BrandCreationForm";
import { useFetch } from "../hooks/useFetch";
import { fetchActiveBrands } from "../services/brandService";

function AdminMarcas() {
    const {
        data: dataBrand,
        loading: loadingBrand,
        error: errorBrand,
    } = useFetch(fetchActiveBrands);

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
                                <th>ID</th>
                                <th>Nombre</th>
                                <th>Estado</th>
                                <th>Toggle Estado</th>
                            </tr>
                        </thead>
                        <tbody>
                            {dataBrand.map((data, index) => (
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

export default AdminMarcas;
