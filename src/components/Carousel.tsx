import JsonProducts from "../hooks/JsonProduct";

function Carousel() {
    return (
        <div
            id="carouselExampleFade"
            className="carousel slide carousel-fade box p-1"
            data-bs-ride="carousel"
            data-bs-interval="3000"
        >
            <div className="carousel-inner ">
                {JsonProducts.slice(0, 3).map((product, index) => (
                    <div
                        key={product.id}
                        className={`carousel-item ${
                            index === 0 ? "active" : ""
                        } contenedor-p`}
                    >
                        <img
                            src={product.image}
                            className="d-block img-p"
                            alt={product.name}
                        />
                        <div className="carousel-caption d-none d-md-block bg-dark bg-opacity-50 rounded p-2">
                            <h5>{product.name}</h5>
                            <p>{product.desc}</p>
                        </div>
                    </div>
                ))}
            </div>

            <button
                className="carousel-control-prev"
                type="button"
                data-bs-target="#carouselExampleFade"
                data-bs-slide="prev"
            >
                <span
                    className="carousel-control-prev-icon"
                    aria-hidden="true"
                ></span>
                <span className="visually-hidden">Anterior</span>
            </button>

            <button
                className="carousel-control-next"
                type="button"
                data-bs-target="#carouselExampleFade"
                data-bs-slide="next"
            >
                <span
                    className="carousel-control-next-icon"
                    aria-hidden="true"
                ></span>
                <span className="visually-hidden">Siguiente</span>
            </button>
        </div>
    );
}

export default Carousel;
