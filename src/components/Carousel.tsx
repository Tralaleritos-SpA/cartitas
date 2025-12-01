import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { fetchActiveProducts } from "../services/productService";
import type { Product } from "../types/productTypes";

function pickRandom<T>(arr: T[], n: number) {
    const copy = arr.slice();
    const result: T[] = [];
    const len = Math.min(n, copy.length);
    for (let i = 0; i < len; i++) {
        const idx = Math.floor(Math.random() * copy.length);
        result.push(copy.splice(idx, 1)[0]);
    }
    return result;
}

function Carousel() {
    const [items, setItems] = useState<Product[] | null>(null);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        let mounted = true;

        async function load() {
            try {
                const prods = await fetchActiveProducts();
                if (!mounted) return;
                const picked = pickRandom(prods, 3);
                setItems(picked);
            } catch (err: any) {
                if (!mounted) return;
                setError(err?.message ?? String(err));
            }
        }

        load();

        return () => {
            mounted = false;
        };
    }, []);

    // fallback: render nothing or an error message while loading
    return (
        <div
            id="carouselExampleFade"
            className="carousel slide carousel-fade box p-1"
            data-bs-ride="carousel"
            data-bs-interval="3000"
        >
            <div className="carousel-inner ">
                {error ? (
                    <div className="alert alert-danger">
                        Error loading carousel: {error}
                    </div>
                ) : items ? (
                    items.map((product, index) => {
                        const imgSrc =
                            (product as any).image || product.img_url || "";
                        return (
                            <div
                                key={product.id}
                                className={`carousel-item ${
                                    index === 0 ? "active" : ""
                                } contenedor-p`}
                            >
                                <Link
                                    to={`/Producto/${product.id}`}
                                    className="d-block text-decoration-none text-reset"
                                >
                                    <img
                                        src={imgSrc}
                                        className="d-block img-p"
                                        alt={product.name}
                                    />
                                    <div className="carousel-caption d-none d-md-block bg-dark bg-opacity-50 rounded p-2">
                                        <h5>{product.name}</h5>
                                    </div>
                                </Link>
                            </div>
                        );
                    })
                ) : (
                    // loading state: show empty placeholders (3 items)
                    [0, 1, 2].map((_, index) => (
                        <div
                            key={index}
                            className={`carousel-item ${
                                index === 0 ? "active" : ""
                            } contenedor-p`}
                        >
                            <div
                                className="d-flex align-items-center justify-content-center"
                                style={{ height: 200 }}
                            >
                                <div>Loading...</div>
                            </div>
                        </div>
                    ))
                )}
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
