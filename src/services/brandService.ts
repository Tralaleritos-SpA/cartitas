import type { Brand } from "../types/productTypes";

export async function fetchBrands(): Promise<Brand[]> {
    const apiURL = "http://localhost:6969/api/v1/brands/active";

    try {
        const response = await fetch(apiURL);

        if (!response.ok) {
            throw `Failed to fetch brands. Status: ${response.status}`;
        }

        const brands: Brand[] = await response.json();

        return brands;
    } catch (error) {
        throw "API Error in brandService: " + error;
    }
}
