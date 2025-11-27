import Carousel from "../components/Carousel";
import TextMove from "../components/Textmove";
import DestacadoSection from "../components/DestacadoSection";
import { useFetch } from "../hooks/useFetch";
import { fetchActiveProducts } from "../services/productService";
import { Link } from "react-router-dom";

function Home() {
    document.title = "Home";

    const {
        data: productList,
        loading: productLoading,
        error: productError,
    } = useFetch(fetchActiveProducts);

    return (
        <div className="container">
            <TextMove />
            <Carousel />
            <div className="pt-3 pb-1 d-flex justify-content-between ">
                <h4>Destacado</h4>
                <Link to="/productos" className="text-dark">
                    Ver Mas..
                </Link>
            </div>

            {productLoading && <div>Cargando productos destacados...</div>}
            {productError && (
                <div className="alert alert-danger">
                    Error: {productError.message}
                </div>
            )}
            {productList && <DestacadoSection products={productList} />}
        </div>
    );
}

export default Home;
