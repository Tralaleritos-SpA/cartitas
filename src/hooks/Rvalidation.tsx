import { useState } from "react";

export function useRvalidation() {
   
    const [email, setEmail]= useState("");
    const [password, setPassword]= useState("");
    const [rpassword, setRpassword]= useState("");
    const [error, setError]= useState<{email?: string; password?: string; rpassword?: string}>({});
    const [valid, setValid]= useState(false);

    const validate=()=>{
        const newErros: typeof error={};
        //validar email
        if(!email.includes("@")){
            newErros.email="Ingresa un correo válido.";
        }
        if(!password){
            newErros.password="Ingresa tu contraseña.";
        }
        if(!rpassword || rpassword !== password){
            newErros.rpassword="Las contraseñas no coinciden.";
        }

        setError(newErros);
        return Object.keys(newErros).length===0;
    };

    const handleSubmit=(e: React.FormEvent)=>{
        e.preventDefault();
        if(validate()){
            setValid(true);
            setTimeout(() => {
                window.location.href="/";
            }, 1500);
        }
    };

    return {email,setEmail,password,setPassword,rpassword, setRpassword, handleSubmit, error, valid};
};

