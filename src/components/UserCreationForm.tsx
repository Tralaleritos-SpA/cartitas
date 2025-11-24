import { Form } from "react-bootstrap";
import { useFetch } from "../hooks/useFetch";
import { useCreate } from "../hooks/useCreate";
import { useState } from "react";
import { fetchActiveRoles } from "../services/roleService";
import isDuoc from "../hooks/isDuoc";
import type { Role, User } from "../types/UserTypes";
import { createUser } from "../services/userService";

interface UserPayload {
    name: string;
    last_name: string;
    email: string;
    password: string;
    role: Role | null;
    isDuoc: boolean;
    phoneNumber: string | null;
}

function UserCreationForm() {
    const {
        data: dataRole,
        loading: loadingRole,
        error: errorRole,
    } = useFetch(fetchActiveRoles);

    const {
        create,
        createdResource,
        loading: loadingSubmit,
        error: errorSubmit,
    } = useCreate<User, UserPayload>(createUser);

    const [userName, setUserName] = useState("");
    const [userLastName, setUserLastName] = useState("");
    const [userEmail, setUserEmail] = useState("");
    const [userPassword, setUserPassword] = useState("");
    const [userRoleId, setUserRoleId] = useState("");
    const [userPhoneNumber, setUserPhoneNumber] = useState("");

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        const selectedRole =
            dataRole?.find((role) => role.id === userRoleId) ?? null;

        await create({
            name: userName.trim(),
            last_name: userLastName.trim(),
            email: userEmail.trim(),
            password: userPassword.trim(),
            role: selectedRole,
            isDuoc: isDuoc(userEmail.trim()),
            phoneNumber: userPhoneNumber,
        });
        console.log(isDuoc(userEmail.trim()));
        setUserName("");
        setUserLastName("");
        setUserEmail("");
        setUserPassword("");
        setUserRoleId("");
        setUserPhoneNumber("");
    };

    return (
        <>
            <h3>Crear Usuario</h3>
            <p>
                Los campos marcados con <label className="text-red"> * </label>
                son obligatorios.
            </p>

            <Form onSubmit={handleSubmit}>
                <div className="row">
                    <div className="col">
                        <label className="text-red">*</label>
                        <label>Nombre:</label>
                        <input
                            type="text"
                            required
                            value={userName}
                            disabled={loadingRole || loadingSubmit}
                            className="form-control my-1"
                            onChange={(e) => setUserName(e.target.value)}
                        />
                        <label className="text-red">*</label>
                        <label>Email:</label>
                        <input
                            type="email"
                            required
                            value={userEmail}
                            disabled={loadingRole || loadingSubmit}
                            className="form-control my-1"
                            onChange={(e) => setUserEmail(e.target.value)}
                        />
                    </div>
                    <div className="col">
                        <label className="text-red">*</label>
                        <label>Apellido:</label>
                        <input
                            type="text"
                            required
                            value={userLastName}
                            disabled={loadingRole || loadingSubmit}
                            className="form-control my-1"
                            onChange={(e) => setUserLastName(e.target.value)}
                        />
                        <label className="text-red">*</label>
                        <label>ContraseNIa:</label>
                        <input
                            type="password"
                            required
                            value={userPassword}
                            disabled={loadingRole || loadingSubmit}
                            className="form-control my-1"
                            onChange={(e) => setUserPassword(e.target.value)}
                        />
                    </div>
                    <div className="col">
                        <label>Numero telefonico:</label>
                        <input
                            type="tel"
                            value={userPhoneNumber}
                            disabled={loadingRole || loadingSubmit}
                            className="form-control my-1"
                            onChange={(e) => setUserPhoneNumber(e.target.value)}
                        />
                        <label>Asignar rol:</label>
                        {loadingRole ? (
                            <p>Cargando roles...</p>
                        ) : (
                            <Form.Select
                                className="my-1"
                                value={userRoleId}
                                disabled={loadingRole || loadingSubmit}
                                onChange={(e) => setUserRoleId(e.target.value)}
                            >
                                <option value={""}>cliente</option>
                                {dataRole?.map((role, index) => (
                                    <option value={role.id} key={index}>
                                        {role.name}
                                    </option>
                                ))}
                            </Form.Select>
                        )}
                    </div>
                    <button
                        type="submit"
                        className="button button-primary w-100"
                    >
                        {loadingSubmit
                            ? "Registrando Usuario..."
                            : "Registrar Usuario"}
                    </button>
                </div>

                {errorRole && (
                    <div className="alert alert-danger mt-3">
                        Error: {errorRole.message}
                    </div>
                )}

                {errorSubmit && (
                    <div className="alert alert-danger mt-3">
                        Error: {errorSubmit.message}
                    </div>
                )}
                {createdResource && (
                    <div className="alert alert-success mt-3">
                        El usuario se ha creado correctamente:{" "}
                        {createdResource?.name} (ID:
                        {createdResource?.id})
                    </div>
                )}
            </Form>
        </>
    );
}

export default UserCreationForm;
