//logica separada porq sino no podria hacerla
export function ValidacionR(email: string, password: string, rpassword: string) {
  const error: { email?: string; password?: string; rpassword?: string } = {};

  if (!email.includes("@")) {
    error.email = "Ingresa un correo válido.";
  }

  if (!password) {
    error.password = "Ingresa tu contraseña.";
  }

  if (rpassword !== password) {
    error.rpassword = "Las contraseñas no coinciden.";
  }

  return error;
}
