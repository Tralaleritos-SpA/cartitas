import { useEffect, useState } from "react";

type FetchFunction<T> = () => Promise<T[]>;

export const useFetch = <T>(fetcher: FetchFunction<T>) => {
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<Error | null>(null);
    const [data, setData] = useState<T[] | null>(null);

    useEffect(() => {
        // default state
        setLoading(true);
        setError(null);

        const loadProducts = async () => {
            try {
                // call api
                const loadData = await fetcher();
                setData(loadData);
            } catch (err) {
                // Check if the caught item is already an Error instance.
                if (err instanceof Error) {
                    setError(err);
                } else {
                    // If it's not an Error (e.g., a string thrown from productService),
                    // wrap it in a new Error object before setting the state.
                    setError(new Error(String(err)));
                }
            } finally {
                setLoading(false);
            }
        };

        loadProducts();
    }, [fetcher]);

    return { data, loading, error };
};
