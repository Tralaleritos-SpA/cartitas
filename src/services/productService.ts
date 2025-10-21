import type { Product } from "../types/productTypes";

export async function fetchProducts(): Promise<Product[]> {
    const apiURL = "http://localhost:6969/api/v1/products/active";

    try {
        const response = await fetch(apiURL);

        if (!response.ok) {
            throw `Failed to fetch products. Status: ${response.status}`;
        }

        const products: Product[] = await response.json();

        return products;
    } catch (error) {
        throw "API Error in productService:" + error;
    }
}
