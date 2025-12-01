import { Form } from "react-bootstrap";
import { useCreate } from "../hooks/useCreate";
import { useState } from "react";
import type { Role } from "../types/UserTypes";
import { createRole } from "../services/roleService";

interface RolePayload {
    name: string;
}
function RoleCreationForm() {
    const { create, createdResource, loading, error } = useCreate<
        Role,
        RolePayload
    >(createRole);

    const [roleName, setRoleName] = useState("");

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        if (!roleName.trim()) return;

        await create({ name: roleName.trim() });
        setRoleName("");
    };

    return (
        <>
            <h3>Crear Rol</h3>
            <Form onSubmit={handleSubmit}>
                <input
                    type="text"
                    value={roleName}
                    onChange={(e) => setRoleName(e.target.value)}
                    placeholder="Nombre del rol"
                    required
                    disabled={loading}
                    className="form-control"
                />

                <button
                    type="submit"
                    disabled={loading}
                    className="button button-primary"
                >
                    {loading ? "Creando rol..." : "Crear Rol"}
                </button>

                {error && (
                    <div className="alert alert-danger">
                        Error: {error.message}
                    </div>
                )}

                {createdResource && (
                    <div className="alert alert-success">
                        El rol se ha creado correctamente:{" "}
                        {createdResource?.name} (ID: {createdResource?.id})
                    </div>
                )}
            </Form>
        </>
    );
}

export default RoleCreationForm;
