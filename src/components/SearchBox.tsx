import type React from "react";
import { Form } from "react-bootstrap";
import type { Brand } from "../types/productTypes";

interface AdvancedSearchProps {
    onChange: React.ChangeEventHandler<HTMLInputElement>;
    isAccesorio: boolean;
    isJuegoMesa: boolean;
    brands: Brand[] | null;
    brandsLoading: boolean;
    brandsError: Error | null;
}

function SearchBox({
    onChange,
    isAccesorio,
    isJuegoMesa,
    brands,
    brandsLoading,
    brandsError,
}: AdvancedSearchProps) {
    if (brandsError) {
        return (
            <div className="alert alert-danger">
                Error Fetching brands: {brandsError.toString()}
            </div>
        );
    }

    return (
        <>
            <div className="box mb-3">
                <h4>Busqueda</h4>
                <input
                    type="text"
                    placeholder="Buscar..."
                    onChange={onChange}
                />

                <p>precio (slider)</p>
                <label htmlFor="customRange1" className="form-label">
                    Precio
                </label>
                <input
                    type="range"
                    className="form-range"
                    id="customRange1"
                    min={0}
                    max={1000000}
                    step={1000}
                ></input>
                {brandsLoading ? (
                    <div>Brands loading...</div>
                ) : (
                    <Form.Select>
                        {brands?.map((brand, index) => (
                            <option key={index + 1}>{brand.name}</option>
                        ))}
                    </Form.Select>
                )}
                {isAccesorio ? (
                    <p>unidades (checkbox (en caso de accesorios))</p>
                ) : null}
                {isJuegoMesa ? (
                    <p>cant jugadores (checkbox (en caso de juego de mesa))</p>
                ) : null}
            </div>
        </>
    );
}

export default SearchBox;
