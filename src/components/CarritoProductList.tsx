import CarritoProduct from "./CarritoProduct";
import type { Product } from "../types/productTypes";

type CartProduct = Product & { quantity: number };

interface CarritoProductListProps {
    products: CartProduct[];
    onIncrease: (id: string, currentQty: number) => void;
    onDecrease: (id: string, currentQty: number) => void;
}

function CarritoProductList({
    products,
    onIncrease,
    onDecrease,
}: CarritoProductListProps) {
    if (products.length === 0) {
        return <p>Tu carrito está vacío.</p>;
    }

    return (
        <>
            {products.map((product) => (
                <CarritoProduct
                    key={product.id}
                    product={product}
                    onIncrease={() =>
                        onIncrease(product.id, product.quantity)
                    }
                    onDecrease={() =>
                        onDecrease(product.id, product.quantity)
                    }
                />
            ))}
        </>
    );
}

export default CarritoProductList;
