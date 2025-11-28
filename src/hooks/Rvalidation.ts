// src/hooks/Rvalidation.tsx
import { useState } from "react";
import { ValidacionR } from "../hooks/ValidacionR";
import { createUser } from "../services/userService";
import isDuoc from "../hooks/isDuoc";

export function useRvalidation() {
  const [name, setName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [rpassword, setRpassword] = useState("");
  const [error, setError] = useState<{name?: string;lastName?: string;email?: string;password?: string;rpassword?: string;}>({});
  const [valid, setValid] = useState(false);
  const [loading, setLoading] = useState(false);
  const [apiError, setApiError] = useState<string | null>(null);

  const validate = () => {
   
    const trimmedName = name.trim();
    const trimmedLastName = lastName.trim();
    const trimmedEmail = email.trim();
    const trimmedPassword = password; 
    const trimmedRpassword = rpassword;

    const newErrors = ValidacionR(
      trimmedEmail,
      trimmedPassword,
      trimmedRpassword,
      trimmedName,
      trimmedLastName
    );

    setError(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setApiError(null);

    if (!validate()) {
      return;
    }

    setLoading(true);
    try {
      // Construir payload acorde al ejemplo de admin
      const payload = {
        name: name.trim(),
        last_name: lastName.trim(),
        email: email.trim(),
        password: password.trim(),
        role: null, // en registro público dejamos role null o el que tu backend espere por defecto
        isDuoc: isDuoc(email.trim()),
        phoneNumber: null,
      };

      await createUser(payload);
      setValid(true);
      // limpiar formulario
      setName("");
      setLastName("");
      setEmail("");
      setPassword("");
      setRpassword("");
      
      setTimeout(() => {
        window.location.href = "/login"; 
      }, 1200);
    } catch (err: any) {
      // manejar error de API (ajusta segun la estructura real)
      const message =
        err?.message || err?.response?.data?.message || "Error al registrar";
      setApiError(message);
    } finally {
      setLoading(false);
    }
  };

  // helpers para limpiar error por campo al tipear desde el componente
  const clearFieldError = (field: keyof typeof error) => {
    setError((prev) => ({ ...prev, [field]: undefined }));
  };

  return {
    name,
    setName,
    lastName,
    setLastName,
    email,
    setEmail,
    password,
    setPassword,
    rpassword,
    setRpassword,
    handleSubmit,
    error,
    valid,
    loading,
    apiError,
    clearFieldError,
  };
}
