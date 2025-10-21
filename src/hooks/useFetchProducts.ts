import { useEffect, useState } from "react";
import { fetchProducts } from "../services/productService";
import type { Product } from "../types/productTypes";

export const useFetchProducts = () => {
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<Error | null>(null);
    const [products, setProducts] = useState<Product[] | null>(null);

    useEffect(() => {
        // default state for a new fetch
        setLoading(true);
        setError(null);

        const loadProducts = async () => {
            try {
                // call api
                const productList = await fetchProducts();
                setProducts(productList);
            } catch (err) {
                // set error state
                setError(err as Error);
            } finally {
                setLoading(false);
            }
        };

        loadProducts();
    }, []);

    return { products, loading, error };
};
