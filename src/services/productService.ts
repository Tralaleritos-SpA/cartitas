import type { Product } from "../types/productTypes";

const apiURL = "http://localhost:6969/api/v1/products";

export async function fetchProducts(): Promise<Product[]> {
    try {
        const response = await fetch(apiURL);

        if (!response.ok) {
            throw `Failed to fetch products. Status: ${response.status}`;
        }

        const products: Product[] = await response.json();

        return products;
    } catch (error) {
        const errorMessage =
            error instanceof Error ? error.message : String(error);
        throw new Error("API Error in productService:" + errorMessage);
    }
}

export async function fetchActiveProducts(): Promise<Product[]> {
    try {
        const response = await fetch(apiURL + "/active");

        if (!response.ok) {
            throw `Failed to fetch active products. Status ${response.status}`;
        }

        const activeProducts: Product[] = await response.json();

        return activeProducts;
    } catch (error) {
        const errorMessage =
            error instanceof Error ? error.message : String(error);
        throw new Error("API Error in productService:" + errorMessage);
    }
}
