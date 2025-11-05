import { Link } from "react-router-dom";
import CarritoProductList from "../components/CarritoProductList";

function Carrito() {
    document.title = "Carrito";

    return (
        <div className="container">
            <Link to="/" className="link">
                &#8617; Regresar a la tienda
            </Link>
            <div className="row pt-3">
                <div className="col-sm-12 col-md-6 col-lg-6">
                    <CarritoProductList />
                </div>
                <div className="col-sm-12 col-md-6 col-lg-6 box">
                    {/* CALCULO PRECIO, DESCUENTOS, CODIGOS PROMO, IR A PAGAR */}
                    <p>titulo carrito</p>
                    <p>precio 1</p>
                    <p>precio 2</p>
                    <p>precio 3</p>
                    <p>subtotal</p>
                    <p>descuentos</p>
                    <p>caja codigo desc</p>
                    <p>envio</p>
                    <p>total</p>
                    <p>boton ir a pagar</p>
                </div>
            </div>
        </div>
    );
}

export default Carrito;
