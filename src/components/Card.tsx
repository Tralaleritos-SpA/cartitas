import { Link } from "react-router-dom";
import type { Product } from "../types/productTypes";

function Card(product: Product) {
    return (
        <>
            <div className="box box-product">
                <Link
                    className="box-product-link"
                    to={"/Productos/" + product.id}
                >
                    <img
                        className="box-product-img"
                        src={product.img_url}
                        alt={product.name + "image"}
                    ></img>
                    <div className="box-product-body">
                        <label className="box-product-title">
                            {product.name}
                        </label>
                        <label className="box-product-brand">
                            {product.brand.name}
                        </label>
                        <label className="box-product-price">
                            ${product.price}
                        </label>
                    </div>
                </Link>
            </div>
        </>
    );
}

export default Card;
