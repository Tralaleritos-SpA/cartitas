import { Link } from "react-router-dom";
import type { Product } from "../types/productTypes";

function Card(product: Product) {
    return (
        <>
            <Link
                className="box-product-link"
                to={"/Productos/" + product.category + "/" + product.id}
            >
                <div className="box box-product">
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
                </div>
            </Link>
        </>
    );
}

export default Card;
