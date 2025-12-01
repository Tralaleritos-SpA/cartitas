import { useState, useCallback, useMemo } from 'react';
import { fetchOrderById } from '../services/orderService';
import type { Order } from '../types/OrderTypes';

// Definición del estado de caché y carga
type Cache = { [orderId: string]: Order | undefined };
type LoadingIds = { [orderId: string]: boolean };

export function useAdminOrderDetails() {
    const [cache, setCache] = useState<Cache>({});
    const [loadingIds, setLoadingIds] = useState<LoadingIds>({});

    const load = useCallback(async (orderId: string) => {
        // Si ya está en caché o ya se está cargando, salir
        if (cache[orderId] || loadingIds[orderId]) {
            return;
        }

        setLoadingIds(prev => ({ ...prev, [orderId]: true }));

        try {
            // Llama a la función de tu servicio para obtener los detalles completos (tipo Order)
            const details = await fetchOrderById(orderId);
            
            // Almacena en caché
            setCache(prev => ({ ...prev, [orderId]: details }));

        } catch (error) {
            console.error(`Error loading details for order ${orderId}:`, error);
            // Podrías añadir un estado de error específico si lo necesitas
            throw error; // Propagar el error para que el componente lo maneje
        } finally {
            setLoadingIds(prev => ({ ...prev, [orderId]: false }));
        }
    }, [cache, loadingIds]);

    // Retorna los valores de manera eficiente
    const hookData = useMemo(() => ({
        cache,
        load,
        loadingIds,
    }), [cache, load, loadingIds]);

    return hookData;
}