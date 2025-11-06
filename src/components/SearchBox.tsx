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
                    className="form-control my-1"
                    placeholder="Nombre producto..."
                    onChange={onChange}
                />
                <label htmlFor="customRange1" className="form-label">
                    Precio (slider)
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
                    <Form.Select className="my-1" value={""}>
                        <option value={""} disabled hidden>
                            Selecciona una marca...
                        </option>
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
