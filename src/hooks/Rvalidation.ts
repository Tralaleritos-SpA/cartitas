import { useState } from "react";
import {ValidacionR} from "../hooks/ValidacionR";

export function useRvalidation() {
   
    const [email, setEmail]= useState("");
    const [password, setPassword]= useState("");
    const [rpassword, setRpassword]= useState("");
    const [error, setError]= useState<{email?: string; password?: string; rpassword?: string}>({});
    const [valid, setValid]= useState(false);

    const validate=()=>{
        const newErros= ValidacionR(email, password, rpassword);
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

