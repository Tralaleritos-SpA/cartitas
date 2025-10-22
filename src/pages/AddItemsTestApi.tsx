import { useFetch } from "../hooks/useFetch";
import { fetchActiveBrands } from "../services/brandService";

function AddItemsTestApi() {
    const { data, loading, error } = useFetch(fetchActiveBrands);

    if (loading) {
        return (
            <div className="container">
                <p>Loading products...</p>
            </div>
        );
    }

    if (error) {
        return (
            <div className="container alert alert-danger">
                Error: {error.toString()}
            </div>
        );
    }

    return (
        <div className="container">
            <h1>brands active</h1>
            {data?.map((brand, index) => (
                <div key={index}>
                    <p>id: {brand.id}</p>
                    <p>{brand.name}</p>
                </div>
            ))}
        </div>
    );
}

export default AddItemsTestApi;
