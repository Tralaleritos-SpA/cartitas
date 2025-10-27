import Card from "./Card";
import type { Product } from "../types/productTypes";

interface CardGridProps {
    products: Product[] | null;
    loading: boolean;
    error: Error | null;
}
function CardGrid({ products, loading, error }: CardGridProps) {
    if (loading) {
        return <div>Loading products...</div>;
    }

    if (error) {
        return (
            <div className="alert alert-danger">Error: {error.toString()}</div>
        );
    }

    if (!products) {
        return <p>No products to display.</p>;
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
