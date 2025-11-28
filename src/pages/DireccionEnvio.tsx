import { useEffect, useState } from "react";
import type { StoredUser } from "../types/UserTypes";

function Checkoutdireccion() {
  const [NombreCompleto, setNombreCompleto] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [direccion, setdireccion] = useState("");
  const [ciudad, setciudad] = useState("");
  const [postal, setpostal] = useState("");

  useEffect(() => {
    const userStorage = localStorage.getItem("user");
    if (!userStorage) return;

    try {
      const user: StoredUser = JSON.parse(userStorage);

      if (user?.name && user?.last_name) setNombreCompleto(`${user.name} ${user.last_name}`);
      if (user?.email) setEmail(user.email);
    } catch (error) {
      console.error("Error leyendo usuario de localStorage", error);
    }
  }, []);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log({ NombreCompleto, email, phone, direccion, ciudad, postal });
    alert("Formulario enviado (demo)");
  };

  return (
    <div className="container mt-4">
      <h3 className="mb-4">Dirección de Envío</h3>
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label className="form-label">Nombre completo</label>
          <input
            type="text"
            className="form-control"
            value={NombreCompleto}
            onChange={(e) => setNombreCompleto(e.target.value)}
            required
          />
        </div>

        <div className="mb-3">
          <label className="form-label">Correo</label>
          <input
            type="email"
            className="form-control"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>

        <div className="mb-3">
          <label className="form-label">Número de teléfono</label>
          <input
            type="tel"
            className="form-control"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            placeholder="Ingresa tu número"
            required
          />
        </div>

        <div className="mb-3">
          <label className="form-label">Dirección</label>
          <input
            type="text"
            className="form-control"
            value={direccion}
            onChange={(e) => setdireccion(e.target.value)}
            required
          />
        </div>

        <div className="row">
          <div className="col-md-6 mb-3">
            <label className="form-label">Ciudad</label>
            <input
              type="text"
              className="form-control"
              value={ciudad}
              onChange={(e) => setciudad(e.target.value)}
              required
            />
          </div>
          <div className="col-md-6 mb-3">
            <label className="form-label">Código postal</label>
            <input
              type="text"
              className="form-control"
              value={postal}
              onChange={(e) => setpostal(e.target.value)}
              required
            />
          </div>
        </div>

        <button type="submit" className="button btn-primary w-100 mt-3">
          Finalizar Compra
        </button>
      </form>
    </div>
  );
}

export default Checkoutdireccion;
