import { Link } from "react-router-dom";

function Footer() {
    return (
        <>
            <div className="footer mt-3 pb-3 pt-3 text-center text-small">
                <p className="mb-1">&copy; 2025 LevelUp</p>
                <ul className="list-inline mb-0">
                    <li className="list-inline-item">
                        <a href="#" className="footer-link">
                            Instagram
                        </a>
                    </li>
                    <li className="list-inline-item">
                        <a href="#" className="footer-link">
                            Twitter
                        </a>
                    </li>
                    <li className="list-inline-item">
                        <a href="#" className="footer-link">
                            Support
                        </a>
                    </li>
                    <Link to="ApiTest" className="footer-link">
                        API
                    </Link>
                </ul>
            </div>
        </>
    );
}

export default Footer;
