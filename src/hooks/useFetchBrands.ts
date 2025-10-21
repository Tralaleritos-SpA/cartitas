import { useEffect, useState } from "react";
import { fetchBrands } from "../services/brandService";
import type { Brand } from "../types/productTypes";

export const useFetchActiveBrands = () => {
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<Error | null>(null);
    const [brands, setBrands] = useState<Brand[] | null>(null);

    useEffect(() => {
        // default state for a new fetch
        setLoading(true);
        setError(null);

        const loadProducts = async () => {
            try {
                // call api
                const brandList = await fetchBrands();
                setBrands(brandList);
            } catch (err) {
                // set error state
                setError(err as Error);
            } finally {
                setLoading(false);
            }
        };

        loadProducts();
    }, []);

    return { brands, loading, error };
};
