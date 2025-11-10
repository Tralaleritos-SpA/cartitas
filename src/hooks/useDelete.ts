import { useState } from "react";

type DeleteFunction<TId, TReturn = void> = (id: TId) => Promise<TReturn>;

export const useDelete = <TId, TReturn = void>(
    deleteService: DeleteFunction<TId, TReturn>
) => {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<Error | null>(null);

    const remove = async (id: TId) => {
        setLoading(true);
        setError(null);

        try {
            // Call the service function with the ID
            const result = await deleteService(id);

            return result;
        } catch (err) {
            // Ensure we set an actual Error object
            setError(err instanceof Error ? err : new Error(String(err)));
            throw err; // Re-throw to allow component-level handling
        } finally {
            setLoading(false);
        }
    };

    return { remove, loading, error };
};
