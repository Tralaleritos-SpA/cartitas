import { useEffect } from "react";
import { Link } from "react-router-dom";
import users from "../data/user.json";

function Login() {
    useEffect(() => {
        document.title = "Inicio Sesion";

        const form = document.getElementById("forminiciosession");
        const email = document.getElementById("email") as HTMLInputElement | null;
        const password = document.getElementById("password") as HTMLInputElement | null;
        const loginMessage = document.getElementById("loginMessage") as HTMLInputElement | null;

        if (!form || !loginMessage || !email || !password) return;

        form.addEventListener("submit", function (e) {
            e.preventDefault(); // evita recargar la página

            const user = users.find(
                (u) =>
                    u.email.toLowerCase() === email.value.toLowerCase() &&
                    u.password === password.value
            );

            // simulamos que sea correcto
            if (user) {
                loginMessage.classList.remove("d-none");
                loginMessage.classList.remove("alert-danger");
                loginMessage.classList.add("alert-success");
                loginMessage.textContent =
                    "Inicio de sesión exitoso, redirigiendo...";

                setTimeout(() => {
                    window.location.href = "/"; // esto redirigira a la pagina que elijas
                }, 1500);
            } else {
                //login incorrecto
                loginMessage.classList.remove("d-none");
                loginMessage.classList.remove("alert-success");
                loginMessage.classList.add("alert-danger");
                loginMessage.textContent = "Correo o contraseña incorrectos.";
            }
        });
    }, []);

    return (
        <div className="container">
            <Link to="/" className="link">
                &#8617; Regresar a la tienda
            </Link>
            <div className="row d-flex justify-content-center">
                <div className="col-12 col-md-6 col-lg-4">
                    <div className="box login-box">
                        <form
                            id="forminiciosession"
                            className="needs-validation"
                            noValidate
                        >
                            <h3 className="text-center my-4">Iniciar Sesión</h3>
                            <div className="mb-3">
                                <label htmlFor="email" className="form-label">
                                    Correo
                                </label>
                                <input
                                    type="text"
                                    className="form-control"
                                    id="email"
                                    placeholder="Ingresa tu correo"
                                    required
                                />
                                <div className="invalid-feedback">
                                    Ingresa un correo válido.
                                </div>
                            </div>
                            <div className="mb-3">
                                <label
                                    htmlFor="password"
                                    className="form-label"
                                >
                                    Contraseña
                                </label>
                                <input
                                    type="password"
                                    className="form-control"
                                    id="password"
                                    placeholder="Ingresa tu contraseña"
                                    required
                                />
                                <div className="invalid-feedback">
                                    Ingresa tu contraseña.
                                </div>
                            </div>
                            <div
                                id="loginMessage"
                                className="alert alert-success text-center d-none"
                                role="alert"
                            >
                                Iniciando Sesión...
                            </div>
                            <button type="submit" className="button w-100">
                                Ingresar
                            </button>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Login;
