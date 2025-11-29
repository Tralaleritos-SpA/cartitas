import { useEffect, useState } from "react";
import type { StoredUser } from "../types/UserTypes";
import { createOrder } from "../services/orderService";
import {
    getCart,
    clearCart,
    setItemQuantity,
    type CartItem,
} from "../hooks/cartService";
import { useFetch } from "../hooks/useFetch";
import { fetchActiveProducts } from "../services/productService";
import type { Product } from "../types/productTypes";
import { useNavigate } from "react-router-dom";
import { DISCOUNT_RATE, SHIPPING_COST } from "../config/constants";
import SimpleModal from "../components/SimpleModal";

// ... (Definición de tipos ShippingAddressState, etc.) ...

function Checkoutdireccion() {
    const [NombreCompleto, setNombreCompleto] = useState("");
    const [email, setEmail] = useState("");
    const [phone, setPhone] = useState("");
    const [direccion, setdireccion] = useState("");
    const [ciudad, setciudad] = useState("");
    const [postal, setpostal] = useState("");

    const [user, setUser] = useState<StoredUser | null>(null);
    const [isSubmitting, setIsSubmitting] = useState(false);

    const navigate = useNavigate();
    const [modalOpen, setModalOpen] = useState(false);
    const [modalTitle, setModalTitle] = useState("");
    const [modalMessage, setModalMessage] = useState("");
    const [modalOnClose, setModalOnClose] = useState<(() => void) | null>(null);

    const openModal = (
        title: string,
        message: string,
        onClose: (() => void) | null
    ) => {
        setModalTitle(title);
        setModalMessage(message);
        setModalOnClose(() => onClose);
        setModalOpen(true);
    };

    const closeModal = () => {
        setModalOpen(false);
        const cb = modalOnClose;
        setModalOnClose(null);
        if (cb) cb();
    };

    // fetch active products to validate cart items before submitting an order
    const { data: products } = useFetch<Product[]>(fetchActiveProducts);

    useEffect(() => {
        const userStorage = localStorage.getItem("user");
        if (!userStorage) return;

        try {
            const storedUser: StoredUser = JSON.parse(userStorage);
            setUser(storedUser);

            if (storedUser?.name && storedUser?.last_name)
                setNombreCompleto(`${storedUser.name} ${storedUser.last_name}`);
            if (storedUser?.email) setEmail(storedUser.email);
        } catch (error) {
            const e = error as Error;
            console.error("Error leyendo usuario de localStorage", e);
            setUser(null);
        }
    }, []);

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        if (!user || isSubmitting) {
            if (!user)
                openModal(
                    "Inicio de sesión requerido",
                    "Debes iniciar sesión para completar la compra.",
                    null
                );
            return;
        }

        const cartItems = getCart();
        if (cartItems.length === 0) {
            openModal("Carrito vacío", "Tu carrito está vacío.", () =>
                navigate("/carrito")
            );
            return;
        }
        // Validate cart items against active products to avoid sending invalid productIds
        try {
            const activeProducts = products ?? [];
            const invalidItems: string[] = [];
            const adjustedItems: string[] = [];

            for (const item of cartItems) {
                const prod = activeProducts.find((p) => p.id === item.id);
                if (!prod) {
                    // remove invalid item from cart
                    setItemQuantity(item.id, 0);
                    invalidItems.push(item.id);
                } else if ((prod.stock ?? 0) < item.quantity) {
                    if ((prod.stock ?? 0) > 0) {
                        // reduce quantity to available stock
                        setItemQuantity(item.id, prod.stock ?? 0);
                        adjustedItems.push(
                            `${prod.name} (adjusted to ${prod.stock})`
                        );
                    } else {
                        // no stock, remove
                        setItemQuantity(item.id, 0);
                        adjustedItems.push(
                            `${prod.name} (removed, out of stock)`
                        );
                    }
                }
            }

            if (invalidItems.length > 0 || adjustedItems.length > 0) {
                const msgs: string[] = [];
                if (invalidItems.length > 0)
                    msgs.push(
                        `Se quitaron artículos inválidos: ${invalidItems.join(
                            ", "
                        )}`
                    );
                if (adjustedItems.length > 0)
                    msgs.push(
                        `Ajustes realizados: ${adjustedItems.join(", ")}`
                    );
                // show a modal informing the user about removals/adjustments
                openModal("Ajustes en tu carrito", msgs.join("\n"), () => {
                    // refresh cartItems after user closes modal
                    const newCart = getCart();
                    if (newCart.length === 0) {
                        navigate("/carrito");
                    }
                });
            }
        } catch (err) {
            console.error("Error validating cart items:", err);
            // proceed — server will still validate, but we prefer to surface client-side issues
        }

        // Re-read cart after possible client-side cleanup/adjustments
        const finalCart: CartItem[] = getCart();

        // Compute subtotal and discount to send to the server so the order
        // reflects the same totals shown in the cart page. Use centralized constant.
        const activeProducts = products ?? [];
        const subtotal = finalCart.reduce((acc, item) => {
            const prod = activeProducts.find((p) => p.id === item.id);
            if (!prod) return acc;
            return acc + prod.price * item.quantity;
        }, 0);

        const isDuocUser = !!(
            user &&
            ((user as any).isDuoc === true || (user as any).duoc === true)
        );

        const descuentos = isDuocUser
            ? Math.round(subtotal * DISCOUNT_RATE)
            : 0;

        const shippingData = {
            fullName: NombreCompleto,
            phone: phone,
            address: direccion,
            city: ciudad,
            zip: postal,
            region: "Region Desconocida",
            country: "Chile",
        };

        setIsSubmitting(true);
        try {
            // Pasamos user.id (number) directamente
            await createOrder(cartItems, user.id, shippingData);

            alert(
                "¡Compra finalizada con éxito! Puedes ver los detalles en 'Mis Pedidos'."
            );

            openModal(
                "Compra finalizada",
                "¡Compra finalizada con éxito! Puedes ver los detalles en 'Mis Pedidos'.",
                () => {
                    clearCart();
                    navigate("/MisPedidos");
                }
            );
        } catch (error) {
            const e = error as Error;
            console.error("Error al crear el pedido:", e);
            const errorMessage = e.message || String(error);

            openModal(
                "Fallo al crear el pedido",
                `Fallo al crear el pedido. Causa: ${errorMessage}`,
                null
            );
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <div className="container mt-4">
            <h3 className="mb-4">Dirección de Envío</h3>
            <form onSubmit={handleSubmit}>
                <div className="mb-3">
                    <label className="form-label">Nombre completo</label>
                    <input
                        type="text"
                        className="form-control"
                        value={NombreCompleto}
                        onChange={(e) => setNombreCompleto(e.target.value)}
                        required
                    />
                </div>

                <div className="mb-3">
                    <label className="form-label">Correo</label>
                    <input
                        type="email"
                        className="form-control"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                        disabled={!!user}
                    />
                </div>

                <div className="mb-3">
                    <label className="form-label">Número de teléfono</label>
                    <input
                        type="tel"
                        className="form-control"
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)}
                        placeholder="Ingresa tu número"
                        required
                    />
                </div>

                <div className="mb-3">
                    <label className="form-label">Dirección</label>
                    <input
                        type="text"
                        className="form-control"
                        value={direccion}
                        onChange={(e) => setdireccion(e.target.value)}
                        required
                    />
                </div>

                <div className="row">
                    <div className="col-md-6 mb-3">
                        <label className="form-label">Ciudad</label>
                        <input
                            type="text"
                            className="form-control"
                            value={ciudad}
                            onChange={(e) => setciudad(e.target.value)}
                            required
                        />
                    </div>
                    <div className="col-md-6 mb-3">
                        <label className="form-label">Código postal</label>
                        <input
                            type="text"
                            className="form-control"
                            value={postal}
                            onChange={(e) => setpostal(e.target.value)}
                            required
                        />
                    </div>
                </div>

                <button
                    type="submit"
                    className="button btn-primary w-100 mt-3"
                    disabled={isSubmitting || !user}
                >
                    {isSubmitting ? "Procesando Compra..." : "Finalizar Compra"}
                </button>
            </form>

            <SimpleModal
                show={modalOpen}
                title={modalTitle}
                message={modalMessage}
                onClose={closeModal}
            />
        </div>
    );
}

export default Checkoutdireccion;
