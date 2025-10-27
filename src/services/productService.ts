import type { Brand, Category, Product } from "../types/productTypes";

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

export async function fetchProductById(id: string): Promise<Product> {
    try {
        const response = await fetch(apiURL + "/" + id);

        if (!response.ok) {
            throw `Failed to fetch product. Status ${response.status}`;
        }

        const foundProduct: Product = await response.json();

        return foundProduct;
    } catch (error) {
        const errorMessage =
            error instanceof Error ? error.message : String(error);
        throw new Error("API Error in productFetchById:" + errorMessage);
    }
}

export async function createProduct(productBody: {
    name: string;
    brand: Brand;
    category: Category;
    stock: number;
    price: number;

    // Optional fields
    img_url: string | "";
    description: string | null;
    quantity?: number;
    min_player_number?: number;
    max_player_number?: number;
}): Promise<Product> {
    try {
        const response = await fetch(apiURL, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(productBody),
        });

        if (!response.ok) {
            throw new Error(
                `Failed to create brand. Status: ${response.status}`
            );
        }

        const newProduct: Product = await response.json();
        return newProduct;
    } catch (error) {
        const errorMessage =
            error instanceof Error ? error.message : String(error);
        throw new Error("API Error in createCategory:" + errorMessage);
    }
}
