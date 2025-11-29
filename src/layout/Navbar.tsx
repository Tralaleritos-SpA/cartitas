import { Dropdown } from "react-bootstrap";
import { Link } from "react-router-dom";
import { useAuth } from "../hooks/userAutenticacion";
import { useState } from "react";

function Navbar() {
    // 2. State for controlling the mobile menu's visibility
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    const { user, logout } = useAuth();
    const Primernombre = user?.name ? user.name.split(" ")[0] : null;

    // 3. Toggle function
    const toggleMenu = () => {
        setIsMenuOpen(!isMenuOpen);
    };

    return (
        <div className="container navbar fixed-top">
            <Link
                className="nav-icon"
                to="/"
                onClick={() => setIsMenuOpen(false)}
            >
                LevelUp
            </Link>

            {/* 4. Mobile Menu Toggle Button (Hamburger) */}
            <button
                className="menu-toggle"
                onClick={toggleMenu}
                aria-label="Toggle navigation"
            >
                {/* You'd typically use a SVG or an icon library here */}
                {isMenuOpen ? (
                    <svg
                        viewBox="0 0 24 24"
                        width="24"
                        height="24"
                        stroke="currentColor"
                        strokeWidth="2"
                        fill="none"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                    >
                        <line x1="18" y1="6" x2="6" y2="18"></line>
                        <line x1="6" y1="6" x2="18" y2="18"></line>
                    </svg>
                ) : (
                    <svg
                        viewBox="0 0 24 24"
                        width="24"
                        height="24"
                        stroke="currentColor"
                        strokeWidth="2"
                        fill="none"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                    >
                        <line x1="3" y1="12" x2="21" y2="12"></line>
                        <line x1="3" y1="6" x2="21" y2="6"></line>
                        <line x1="3" y1="18" x2="21" y2="18"></line>
                    </svg>
                )}
            </button>

            {/* 5. Apply a class based on menu state */}
            <ul className={`nav-items ${isMenuOpen ? "open" : ""}`}>
                <li>
                    <Dropdown>
                        <Dropdown.Toggle
                            className="custom-dropdown-toggle nav-link"
                            id="productDropdown"
                        >
                            Productos
                        </Dropdown.Toggle>
                        <Dropdown.Menu className="custom-dropdown-menu">
                            <Dropdown.Item
                                href="/Productos/TCG"
                                onClick={toggleMenu}
                            >
                                Trading Card Games
                            </Dropdown.Item>
                            <Dropdown.Item
                                href="/Productos/Accesorios"
                                onClick={toggleMenu}
                            >
                                Accesorios
                            </Dropdown.Item>
                            <Dropdown.Item
                                href="/Productos/Juegos De Mesa"
                                onClick={toggleMenu}
                            >
                                Juegos de Mesa
                            </Dropdown.Item>
                            <Dropdown.Item
                                href="/Productos"
                                onClick={toggleMenu}
                            >
                                Ver Todo
                            </Dropdown.Item>
                        </Dropdown.Menu>
                    </Dropdown>
                </li>
                <li>
                    <Link
                        className="nav-link"
                        to="/Eventos"
                        onClick={toggleMenu}
                    >
                        Eventos
                    </Link>
                </li>
                <li>
                    <Link
                        className="nav-link"
                        to="/Carrito"
                        onClick={toggleMenu}
                    >
                        Carrito
                    </Link>
                </li>
                <li>
                    <Dropdown>
                        <Dropdown.Toggle className="custom-dropdown-toggle nav-link">
                            {Primernombre
                                ? `Hola, ${Primernombre}`
                                : "Mi Cuenta"}
                        </Dropdown.Toggle>

                        <Dropdown.Menu className="custom-dropdown-menu">
                            {user ? (
                                <>
                                    <Dropdown.Item
                                        href="/Mipedidos"
                                        onClick={toggleMenu}
                                    >
                                        Mis pedidos
                                    </Dropdown.Item>
                                    <Dropdown.Divider />
                                    <Dropdown.Item
                                        onClick={() => {
                                            logout();
                                            toggleMenu();
                                        }}
                                    >
                                        Cerrar sesión
                                    </Dropdown.Item>
                                </>
                            ) : (
                                <>
                                    <Dropdown.Item
                                        href="/login"
                                        onClick={toggleMenu}
                                    >
                                        Iniciar sesión
                                    </Dropdown.Item>
                                    <Dropdown.Item
                                        href="/register"
                                        onClick={toggleMenu}
                                    >
                                        Registrarse
                                    </Dropdown.Item>
                                </>
                            )}
                        </Dropdown.Menu>
                    </Dropdown>
                </li>
            </ul>
        </div>
    );
}
export default Navbar;
