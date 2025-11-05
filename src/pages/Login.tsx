import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import users from "../data/user.json";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const [isSuccess, setIsSuccess] = useState(false);

  useEffect(() => {
    document.title = "Inicio Sesión";
  }, []);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const user = users.find(
      (u) =>
        u.email.toLowerCase() === email.toLowerCase() &&
        u.password === password
    );

    if (user) {
      setIsSuccess(true);
      setMessage("Inicio de sesión exitoso, redirigiendo...");

      setTimeout(() => {/*si tiene el rol de admin se dirige al panel*/ 
        if(user.role === "admin"){
          window.location.href = "/admin";

        }else{
        window.location.href = "/";
        }
        },1500);
    } else {
      setIsSuccess(false);
      setMessage("Correo o contraseña incorrectos.");
    }
  };

  return (
    <div className="container">
      <Link to="/" className="link">
        &#8617; Regresar a la tienda
      </Link>

      <div className="row d-flex justify-content-center">
        <div className="col-12 col-md-6 col-lg-4">
          <div className="box login-box">
            <form
              className="needs-validation"
              noValidate
              onSubmit={handleSubmit}
            >
              <h3 className="text-center my-4">Iniciar Sesión</h3>

              <div className="mb-3">
                <label className="form-label">
                  Correo
                </label>
                <input
                  type="text"
                  className="form-control"
                  placeholder="Ingresa tu correo"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
                <div className="invalid-feedback">Ingresa un correo válido.</div>
              </div>

              <div className="mb-3">
                <label className="form-label">
                  Contraseña
                </label>
                <input
                  type="password"
                  className="form-control"
                  placeholder="Ingresa tu contraseña"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
                <div className="invalid-feedback">
                  Ingresa tu contraseña.
                </div>
              </div>

              {message && (
                <div
                  className={`alert text-center ${
                    isSuccess ? "alert-success" : "alert-danger"
                  }`}
                  role="alert"
                >
                  {message}
                </div>
              )}

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
