import { Form } from "react-bootstrap";
import { useCreate } from "../hooks/useCreate";
import type { Category } from "../types/productTypes";
import { useState } from "react";
import { createCategory } from "../services/categoryService";

interface categoryPayload {
    name: string;
}
function CategoryCreationForm() {
    const { create, createdResource, loading, error } = useCreate<
        Category,
        categoryPayload
    >(createCategory);

    const [categoryName, setCategoryName] = useState("");

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        if (!categoryName.trim()) return;

        await create({ name: categoryName.trim() });
        setCategoryName("");
    };

    return (
        <>
            <h1>Crear Categoria</h1>
            <Form onSubmit={handleSubmit}>
                <input
                    type="text"
                    value={categoryName}
                    onChange={(e) => setCategoryName(e.target.value)}
                    placeholder="Nombre de la categoria"
                    required
                    disabled={loading}
                    className="form-control"
                />

                <button type="submit" disabled={loading} className="button">
                    {loading ? "Creando Categoria..." : "Crear Categoria"}
                </button>

                {error && (
                    <div className="alert alert-danger">
                        Error: {error.message}
                    </div>
                )}

                {createdResource && (
                    <div className="alert alert-success">
                        La categoria se ha creado correctamente:{" "}
                        {createdResource?.name} (ID: {createdResource?.id})
                    </div>
                )}
            </Form>
        </>
    );
}

export default CategoryCreationForm;
