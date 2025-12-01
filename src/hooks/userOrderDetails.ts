import { useCallback, useState } from "react";
import { fetchOrderById } from "../services/orderService";
import type { Order } from "../types/OrderTypes";

type Cache = { [key: string]: Order | null };

export function useOrderDetails() {
  const [cache, setCache] = useState<Cache>({});
  const [loadingIds, setLoadingIds] = useState<Record<string, boolean>>({});
  const [errorIds, setErrorIds] = useState<Record<string, string | null>>({});

  const load = useCallback(async (orderId: string) => {
    if (cache[orderId]) return cache[orderId]; // ya cacheado
    setLoadingIds(prev => ({ ...prev, [orderId]: true }));
    setErrorIds(prev => ({ ...prev, [orderId]: null }));
    try {
      const details = await fetchOrderById(orderId);
      setCache(prev => ({ ...prev, [orderId]: details }));
      return details;
    } catch (err: any) {
      setErrorIds(prev => ({ ...prev, [orderId]: err?.message || "Error" }));
      throw err;
    } finally {
      setLoadingIds(prev => ({ ...prev, [orderId]: false }));
    }
  }, [cache]);

  return {
    cache,
    load,
    loadingIds,
    errorIds,
    clearCache: () => setCache({}),
  };
}
