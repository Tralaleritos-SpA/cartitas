import JsonProducts from "../hooks/JsonProduct";
import CarritoProduct from "./CarritoProduct";

function CarritoProductList() {
    const carritoProducts = JsonProducts;

    return (
        <>
            {carritoProducts.map((product, index) => (
                <CarritoProduct
                    id={product.id}
                    category={product.category}
                    name={product.name}
                    brand={product.brand}
                    price={product.price}
                    image={product.image}
                    desc={product.desc}
                    key={index}
                />
            ))}
        </>
    );
}

export default CarritoProductList;
