import Carousel from "../components/Carousel";
import TextMove from "../components/Textmove";
import DestacadoSection from "../components/DestacadoSection";
import { useFetch } from "../hooks/useFetch";
import { fetchActiveProducts } from "../services/productService";

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
            <div className="d-flex justify-content-between ">
                <h4>Destacado</h4>
                <a href="/Products" className="text-dark ">
                    Ver Mas..
                </a>
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
