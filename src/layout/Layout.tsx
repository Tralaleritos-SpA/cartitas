import { useLocation } from "react-router-dom";
import Footer from "./Footer";
import Navbar from "./Navbar";

interface LayoutProps {
    children: React.ReactNode;
}

function Layout({ children }: LayoutProps) {
    const location = useLocation();
    const pagesWithoutLayout = ["/login", "/register", "/carrito"];
    const prefixWithoutLayout = ["/admin"];

    if (
        pagesWithoutLayout.includes(location.pathname.toLowerCase()) ||
        prefixWithoutLayout.some((prefix) =>
            location.pathname.startsWith(prefix)
        )
    ) {
        return <div className="pt-5">{children}</div>;
    }

    return (
        <>
            <Navbar />
            <main className="main-content">{children}</main>
            <Footer />
        </>
    );
}

export default Layout;
