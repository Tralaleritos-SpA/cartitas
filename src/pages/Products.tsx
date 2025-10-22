import { useParams } from "react-router";
import CardGrid from "../components/CardGrid";
import { useEffect, useState, useMemo } from "react";
import SearchBox from "../components/SearchBox";
import { useFetch } from "../hooks/useFetch";
import { fetchActiveBrands } from "../services/brandService";
import { fetchActiveProducts } from "../services/productService";
import type { Product } from "../types/productTypes";

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
    const [searchTerm, setSearchTerm] = useState("");

    // usa useMemo para updatear la lista solo cuando cambia su contenido
    const categorizedProducts = useMemo(() => {
        if (productList) {
            return category
                ? productList.filter(
                      (prod: Product) => prod.category.toString() === category
                  )
                : productList;
        } else {
            const empty: Product[] = [];

            return empty;
        }
    }, [productList, category]);

    const [displayedProducts, setDisplayedProducts] =
        useState(categorizedProducts);

    const title = category ? category : "Productos";

    document.title = title;

    const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setSearchTerm(event.target.value);
    };

    useEffect(() => {
        if (categorizedProducts) {
            const results = categorizedProducts.filter((product: Product) =>
                product.name?.toLowerCase().includes(searchTerm.toLowerCase())
            );
            setDisplayedProducts(results);
        }
    }, [searchTerm, categorizedProducts]);

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

    return (
        <div className="container">
            <div className="row">
                <div className="col-sm-12 col-md-4">
                    <SearchBox
                        onChange={handleSearchChange}
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
