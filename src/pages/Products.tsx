import { useParams } from "react-router";
import CardGrid from "../components/CardGrid";
import { useState, useMemo, useCallback } from "react";
import SearchBox from "../components/SearchBox";
import { useFetch } from "../hooks/useFetch";
import { fetchActiveBrands } from "../services/brandService";
import { fetchActiveProducts } from "../services/productService";
import type { Product } from "../types/productTypes";

type Filters = {
    searchTerm: string;
    minPrice?: number | null;
    maxPrice: number;
    brand: string | null;
    minUnits?: number | null;
    minPlayers?: number | null;
    maxPlayers?: number | null;
    sortOption?: "price-asc" | "price-desc" | "name-asc" | "name-desc";
};

function Products() {
    const {
        data: brandList,
        loading: brandLoading,
        error: brandError,
    } = useFetch(fetchActiveBrands);

    const {
        data: productList,
        loading: productLoading,
        error: productError,
    } = useFetch(fetchActiveProducts);

    const { category } = useParams();
    // central filters object received from SearchBox
    const [filters, setFilters] = useState<Filters>({
        searchTerm: "",
        minPrice: null,
        maxPrice: 1000000,
        brand: null,
        minUnits: null,
        minPlayers: null,
        maxPlayers: null,
        sortOption: "name-asc",
    });

    // usa useMemo para updatear la lista solo cuando cambia su contenido
    const categorizedProducts = useMemo(() => {
        if (productList) {
            return category
                ? productList.filter(
                      (prod: Product) =>
                          prod.category.name.toString() === category
                  )
                : productList;
        } else {
            const empty: Product[] = [];
            return empty;
        }
    }, [productList, category]);

    const displayedProducts = useMemo(() => {
        if (!categorizedProducts) return [] as Product[];

        const results = categorizedProducts.filter((product: Product) => {
            // text search
            const nameMatch = filters.searchTerm
                ? product.name
                      ?.toLowerCase()
                      .includes(filters.searchTerm.toLowerCase())
                : true;

            // price filter
            const priceMatch =
                typeof product.price === "number"
                    ? filters.minPrice != null
                        ? product.price >= filters.minPrice &&
                          product.price <= filters.maxPrice
                        : product.price <= filters.maxPrice
                    : true;

            // brand filter
            const brandMatch = filters.brand
                ? product.brand?.name === filters.brand
                : true;

            // minUnits (for accesorios) - expects product.quantity or product.stock
            const unitsMatch =
                filters.minUnits != null
                    ? (product.quantity ?? product.stock ?? 0) >=
                      filters.minUnits
                    : true;

            // players filter (for juegos de mesa)
            let playersMatch = true;
            if (filters.minPlayers != null) {
                playersMatch =
                    (product.min_player_number ?? 0) >= filters.minPlayers;
            }
            if (playersMatch && filters.maxPlayers != null) {
                playersMatch =
                    (product.max_player_number ?? Infinity) <=
                    filters.maxPlayers;
            }

            return (
                nameMatch &&
                priceMatch &&
                brandMatch &&
                unitsMatch &&
                playersMatch
            );
        });

        // apply sorting according to filters.sortOption
        const sorted = [...results];
        switch (filters.sortOption) {
            case "price-asc":
                sorted.sort((a, b) => (a.price ?? 0) - (b.price ?? 0));
                break;
            case "price-desc":
                sorted.sort((a, b) => (b.price ?? 0) - (a.price ?? 0));
                break;
            case "name-asc":
                sorted.sort((a, b) =>
                    (a.name ?? "").localeCompare(b.name ?? "")
                );
                break;
            case "name-desc":
                sorted.sort((a, b) =>
                    (b.name ?? "").localeCompare(a.name ?? "")
                );
                break;
            default:
                break;
        }

        return sorted;
    }, [filters, categorizedProducts]);

    const title = category ? category : "Productos";
    document.title = title;

    let isAccesorio = false;
    let isJuegoMesa = false;

    // checkea la categoria para ver q campos mostrar en el componente de busqueda
    switch (category) {
        case "Accesorios":
            isAccesorio = true;
            break;

        case "Juegos De Mesa":
            isJuegoMesa = true;
            break;

        case "TCG":
            isJuegoMesa = false;
            isAccesorio = false;
            break;

        default:
            isAccesorio = true;
            isJuegoMesa = true;
            break;
    }

    const handleFilterChange = useCallback(
        (f: Filters) => setFilters(f),
        [setFilters]
    );

    return (
        <div className="container">
            <div className="row">
                <div className="col-sm-12 col-md-4">
                    <SearchBox
                        onFilterChange={handleFilterChange}
                        products={categorizedProducts}
                        isAccesorio={isAccesorio}
                        isJuegoMesa={isJuegoMesa}
                        brands={brandList}
                        brandsLoading={brandLoading}
                        brandsError={brandError}
                    />
                </div>

                <div className="col-sm-12 col-md-8">
                    <CardGrid
                        products={displayedProducts}
                        loading={productLoading}
                        error={productError}
                    />
                </div>
            </div>
        </div>
    );
}

export default Products;
