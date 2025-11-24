import { useRef } from "react";
import type { Product } from "../types/productTypes";
import ProductoDestacado from "./ProductoDestacado";

function DestacadoSection({ products }: { products: Product[] }) {
    const scrollRef = useRef<HTMLDivElement>(null);

    const scroll = (direction: "left" | "right") => {
        const container = scrollRef.current;
        if (container) {
            const scrollAmount = 600;
            container.scrollBy({
                left: direction === "left" ? -scrollAmount : scrollAmount,
                behavior: "smooth",
            });
        }
    };

    return (
        <>
            <div className="position-relative">
                <div className="scroll-container " ref={scrollRef}>
                    {products.map((product, index) => (
                        <ProductoDestacado
                            id={product.id}
                            active={product.active}
                            name={product.name}
                            brand={product.brand}
                            stock={product.stock}
                            price={product.price}
                            img_url={product.img_url}
                            description={product.description}
                            category={product.category}
                            key={index}
                        />
                    ))}
                </div>

                <button
                    className="btn btn-dark scroll-button start position-absolute top-50 translate-middle-y"
                    onClick={() => scroll("left")}
                >
                    ‹
                </button>
                <button
                    className="btn btn-dark scroll-button end position-absolute top-50 translate-middle-y"
                    onClick={() => scroll("right")}
                >
                    ›
                </button>
            </div>
        </>
    );
}

export default DestacadoSection;
