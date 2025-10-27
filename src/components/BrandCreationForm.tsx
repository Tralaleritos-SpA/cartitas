import { Form } from "react-bootstrap";
import { useCreate } from "../hooks/useCreate";
import { createBrand } from "../services/brandService";
import type { Brand } from "../types/productTypes";
import { useState } from "react";

interface BrandPayload {
    name: string;
}
function BrandCreationForm() {
    const { create, createdResource, loading, error } = useCreate<
        Brand,
        BrandPayload
    >(createBrand);

    const [brandName, setBrandName] = useState("");

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        if (!brandName.trim()) return;

        await create({ name: brandName.trim() });
        setBrandName("");
    };

    return (
        <>
            <h3>Crear Marca</h3>
            <Form onSubmit={handleSubmit}>
                <input
                    type="text"
                    value={brandName}
                    onChange={(e) => setBrandName(e.target.value)}
                    placeholder="Nombre de la marca"
                    required
                    disabled={loading}
                    className="form-control"
                />

                <button
                    type="submit"
                    disabled={loading}
                    className="button button-primary"
                >
                    {loading ? "Creando marca..." : "Crear Marca"}
                </button>

                {error && (
                    <div className="alert alert-danger">
                        Error: {error.message}
                    </div>
                )}

                {createdResource && (
                    <div className="alert alert-success">
                        La marca se ha creado correctamente:{" "}
                        {createdResource?.name} (ID: {createdResource?.id})
                    </div>
                )}
            </Form>
        </>
    );
}

export default BrandCreationForm;
