//logica separada porq sino no podria hacerla
export function ValidacionR(email: string, password: string, rpassword: string, name: string, lastName: string) {
  const error: { email?: string; password?: string; rpassword?: string; name?: string; lastName?: string } = {};

  if (!email.includes("@")) {
    error.email = "Ingresa un correo válido.";
  }

  if (!password) {
    error.password = "Ingresa tu contraseña.";
  }else if (password.length < 6) {
    error.password = "La contraseña debe tener al menos 6 caracteres.";
  }

  if (rpassword !== password) {
    error.rpassword = "Las contraseñas no coinciden.";
  }

  if (name.trim() === "") {
    error.name = "Ingresa tu nombre.";
  }
  
  if (lastName.trim() === "") {
    error.lastName = "Ingresa tu apellido.";
  }

  return error;
}
