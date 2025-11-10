import { Link } from "react-router-dom";
import {useRvalidation} from "../hooks/Rvalidation";

function Register() {
    const {email,setEmail,password,setPassword,rpassword, setRpassword, handleSubmit, error, valid} =
    useRvalidation();
    return (
        <div className="container">
            <Link to="/" className="link">
                &#8617; Regresar a la tienda
            </Link>
            <div>
                <div className="row d-flex justify-content-center">
                    <div className="col-12 col-md-6 col-lg-4">
                        <div className="box login-box">
                            <form
                                onSubmit={handleSubmit}
                                noValidate
                            >
                                <h3 className="text-center my-4">Registro</h3>

                                <div className="mb-3">
                                    <label
                                        htmlFor="email"
                                        className="form-label"
                                    >
                                        Correo
                                    </label>
                                    <input
                                        type="email"
                                        className={`form-control ${error.email ? "is-invalid" : ""}`}
                                        value={email}
                                        onChange={(e) => setEmail(e.target.value)}
                                        placeholder="Ingresa tu correo"   
                                    />
                                    {error.email && (
                                        <div className="invalid-feedback">
                                            {error.email}
                                        </div>
                                    )}
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
                                        className={`form-control ${error.password ? "is-invalid" : ""}`}
                                        value={password}
                                        onChange={(e) => setPassword(e.target.value)}
                                        placeholder="Ingresa tu contraseña"
                                    />
                                    {error.password && (
                                        <div className="invalid-feedback">
                                            {error.password}
                                        </div>
                                    )}
                                </div>

                                <div className="mb-3">
                                    <label
                                        htmlFor="rpassword"
                                        className="form-label"
                                    >
                                        Confirmar Contraseña
                                    </label>
                                    <input
                                        type="password"
                                        className={`form-control ${error.rpassword ? "is-invalid" : ""}`}
                                        value={rpassword}
                                        onChange={(e) => setRpassword(e.target.value)}
                                        placeholder="Reingresa tu contraseña"
                                    
                                    />
                                    {error.rpassword && (
                                        <div className="invalid-feedback">
                                            {error.rpassword}
                                        </div>
                                    )}
                                </div>
                                {valid && (
                                <div className="alert alert-success text-center" role="alert">
                                    Registro exitoso. Redirigiendo a la página de inicio de sesión...
                                </div>
                                )}

                                <button type="submit" className="button w-100">
                                    Registrarse
                                </button>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Register;
