import { useState } from "react";

type CreateFunction<T, P> = (payload: P) => Promise<T>;

export const useCreate = <T, P>(createService: CreateFunction<T, P>) => {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<Error | null>(null);
    const [createdResource, setCreatedResource] = useState<T | null>(null);

    // This function handles the async operation and takes the payload 'P'
    const create = async (payload: P) => {
        setLoading(true);
        setError(null);
        setCreatedResource(null);

        try {
            // The generic service function is called with the generic payload
            const newResource = await createService(payload);
            setCreatedResource(newResource);
            return newResource; // Return the created object
        } catch (err) {
            // Ensure we set an actual Error object
            setError(err instanceof Error ? err : new Error(String(err)));
            throw err; // Re-throw to allow component-level handling
        } finally {
            setLoading(false);
        }
    };

    return { create, createdResource, loading, error };
};
