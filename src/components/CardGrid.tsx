import Card from "./Card";
import type { Product } from "../types/productTypes";

interface CardGridProps {
    products: Product[] | null;
    loading: boolean;
    error: Error | null;
}
function CardGrid({ products, loading, error }: CardGridProps) {
    if (loading) {
        return <div>Cargando productos...</div>;
    }

    if (error) {
        return (
            <div className="alert alert-danger">Error: {error.toString()}</div>
        );
    }

    if (!products || products.length < 1) {
        return <p>No hay productos para mostrar.</p>;
    }
    return (
        <div className="card-grid col-sm-12 col-md-8">
            {products.map((product, index) => (
                <Card
                    id={product.id}
                    category={product.category}
                    name={product.name}
                    brand={product.brand}
                    price={product.price}
                    img_url={product.img_url}
                    description={product.description}
                    key={index}
                />
            ))}
        </div>
    );
}

export default CardGrid;
