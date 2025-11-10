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
        throw new Error("API Error in brandService:" + errorMessage);
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
        throw new Error("API Error in brandService:" + errorMessage);
    }
}

export async function createBrand(brandName: { name: string }): Promise<Brand> {
    try {
        const response = await fetch(apiURL, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(brandName),
        });

        if (!response.ok) {
            throw new Error(
                `Failed to create brand. Status: ${response.status}`
            );
        }

        const newBrand: Brand = await response.json();
        return newBrand;
    } catch (error) {
        const errorMessage =
            error instanceof Error ? error.message : String(error);
        throw new Error("API Error in createBrand:" + errorMessage);
    }
}

export async function deleteBrand(brandId: string): Promise<void> {
    try {
        const response = await fetch(apiURL + "/" + brandId, {
            method: "DELETE",
        });

        if (!response.ok) {
            throw new Error(
                `Failed to delete brand. Status: ${response.status}`
            );
        }

        return;
    } catch (error) {
        const errorMessage =
            error instanceof Error ? error.message : String(error);
        throw new Error("API Error in deleteBrand: " + errorMessage);
    }
}
