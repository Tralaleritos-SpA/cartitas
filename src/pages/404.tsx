import Button from "../components/Button";
import image from "/src/assets/images/monopensando.webp"

function NotFound() {
    document.title = "404";
    return (
        <>
            <div className="container text-center">
                <h1>404</h1>
                <div>
                    <img
                        src={image}
                        className="box monkey-box"
                        height="450px"
                    ></img>
                </div>
                <p className="pt-3">uhhhh... pagina no encontrada</p>
                <Button to="/">Volver al Inicio</Button>
            </div>
        </>
    );
}

export default NotFound;
