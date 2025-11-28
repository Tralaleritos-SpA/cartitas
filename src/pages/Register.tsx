// src/pages/Register.tsx
import { Link } from "react-router-dom";
import { useRvalidation } from "../hooks/Rvalidation";

function Register() {
    const {
        name,
        setName,
        lastName,
        setLastName,
        email,
        setEmail,
        password,
        setPassword,
        rpassword,
        setRpassword,
        handleSubmit,
        error,
        valid,
        loading,
        apiError,
        clearFieldError,
    } = useRvalidation();

    return (
        <div className="container">
            <Link to="/" className="link">
                &#8617; Regresar a la tienda
            </Link>
            <div className="row d-flex justify-content-center">
                <div className="col-12 col-md-6 col-lg-4">
                    <div className="box login-box">
                        <form onSubmit={handleSubmit} noValidate>
                            <h3 className="text-center my-4">Registro</h3>

                            <div className="mb-3">
                                <label htmlFor="name" className="form-label">
                                    Nombre
                                </label>
                                <input
                                    id="name"
                                    type="text"
                                    className={`form-control ${
                                        error.name ? "is-invalid" : ""
                                    }`}
                                    value={name}
                                    onChange={(e) => {
                                        setName(e.target.value);
                                        if (error.name) clearFieldError("name");
                                    }}
                                    placeholder="Ingresa tu nombre"
                                    required
                                    disabled={loading}
                                />
                                {error.name && (
                                    <div className="invalid-feedback">
                                        {error.name}
                                    </div>
                                )}
                            </div>

                            <div className="mb-3">
                                <label
                                    htmlFor="lastname"
                                    className="form-label"
                                >
                                    Apellido
                                </label>
                                <input
                                    id="lastname"
                                    type="text"
                                    className={`form-control ${
                                        error.lastName ? "is-invalid" : ""
                                    }`}
                                    value={lastName}
                                    onChange={(e) => {
                                        setLastName(e.target.value);
                                        if (error.lastName)
                                            clearFieldError("lastName");
                                    }}
                                    placeholder="Ingresa tu apellido"
                                    required
                                    disabled={loading}
                                />
                                {error.lastName && (
                                    <div className="invalid-feedback">
                                        {error.lastName}
                                    </div>
                                )}
                            </div>

                            <div className="mb-3">
                                <label htmlFor="email" className="form-label">
                                    Correo
                                </label>
                                <input
                                    id="email"
                                    type="email"
                                    className={`form-control ${
                                        error.email ? "is-invalid" : ""
                                    }`}
                                    value={email}
                                    onChange={(e) => {
                                        setEmail(e.target.value);
                                        if (error.email)
                                            clearFieldError("email");
                                    }}
                                    placeholder="Ingresa tu correo"
                                    required
                                    disabled={loading}
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
                                    id="password"
                                    type="password"
                                    className={`form-control ${
                                        error.password ? "is-invalid" : ""
                                    }`}
                                    value={password}
                                    onChange={(e) => {
                                        setPassword(e.target.value);
                                        if (error.password)
                                            clearFieldError("password");
                                    }}
                                    placeholder="Ingresa tu contraseña"
                                    required
                                    disabled={loading}
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
                                    id="rpassword"
                                    type="password"
                                    className={`form-control ${
                                        error.rpassword ? "is-invalid" : ""
                                    }`}
                                    value={rpassword}
                                    onChange={(e) => {
                                        setRpassword(e.target.value);
                                        if (error.rpassword)
                                            clearFieldError("rpassword");
                                    }}
                                    placeholder="Reingresa tu contraseña"
                                    required
                                    disabled={loading}
                                />
                                {error.rpassword && (
                                    <div className="invalid-feedback">
                                        {error.rpassword}
                                    </div>
                                )}
                            </div>

                            {apiError && (
                                <div className="alert alert-danger text-center">
                                    {apiError}
                                </div>
                            )}

                            {valid && (
                                <div
                                    className="alert alert-success text-center"
                                    role="alert"
                                >
                                    Registro exitoso. Redirigiendo...
                                </div>
                            )}

                            <button
                                type="submit"
                                className="button w-100"
                                disabled={loading}
                            >
                                {loading ? "Registrando..." : "Registrarse"}
                            </button>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Register;
