import { Form } from "react-bootstrap";
import { useFetch } from "../hooks/useFetch";
import { fetchActiveBrands } from "../services/brandService";
import { fetchActiveCategories } from "../services/categoryService";
import { useCreate } from "../hooks/useCreate";
import { createProduct } from "../services/productService";
import type { Brand, Category, Product } from "../types/productTypes";
import { useState } from "react";

interface ProductPayload {
    name: string;
    brand: Brand;
    category: Category;
    stock: number;
    price: number;

    // Optional fields
    img_url: string | "";
    description: string | null;
    quantity?: number;
    min_player_number?: number;
    max_player_number?: number;
}

function ProductCreationForm() {
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

    const {
        create,
        createdResource,
        loading: loadingSubmit,
        error: errorSubmit,
    } = useCreate<Product, ProductPayload>(createProduct);

    const [productName, setProductName] = useState("");
    const [productStock, setProductStock] = useState(0);
    const [productPrice, setProductPrice] = useState(0);
    const [productImgUrl, setProductImgUrl] = useState("");
    const [productDescription, setProductDescription] = useState("");
    const [productBrandId, setProductBrandId] = useState("");
    const [productCategoryId, setProductCategoryId] = useState("");
    const [productQuantity, setProductQuantity] = useState(0);
    const [productMinPlayers, setProductMinPlayers] = useState(0);
    const [productMaxPlayers, setProductMaxPlayers] = useState(0);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        const selectedBrand = dataBrand?.find(
            (brand) => brand.id === productBrandId
        );
        const selectedCategory = dataCategory?.find(
            (category) => category.id === productCategoryId
        );

        // 2. CRITICAL CHECK: Ensure objects were found and required fields are set
        if (!productName.trim() || !productBrandId || !productCategoryId)
            return;
        if (!selectedBrand || !selectedCategory) {
            // Optional: Show an alert here if data is unexpectedly missing
            console.error(
                "Selected Brand or Category data is missing or invalid."
            );
            return;
        }

        await create({
            name: productName.trim(),
            brand: selectedBrand,
            category: selectedCategory,
            stock: productStock,
            price: productPrice,

            img_url: productImgUrl.trim(),
            description: productDescription.trim(),
            quantity: productQuantity,
            min_player_number: productMinPlayers,
            max_player_number: productMaxPlayers,
        });
        setProductName("");
        setProductBrandId("");
        setProductCategoryId("");
        setProductStock(0);
        setProductPrice(0);
        setProductImgUrl("");
        setProductDescription("");
        setProductQuantity(0);
        setProductMinPlayers(0);
        setProductMaxPlayers(0);
    };
    return (
        <>
            <div className="box">
                <h4>Crear Producto</h4>
                <p>
                    Los campos marcados con{" "}
                    <label className="text-red"> * </label> son obligatorios.
                </p>

                <Form onSubmit={handleSubmit}>
                    <div className="row">
                        <div className="col">
                            <label className="text-red">*</label>
                            <label>Nombre:</label>
                            <input
                                type="text"
                                required
                                value={productName}
                                disabled={
                                    loadingBrand ||
                                    loadingCategory ||
                                    loadingSubmit
                                }
                                className="form-control my-1"
                                onChange={(e) => setProductName(e.target.value)}
                            />
                            <label className="text-red">*</label>
                            <label>Stock:</label>
                            <input
                                type="number"
                                required
                                value={productStock}
                                disabled={
                                    loadingBrand ||
                                    loadingCategory ||
                                    loadingSubmit
                                }
                                className="form-control my-1"
                                onChange={(e) =>
                                    setProductStock(e.target.valueAsNumber)
                                }
                            />

                            <label className="text-red">*</label>
                            <label>Precio:</label>
                            <input
                                type="number"
                                required
                                value={productPrice}
                                placeholder="$"
                                disabled={
                                    loadingBrand ||
                                    loadingCategory ||
                                    loadingSubmit
                                }
                                className="form-control my-1"
                                onChange={(e) =>
                                    setProductPrice(e.target.valueAsNumber)
                                }
                            />

                            <label>URL Imagen:</label>
                            <input
                                type="text"
                                placeholder="https://link-imagen.png"
                                value={productImgUrl}
                                disabled={
                                    loadingBrand ||
                                    loadingCategory ||
                                    loadingSubmit
                                }
                                className="form-control my-1"
                                onChange={(e) =>
                                    setProductImgUrl(e.target.value)
                                }
                            />

                            <label className="text-red">*</label>
                            <label>Descripcion:</label>
                            <textarea
                                required
                                value={productDescription}
                                rows={5}
                                placeholder="bla bla bla"
                                disabled={
                                    loadingBrand ||
                                    loadingCategory ||
                                    loadingSubmit
                                }
                                className="form-control no-resize my-1"
                                onChange={(e) =>
                                    setProductDescription(e.target.value)
                                }
                            />
                        </div>
                        <div className="col">
                            <label className="text-red">*</label>
                            <label>Selecciona marca</label>
                            {loadingBrand ? (
                                <p>Cargando marcas...</p>
                            ) : (
                                <Form.Select
                                    className="my-1"
                                    required
                                    value={productBrandId}
                                    disabled={
                                        loadingBrand ||
                                        loadingCategory ||
                                        loadingSubmit
                                    }
                                    onChange={(e) =>
                                        setProductBrandId(e.target.value)
                                    }
                                >
                                    <option value={""} disabled hidden>
                                        Selecciona una opcion...
                                    </option>
                                    {dataBrand?.map((brand, index) => (
                                        <option value={brand.id} key={index}>
                                            {brand.name}
                                        </option>
                                    ))}
                                </Form.Select>
                            )}
                            <label className="text-red">*</label>
                            <label>Selecciona categoria</label>
                            {loadingBrand ? (
                                <p>Cargando categorias...</p>
                            ) : (
                                <Form.Select
                                    className="my-1"
                                    required
                                    value={productCategoryId}
                                    disabled={
                                        loadingBrand ||
                                        loadingCategory ||
                                        loadingSubmit
                                    }
                                    onChange={(e) =>
                                        setProductCategoryId(e.target.value)
                                    }
                                >
                                    <option value={""} disabled hidden>
                                        Selecciona una opcion...
                                    </option>
                                    {dataCategory?.map((category, index) => (
                                        <option value={category.id} key={index}>
                                            {category.name}
                                        </option>
                                    ))}
                                </Form.Select>
                            )}
                            <label>Cantidad</label>
                            <input
                                type="number"
                                placeholder="Para accesorios"
                                value={productQuantity}
                                onChange={(e) =>
                                    setProductQuantity(e.target.valueAsNumber)
                                }
                                disabled={
                                    loadingBrand ||
                                    loadingCategory ||
                                    loadingSubmit
                                }
                                className="form-control my-1"
                            />
                            <label> Numero minimo jugadores</label>
                            <input
                                type="number"
                                placeholder="Para juegos de mesa"
                                value={productMinPlayers}
                                onChange={(e) =>
                                    setProductMinPlayers(e.target.valueAsNumber)
                                }
                                disabled={
                                    loadingBrand ||
                                    loadingCategory ||
                                    loadingSubmit
                                }
                                className="form-control my-1"
                            />
                            <label>Numero maximo jugadores</label>
                            <input
                                type="number"
                                placeholder="Para juegos de mesa"
                                value={productMaxPlayers}
                                onChange={(e) =>
                                    setProductMaxPlayers(e.target.valueAsNumber)
                                }
                                disabled={
                                    loadingBrand ||
                                    loadingCategory ||
                                    loadingSubmit
                                }
                                className="form-control my-1"
                            />
                            <button type="submit" className="button w-100">
                                {loadingSubmit
                                    ? "Creando Producto..."
                                    : "Crear Producto"}
                            </button>
                        </div>

                        {errorBrand && (
                            <div className="alert alert-danger my-1">
                                Error: {errorBrand.message}
                            </div>
                        )}
                        {errorCategory && (
                            <div className="alert alert-danger my-1">
                                Error: {errorCategory.message}
                            </div>
                        )}
                        {errorSubmit && (
                            <div className="alert alert-danger my-1">
                                Error: {errorSubmit.message}
                            </div>
                        )}
                        {createdResource && (
                            <div className="alert alert-success">
                                El producto se ha creado correctamente:
                                {createdResource?.name} (ID:
                                {createdResource?.id})
                            </div>
                        )}
                    </div>
                </Form>
            </div>
        </>
    );
}

export default ProductCreationForm;
