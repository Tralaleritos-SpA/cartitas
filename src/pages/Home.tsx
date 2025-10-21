import Carousel from "../components/Carousel";
import TextMove from "../components/Textmove";
import JsonProducts from "../hooks/JsonProduct";
import DestacadoSection from "../components/DestacadoSection";

function Home() {
    document.title = "Home";

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

            <DestacadoSection products={JsonProducts} />
        </div>
    );
}

export default Home;
