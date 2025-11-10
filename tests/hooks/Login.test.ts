import ValidateLogin from "../../src/hooks/Login";
import { describe, expect, test } from "vitest";

describe('Prueba pagina login', () => {

    const users = [ {
        "id": 1,
        "name": "Matias Gonzalez",
        "role": "user",
        "email": "matiasgonazalez@gmail.com",
        "password": "123456"
    },
    {
        "id": 2,
        "name": "Admin",
        "role": "admin",
        "email": "admin@example.com",
        "password": "123456"
    },
    {
        "id": 3,
        "name": "Jane Doe",
        "role": "user",
        "email": "jane.doe@example.com",
        "password": "jane123"
    }]

  test('debe devolver correcto si el usuario y contraseña  coinciden', () => {

    const user = users[0]

    const email = user.email
    const password = user.password

    const resultado=ValidateLogin(email,password)

    expect(resultado).toEqual(user)


  })

  test('debe devolver false si  el email no coincide', () => {
    const user= users[1]
    const password=user.password
    
    const resultado =ValidateLogin("elenor@gmail.com", password)
    
    expect(resultado).toBe(false)
  })

  test('debe devolver false si  la contraseña no coincide', () => {
    const user= users[2]
    const email=user.email
    
    const resultado =ValidateLogin(email, "wrongpassword")
    
    expect(resultado).toBe(false)
  })

  test("tiene que devolver false si email o password están vacíos", () => {
  const resultado = ValidateLogin("", "");
  expect(resultado).toBe(false);
  })
 

})