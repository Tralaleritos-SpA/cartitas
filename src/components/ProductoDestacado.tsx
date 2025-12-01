import { Link } from "react-router-dom";
import type { Product } from "../types/productTypes";
import { clpFormatter } from "../hooks/currencyFormat";

function ProductoDestacado(product: Product) {
    return (
        <>
            <div className="box producto-destacado" key={product.id}>
                <Link
                    className="box-product-link"
                    to={"/Producto/" + product.id}
                >
                    <img
                        src={product.img_url}
                        alt={product.name}
                        className="box-product-img"
                    />
                    <label className="box-product-title">{product.name}</label>
                    <p>
                        <label className="box-product-price">
                            {clpFormatter.format(product.price)}
                        </label>
                    </p>
                </Link>
            </div>
        </>
    );
}

export default ProductoDestacado;
