import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import ValidateLogin from "../hooks/Login";

type StoredUser = {
  id: number;
  name: string;
  role: string;
  email: string;
};

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const [isSuccess, setIsSuccess] = useState(false);

  useEffect(() => {
    document.title = "Inicio Sesión";
    //si hay un usuario en el localStorage redirigira segun el rol correspondiente
    try {
      const userStorage = localStorage.getItem("user");
      if (!userStorage) return;

      const user: StoredUser = JSON.parse(userStorage);

      if (user?.role === "admin") {
        window.location.href = "/admin";
      } else {
        window.location.href = "/";
      }
    } catch (error) {
      console.error("Error leyendo usuario de localStorage", error);
      localStorage.removeItem("user");
    }
  }, []);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();



    const user = ValidateLogin(email, password);

    if (user) {
      setIsSuccess(true);
      setMessage("Inicio de sesión exitoso, redirigiendo...");
      try {//guarda los datos en el localstorage sin la contraseña
        const { password: _password, ...passwordSinContraseña } = user as any;
        localStorage.setItem("user", JSON.stringify(passwordSinContraseña));
      } catch (error) {
        console.error("Error guardando usuario en localStorage", error);
      }
      setTimeout(() => {
        if (user.role == "admin") {
          window.location.href = "/admin";
        } else {
          window.location.href = "/";
        }
      }, 1500);

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
