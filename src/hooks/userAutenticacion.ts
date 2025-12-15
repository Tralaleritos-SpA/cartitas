import { useEffect, useState } from "react";
import type { StoredUser } from "../types/UserTypes";

//funcion para leer usuario desde localStorage
export function getStoredUser(): StoredUser | null {
    try {
        const raw = localStorage.getItem("user");
        if (!raw) return null;
        const parsed = JSON.parse(raw);
        return parsed && parsed.email ? parsed : null;
    } catch {
        localStorage.removeItem("user");
        return null;
    }
}

export function useAuth() {
    const [user, setUser] = useState<StoredUser | null>(getStoredUser());

    useEffect(() => {
        // ensure initial read
        setUser(getStoredUser());

        // when localStorage changes in other tabs/windows
        const handleStorage = (e: StorageEvent) => {
            // update when the `user` key changes (or when all storage is cleared => key === null)
            if (e.key === "user" || e.key === null) {
                setUser(getStoredUser());
            }
        };

        // when the tab becomes visible again, re-check stored user
        const handleVisibility = () => {
            if (!document.hidden) setUser(getStoredUser());
        };

        window.addEventListener("storage", handleStorage);
        document.addEventListener("visibilitychange", handleVisibility);

        // short polling fallback: ensures user state updates even if some platforms don't
        // reliably emit events (interval is small to keep load minimal)
        const interval = setInterval(() => {
            setUser((prev) => {
                const current = getStoredUser();
                // quick deep-equality via JSON stringify (user object is small)
                try {
                    return JSON.stringify(prev) === JSON.stringify(current)
                        ? prev
                        : current;
                } catch {
                    return current;
                }
            });
        }, 2000);

        return () => {
            window.removeEventListener("storage", handleStorage);
            document.removeEventListener("visibilitychange", handleVisibility);
            clearInterval(interval);
        };
    }, []);

    function logout() {
        // remove stored user, update local state and navigate away
        localStorage.removeItem("user");
        setUser(null);
        // navigate to home/login. Keep this synchronous to force navigation in same tab.
        window.location.href = "/";
    }

    return { user, logout };
}
