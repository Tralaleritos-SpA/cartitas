import { useParams } from "react-router-dom";
import { useFetch } from "../hooks/useFetch";
import { fetchProductById } from "../services/productService";
import { useCallback } from "react";
import { clpFormatter } from "../hooks/currencyFormat";
import { addToCart } from "../hooks/cartService";

function ProductPage() {
    const { id } = useParams();

    const stableFetcher = useCallback(() => fetchProductById(id!), [id]);

    const {
        data: dataProduct,
        loading: loadingProduct,
        error: errorProduct,
    } = useFetch(stableFetcher);

    if (loadingProduct) {
        return (
            <div className="container text-center my-5">
                <h1>Cargando producto...</h1>
            </div>
        );
    }

    if (errorProduct || !dataProduct) {
        console.error(errorProduct);

        return (
            <div className="container text-center my-5">
                <h1>El producto no se ha encontrado :C</h1>
            </div>
        );
    }

    const handleAddToCart = () => {
        addToCart(dataProduct.id, 1);
        // opcional: feedback visual simple
        alert("Producto agregado al carrito");
    };

    return (
        <div className="container">
            <div className="boxes">
                <div className="product-img">
                    <img
                        className="product-img"
                        src={dataProduct.img_url}
                        alt={dataProduct.name + "image"}
                    />
                </div>

                <div className="product-body">
                    <label className="product-title">{dataProduct.name}</label>
                    <label className="product-brand">
                        {dataProduct.brand.name}
                    </label>
                    <label className="product-stock">
                        Stock: {dataProduct.stock}
                    </label>
                    <label className="product-price">
                        {clpFormatter.format(dataProduct.price)}
                    </label>
                    {dataProduct.stock ? (
                        <button className="button" onClick={handleAddToCart}>
                            Agregar al carrito
                        </button>
                    ) : (
                        <p className="box">ta agotao</p>
                    )}
                </div>
            </div>

            <div className="product-desc">
                <p>Descripcion producto:</p>
                <p>{dataProduct.description}</p>
            </div>
        </div>
    );
}

export default ProductPage;
