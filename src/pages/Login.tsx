import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { loginUser } from "../services/userService";

type Role = {
  name: string;
}|null;

type StoredUser = {
  id: string;
  name: string;
  email: string;
  role: Role;
};

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const [isSuccess, setIsSuccess] = useState(false);

  // Si ya hay usuario logeado, redirige según su rol
  useEffect(() => {
    document.title = "Inicio Sesión";

    try {
      const userStorage = localStorage.getItem("user");
      if (!userStorage) return;

      const user: StoredUser = JSON.parse(userStorage);

      if (user?.role?.name?.toLowerCase() === "admin") {
        window.location.href = "/admin";
      } else {
        window.location.href = "/";
      }
    } catch (error) {
      console.error("Error leyendo usuario de localStorage", error);
      localStorage.removeItem("user");
    }
  }, []);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      const loggedUser = await loginUser(email, password);

      setIsSuccess(true);
      setMessage("Inicio de sesión exitoso, redirigiendo...");

      setTimeout(() => {
        if (loggedUser?.role?.name?.toLowerCase() === "admin") {
          window.location.href = "/admin";
        } else {
          window.location.href = "/";
        }
      }, 1500);

    } catch (error) {
      console.error("Login error:", error);
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
            <form className="needs-validation" noValidate onSubmit={handleSubmit}>
              <h3 className="text-center my-4">Iniciar Sesión</h3>

              <div className="mb-3">
                <label className="form-label">Correo</label>
                <input
                  type="text"
                  className="form-control"
                  placeholder="Ingresa tu correo"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </div>

              <div className="mb-3">
                <label className="form-label">Contraseña</label>
                <input
                  type="password"
                  className="form-control"
                  placeholder="Ingresa tu contraseña"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
              </div>

              {message && (
                <div
                  className={`alert text-center ${isSuccess ? "alert-success" : "alert-danger"}`}
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
