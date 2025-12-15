import { Outlet, useNavigate } from "react-router-dom";
import { useAuth } from "../hooks/userAutenticacion";
import { useEffect } from "react";

function AdminRoute() {
    const { user } = useAuth();
    const navigate = useNavigate();

    // when user changes (e.g. logout in another tab), ensure we redirect away
    useEffect(() => {
        if (!user || !user.role || user.role.name !== "admin") {
            // navigate away if no valid admin user
            navigate("/", { replace: true });
        }
    }, [user, navigate]);

    // only render children if we have a valid admin user
    if (user && user.role && user.role.name === "admin") {
        return <Outlet />;
    }

    // otherwise render nothing because the effect will redirect
    return null;
}

export default AdminRoute;
