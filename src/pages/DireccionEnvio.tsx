import { useEffect, useState } from "react";
import type { StoredUser } from "../types/UserTypes";
import { createOrder } from "../services/orderService"; 
import { getCart, clearCart } from "../hooks/cartService"; 
import { useNavigate } from "react-router-dom"; 

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

    useEffect(() => {
        const userStorage = localStorage.getItem("user");
        if (!userStorage) return;

        try {
            const storedUser: StoredUser = JSON.parse(userStorage);
            setUser(storedUser); 

            if (storedUser?.name && storedUser?.last_name) setNombreCompleto(`${storedUser.name} ${storedUser.last_name}`);
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
            if (!user) alert("Debes iniciar sesión para completar la compra.");
            return;
        }

        const cartItems = getCart();
        if (cartItems.length === 0) {
            alert("Tu carrito está vacío.");
            navigate("/carrito");
            return;
        }
        
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

            alert("¡Compra finalizada con éxito! Puedes ver los detalles en 'Mis Pedidos'.");
            
            clearCart(); 

            // REDIRECCIÓN A LA PÁGINA DE LISTADO DE PEDIDOS
            navigate("/MisPedidos"); 

        } catch (error) {
            const e = error as Error; 
            console.error("Error al crear el pedido:", e);
            const errorMessage = e.message || String(error); 
            
            alert(`Fallo al crear el pedido. Causa: ${errorMessage}`); 
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
        </div>
    );
}

export default Checkoutdireccion;