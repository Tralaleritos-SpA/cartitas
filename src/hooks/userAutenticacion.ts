import { useEffect, useState } from "react";

export type StoredUser = {
    id: number;
    name: string;
    role: string;
    email: string;
};

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
        setUser(getStoredUser());
    }, []);

    function logout() {
        localStorage.removeItem("user");
        setUser(null);
        window.location.href = "/";
    }

    return { user, logout };
}
