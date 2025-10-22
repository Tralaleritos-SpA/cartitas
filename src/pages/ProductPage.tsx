import { useParams } from "react-router-dom";
import { useFetch } from "../hooks/useFetch";

function ProductPage() {
    const { id } = useParams();

    if (loadingProduct) {
        return (
            <div className="container text-center my-5">
                <h1>Cargando producto...</h1>
            </div>
        );
    }

    if (errorProduct) {
        return (
            <div className="container my-5">
                <div className="alert alert-danger">
                    Error: {errorProduct.message}
                </div>
            </div>
        );
    }

    if (!product)
        return (
            <div className="container text-center my-5">
                <h1>El producto no se ha encontrado :C</h1>
            </div>
        );

    return (
        <div className="container">
            <div className="boxes">
                <div className="product-img">
                    <img
                        className="product-img"
                        src={product.img_url}
                        alt={product.name + "image"}
                    ></img>
                </div>

                <div className="product-body">
                    <label className="product-title">{product.name}</label>
                    <label className="product-brand">
                        {product.brand.name}
                    </label>
                    <label className="product-stock">
                        Stock: {product.stock}
                    </label>
                    <label className="product-price">${product.price}</label>
                    {product.stock ? (
                        <button className="button">Agregar al carrito</button>
                    ) : (
                        <p className="box">ta agotao</p>
                    )}
                </div>
            </div>

            <div className="product-desc">
                <p>Descripcion producto:</p>
                <p>{product.description}</p>
            </div>
        </div>
    );
}

export default ProductPage;
