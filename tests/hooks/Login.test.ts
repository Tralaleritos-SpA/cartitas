

import users from "../../src/data/user.json"
import ValidateLogin from "../../src/hooks/Login";
import { describe, expect, test } from "vitest";

describe('Prueba pagina login', () => {

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