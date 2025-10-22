import type { Brand } from "../types/productTypes";

const apiURL = "http://localhost:6969/api/v1/brands";

export async function fetchBrands(): Promise<Brand[]> {
    try {
        const response = await fetch(apiURL);

        if (!response.ok) {
            throw `Failed to fetch brands. Status: ${response.status}`;
        }

        const brands: Brand[] = await response.json();

        return brands;
    } catch (error) {
        const errorMessage =
            error instanceof Error ? error.message : String(error);
        throw new Error("API Error in productService:" + errorMessage);
    }
}

export async function fetchActiveBrands(): Promise<Brand[]> {
    try {
        const response = await fetch(apiURL + "/active");

        if (!response.ok) {
            throw `Failed to fetch active brands. Status: ${response.status}`;
        }

        const brands: Brand[] = await response.json();

        return brands;
    } catch (error) {
        const errorMessage =
            error instanceof Error ? error.message : String(error);
        throw new Error("API Error in productService:" + errorMessage);
    }
}
