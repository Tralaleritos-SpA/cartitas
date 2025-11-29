import { useEffect, useMemo, useState } from "react";
import CarritoProductList from "../components/CarritoProductList";
import { useFetch } from "../hooks/useFetch";
import { fetchActiveProducts } from "../services/productService";
import type { Product } from "../types/productTypes";
import {
    getCart,
    setItemQuantity,
    type CartItem,
} from "../services/cartService";
import { clpFormatter } from "../hooks/currencyFormat";

type CartProduct = Product & { quantity: number };

function Carrito() {
    const [cartItems, setCartItems] = useState<CartItem[]>([]);

    useEffect(() => {
        document.title = "Carrito";
        setCartItems(getCart());
    }, []);

    const { data: products } = useFetch<Product[]>(fetchActiveProducts);

    const cartProducts: CartProduct[] = useMemo(() => {
        if (!products) return [];
        return cartItems
            .map((item) => {
                const prod = products.find((p) => p.id === item.id);
                if (!prod) return null;
                return {
                    ...prod,
                    quantity: item.quantity,
                };
            })
            .filter((p): p is CartProduct => p !== null);
    }, [cartItems, products]);

    const subtotal = useMemo(
        () => cartProducts.reduce((acc, p) => acc + p.price * p.quantity, 0),
        [cartProducts]
    );

    const descuentos = 0;
    const envio = cartProducts.length > 0 ? 5000 : 0;
    const total = subtotal - descuentos + envio;

    const handleChangeQuantity = (id: string, newQty: number) => {
        const updatedCart = setItemQuantity(id, newQty);
        setCartItems(updatedCart);
    };

    const cartLength = cartProducts.reduce((acc, p) => acc + p.quantity, 0);

    return (
        <div className="container">
            <div className="row">
                <div className="col-sm-12 col-md-6 col-lg-6 ">
                    <CarritoProductList
                        products={cartProducts}
                        onIncrease={(id, currentQty) =>
                            handleChangeQuantity(id, currentQty + 1)
                        }
                        onDecrease={(id, currentQty) =>
                            handleChangeQuantity(id, currentQty - 1)
                        }
                    />
                </div>

                <div className="col-sm-12 col-md-6 col-lg-6 box">
                    <h3>Resumen de compra</h3>
                    <p>Cantidad Productos: {cartLength}</p>
                    <p>Subtotal: {clpFormatter.format(subtotal)}</p>
                    <p>Descuentos: {clpFormatter.format(descuentos)}</p>
                    <p>Envío: {clpFormatter.format(envio)}</p>
                    <hr />
                    <p>
                        <strong>Total: {clpFormatter.format(total)}</strong>
                    </p>
                    <button className="button button-primary w-100 mt-2">
                        Continuar al Pago
                    </button>
                </div>
            </div>
        </div>
    );
}

export default Carrito;
