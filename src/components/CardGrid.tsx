import Card from "./Card";
import type { Product } from "../types/productTypes";

function CardGrid({ products }: { products: Product[] | null }) {
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
