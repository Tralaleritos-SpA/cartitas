import type { Product } from "../types/Product";

function CarritoProduct(product: Product) {
    return (
        <div className="box mb-3">
            <img
                src={product.image}
                className="box-product-img"
                style={{ maxWidth: "10rem" }}
            ></img>
            <p>{product.name}</p>
            <p>${product.price}</p>
            <span className="d-inline-flex">
                <button className="button">&minus;</button>
                <p>0</p>
                <button className="button">&#x2B;</button>
            </span>
        </div>
    );
}

export default CarritoProduct;
