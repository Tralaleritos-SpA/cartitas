import { useEffect, useMemo, useState } from "react";
import { Form } from "react-bootstrap";
import type { Brand, Product } from "../types/productTypes";

type ProductFilter = {
    searchTerm: string;
    minPrice?: number | null;
    maxPrice: number;
    brand: string | null;
    minUnits?: number | null; // for accesorios: select minimum units to show
    minPlayers?: number | null; // for juegos de mesa
    maxPlayers?: number | null;
};

interface AdvancedSearchProps {
    // emit the full filter object when any control changes
    onFilterChange: (filters: ProductFilter) => void;
    isAccesorio: boolean;
    isJuegoMesa: boolean;
    brands: Brand[] | null;
    brandsLoading: boolean;
    brandsError: Error | null;
    // current list of products (usually categorizedProducts) to compute dynamic UI (max price, quantities)
    products?: Product[] | null;
}

function SearchBox({
    onFilterChange,
    isAccesorio,
    isJuegoMesa,
    brands,
    brandsLoading,
    brandsError,
    products,
}: AdvancedSearchProps) {
    if (brandsError) {
        return (
            <div className="alert alert-danger">
                Error Fetching brands: {brandsError.toString()}
            </div>
        );
    }

    // inputValue is the immediate input from the user; searchTerm is the debounced value
    const [searchTerm, setSearchTerm] = useState("");
    const [inputValue, setInputValue] = useState("");
    // derive dynamic max price from available products
    const derivedMaxPrice = useMemo(() => {
        if (!products || products.length === 0) return 1000000;
        return Math.max(
            ...products.map((p) => (typeof p.price === "number" ? p.price : 0))
        );
    }, [products]);
    // derive dynamic min price from available products
    const derivedMinPrice = useMemo(() => {
        if (!products || products.length === 0) return 0;
        return Math.min(
            ...products.map((p) =>
                typeof p.price === "number" ? p.price : Infinity
            )
        );
    }, [products]);

    const [maxPrice, setMaxPrice] = useState<number>(
        derivedMaxPrice ?? 1000000
    );
    const [selectedBrand, setSelectedBrand] = useState<string | null>(null);
    const [minUnits, setMinUnits] = useState<number | null>(null);
    const [minPlayers, setMinPlayers] = useState<number | null>(null);
    const [maxPlayers, setMaxPlayers] = useState<number | null>(null);
    // quantity options derived from products (unique positive quantities)
    const quantityOptions = useMemo(() => {
        if (!products) return [] as number[];
        const set = new Set<number>();
        for (const p of products) {
            const q = p.quantity ?? p.stock ?? 0;
            if (q > 0) set.add(q);
        }
        return Array.from(set).sort((a, b) => a - b);
    }, [products]);

    // whenever products change, ensure maxPrice defaults to derivedMaxPrice if current exceeds it or is initial
    useEffect(() => {
        setMaxPrice((cur) =>
            derivedMaxPrice != null && cur > derivedMaxPrice
                ? derivedMaxPrice
                : cur
        );
    }, [derivedMaxPrice]);

    // ensure maxPrice stays within derived min/max when those change
    useEffect(() => {
        setMaxPrice((cur) => {
            const min = derivedMinPrice ?? 0;
            const max = derivedMaxPrice ?? 1000000;
            if (cur < min) return max; // push to max if current below min
            if (cur > max) return max;
            return cur;
        });
    }, [derivedMinPrice, derivedMaxPrice]);

    // No editable minPrice (we use derivedMinPrice as the fixed lower bound)

    // debounce the input value into searchTerm (300ms)
    useEffect(() => {
        const t = setTimeout(() => setSearchTerm(inputValue), 300);
        return () => clearTimeout(t);
    }, [inputValue]);

    // notify parent whenever filters change (uses debounced searchTerm)
    useEffect(() => {
        onFilterChange({
            searchTerm,
            minPrice: derivedMinPrice,
            maxPrice,
            brand: selectedBrand,
            minUnits,
            minPlayers,
            maxPlayers,
        });
    }, [
        searchTerm,
        derivedMinPrice,
        maxPrice,
        selectedBrand,
        minUnits,
        minPlayers,
        maxPlayers,
        onFilterChange,
    ]);

    return (
        <div className="box mb-3">
            <h4>Busqueda Avanzada</h4>

            <input
                type="text"
                placeholder="Buscar..."
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                className="form-control mb-2"
            />

            <label className="form-label">
                Precio: {derivedMinPrice} - {derivedMaxPrice}
            </label>
            <div className="d-flex justify-content-between mb-1 small">
                <div>Min: {derivedMinPrice}</div>
                <div>Max: {maxPrice}</div>
            </div>
            {/* single-range: slider for max price with colored track from min->selected */}
            {(() => {
                const min = derivedMinPrice ?? 0;
                const max = derivedMaxPrice ?? 1000000;
                const range = Math.max(1, max - min);
                // dynamic step: divide range into ~100 steps
                const dynamicStep = Math.max(1, Math.round(range / 100));

                return (
                    <input
                        type="range"
                        className="form-range mb-2 range-primary"
                        id="customRange1"
                        min={min}
                        max={max}
                        step={dynamicStep}
                        value={maxPrice}
                        onChange={(e) => {
                            const v = Number(e.target.value);
                            setMaxPrice(v);
                        }}
                    />
                );
            })()}

            {brandsLoading ? (
                <div>Brands loading...</div>
            ) : (
                <Form.Select
                    value={selectedBrand ?? ""}
                    onChange={(e) => setSelectedBrand(e.target.value || null)}
                    className="mb-2"
                >
                    <option value="">Todas las marcas</option>
                    {brands?.map((brand, index) => (
                        <option key={index + 1} value={brand.name}>
                            {brand.name}
                        </option>
                    ))}
                </Form.Select>
            )}

            {isAccesorio ? (
                <div className="mb-2">
                    <label className="form-label">Unidades</label>
                    <Form.Select
                        value={minUnits ?? ""}
                        onChange={(e) =>
                            setMinUnits(
                                e.target.value ? Number(e.target.value) : null
                            )
                        }
                        className="mb-2"
                    >
                        <option value="">Cualquiera</option>
                        {quantityOptions.map((q) => (
                            <option key={q} value={q}>
                                {q}
                            </option>
                        ))}
                    </Form.Select>
                </div>
            ) : null}

            {isJuegoMesa ? (
                <>
                    <label className="form-label">Jugadores (min - max)</label>
                    <div className="d-flex gap-2 mb-2">
                        <input
                            type="number"
                            className="form-control"
                            placeholder="Min"
                            value={minPlayers ?? ""}
                            onChange={(e) =>
                                setMinPlayers(
                                    e.target.value
                                        ? Number(e.target.value)
                                        : null
                                )
                            }
                        />
                        <input
                            type="number"
                            className="form-control"
                            placeholder="Max"
                            value={maxPlayers ?? ""}
                            onChange={(e) =>
                                setMaxPlayers(
                                    e.target.value
                                        ? Number(e.target.value)
                                        : null
                                )
                            }
                        />
                    </div>
                </>
            ) : null}
            <div className="d-flex justify-content-end">
                <button
                    type="button"
                    className="button button-primary"
                    onClick={() => {
                        // reset to defaults based on products
                        setSearchTerm("");
                        setInputValue("");
                        setMaxPrice(derivedMaxPrice ?? 1000000);
                        setSelectedBrand(null);
                        setMinUnits(null);
                        setMinPlayers(null);
                        setMaxPlayers(null);
                    }}
                >
                    Limpiar Filtros
                </button>
            </div>
        </div>
    );
}

export default SearchBox;
