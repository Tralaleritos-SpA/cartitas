import { Link } from "react-router-dom";
import type { Product } from "../types/Product";

function ProductoDestacado(product: Product) {
    return (
        <>
            <div className="box producto-destacado" key={product.id}>
                <Link
                    className="box-product-link"
                    to={"/Productos/" + product.category + "/" + product.id}
                >
                    {" "}
                    <img
                        src={product.image}
                        alt={product.name}
                        className="box-product-img"
                    />
                    <label className="box-product-title">{product.name}</label>
                    <p>
                        <label className="box-product-price">
                            ${product.price}
                        </label>
                    </p>
                </Link>{" "}
            </div>
        </>
    );
}

export default ProductoDestacado;
