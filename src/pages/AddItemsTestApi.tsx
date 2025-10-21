import { useFetchActiveBrands } from "../hooks/useFetchBrands";

function AddItemsTestApi() {
    const { brands, loading, error } = useFetchActiveBrands();

    if (loading) {
        return <p>Loading products...</p>;
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
            {brands?.map((brand, index) => (
                <p key={index}>{brand.name}</p>
            ))}
        </div>
    );
}

export default AddItemsTestApi;
