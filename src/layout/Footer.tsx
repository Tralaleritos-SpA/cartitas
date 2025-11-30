import {
    INSTAGRAM_LINK,
    SUPPORT_LINK,
    TWITTER_LINK,
} from "../config/constants";

function Footer() {
    return (
        <>
            <div className="footer mt-3 pb-3 pt-3 text-center text-small">
                <p className="mb-1">&copy; 2025 LevelUp</p>
                <ul className="list-inline mb-0">
                    <li className="list-inline-item">
                        <a
                            href={INSTAGRAM_LINK}
                            target="_blank"
                            className="footer-link"
                        >
                            Instagram
                        </a>
                    </li>
                    <li className="list-inline-item">
                        <a
                            href={TWITTER_LINK}
                            target="_blank"
                            className="footer-link"
                        >
                            Twitter
                        </a>
                    </li>
                    <li className="list-inline-item">
                        <a
                            href={SUPPORT_LINK}
                            target="_blank"
                            className="footer-link"
                        >
                            Soporte
                        </a>
                    </li>
                </ul>
            </div>
        </>
    );
}

export default Footer;
