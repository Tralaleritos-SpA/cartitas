import { describe, test, expect } from "vitest";
import { ValidacionR } from "../../src/hooks/ValidacionR";

describe("Validaciones de registro", () => {
  test("si el correo no contiene el @ manda error", () => {
    const result = ValidacionR("correo", "123456", "123456", "Juan", "Perez");
    expect(result.email).toBe("Ingresa un correo válido.");
  });

  test("si la contraseña esta vacia manda error", () => {
    const result = ValidacionR("correo@valido.com", "", "", "Juan", "Perez");
    expect(result.password).toBe("Ingresa tu contraseña.");
  });

  test("si la contraseña no coincide retorna el error", () => {
    const result = ValidacionR("correo@valido.com", "123456", "654321", "Juan", "Perez");
    expect(result.rpassword).toBe("Las contraseñas no coinciden.");
  });

  test(" si todo es válido no retorna nada ", () => {
    const result = ValidacionR("correo@valido.com", "123456", "123456", "Juan", "Perez");
    expect(result).toEqual({});
  });

  test("si la contraseña es menor a 6 caracteres manda error", () => {
    const result = ValidacionR("correomayor6@gmail.com", "123", "123", "Juan", "Perez");
    expect(result.password).toBe("La contraseña debe tener al menos 6 caracteres.");
  });
});
