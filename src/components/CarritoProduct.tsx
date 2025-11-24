import type { Product } from "../types/productTypes";
import { clpFormatter } from "../hooks/currencyFormat";

type CartProduct = Product & { quantity: number };

interface CarritoProductProps {
    product: CartProduct;
    onIncrease: () => void;
    onDecrease: () => void;
}

function CarritoProduct({
    product,
    onIncrease,
    onDecrease,
}: CarritoProductProps) {
    return (
        <div className="box mb-3 d-flex gap-3 align-items-center">
            <img
                src={product.img_url}
                className="box-product-img"
                style={{ maxWidth: "10rem" }}
                alt={product.name}
            />
            <div className="flex-grow-1">
                <p>{product.name}</p>
                <p>{clpFormatter.format(product.price)}</p>
            </div>
            <div className="ms-auto">

                <span className="d-inline-flex align-items-center gap-2">
                    <button className="button" onClick={onDecrease}>
                        &minus;
                    </button>
                    <p className="mb-0">{product.quantity}</p>
                    <button className="button" onClick={onIncrease}>
                        &#x2B;
                    </button>
                </span>
            </div>
        </div>
    );
}

export default CarritoProduct;
