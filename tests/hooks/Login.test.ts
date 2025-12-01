import { loginUser } from "../../src/services/userService";
import { describe, expect, test, vi, beforeEach, afterEach } from "vitest";

describe("Prueba servicio loginUser", () => {
  const users = [
    {
      id: 1,
      name: "Matias Gonzalez",
      role: "user",
      email: "matiasgonazalez@gmail.com",
      password: "123456",
    },
    {
      id: 2,
      name: "Admin",
      role: "admin",
      email: "admin@example.com",
      password: "123456",
    },
    {
      id: 3,
      name: "Jane Doe",
      role: "user",
      email: "jane.doe@example.com",
      password: "jane123",
    },
  ];

  let originalFetch: any;

  beforeEach(() => {
    originalFetch = globalThis.fetch;
  });

  afterEach(() => {
    globalThis.fetch = originalFetch;
    localStorage.clear();
    vi.resetAllMocks();
  });

  test("debe resolver y guardar usuario cuando credenciales coinciden", async () => {
    const user = users[0];
    globalThis.fetch = vi.fn(() =>
      Promise.resolve({ ok: true, json: () => Promise.resolve(user) } as any)
    );

    const res = await loginUser(user.email, user.password);
    expect(res).toEqual(user);
    expect(localStorage.getItem("user")).toEqual(JSON.stringify(user));
  });

  test("debe rechazar cuando el servidor responde no-ok (credenciales inválidas)", async () => {
    globalThis.fetch = vi.fn(() => Promise.resolve({ ok: false, status: 401 } as any));

    await expect(loginUser("noexiste@example.com", "nop")).rejects.toThrow();
  });

  test("debe rechazar si email o password están vacíos", async () => {
    globalThis.fetch = vi.fn(() => Promise.resolve({ ok: false, status: 400 } as any));
    await expect(loginUser("", "")).rejects.toThrow();
  });
});