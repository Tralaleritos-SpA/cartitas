import { Form } from "react-bootstrap";
import { useFetch } from "../hooks/useFetch";
import { fetchActiveBrands } from "../services/brandService";
import BrandCreationForm from "../components/BrandCreationForm";
import CategoryCreationForm from "../components/CategoryCreationForm";
import { fetchActiveCategories } from "../services/categoryService";

function AddItemsTestApi() {
    const {
        data: dataBrand,
        loading: loadingBrand,
        error: errorBrand,
    } = useFetch(fetchActiveBrands);

    const {
        data: dataCategory,
        loading: loadingCategory,
        error: errorCategory,
    } = useFetch(fetchActiveCategories);

    if (loadingBrand || loadingCategory) {
        return (
            <div className="container">
                <p>Loading...</p>
            </div>
        );
    }

    if (errorBrand || errorCategory) {
        return <div className="container alert alert-danger">Error: g</div>;
    }

    return (
        <div className="container">
            <div className="py-3">
                <Form.Select>
                    {dataBrand?.map((brand) => (
                        <option key={brand.id}>{brand.name}</option>
                    ))}
                </Form.Select>
                <BrandCreationForm />
            </div>
            <div className="py-3">
                <Form.Select>
                    {dataCategory?.map((category) => (
                        <option key={category.id}>{category.name}</option>
                    ))}
                </Form.Select>

                <CategoryCreationForm />
            </div>
        </div>
    );
}

export default AddItemsTestApi;
