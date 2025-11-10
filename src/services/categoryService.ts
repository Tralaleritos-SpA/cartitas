import type { Category } from "../types/productTypes";

const apiURL = "http://localhost:6969/api/v1/categories";

export async function fetchCategories(): Promise<Category[]> {
    try {
        const response = await fetch(apiURL);

        if (!response.ok) {
            throw `Failed to fetch brands. Status: ${response.status}`;
        }

        const categories: Category[] = await response.json();

        return categories;
    } catch (error) {
        const errorMessage =
            error instanceof Error ? error.message : String(error);
        throw new Error("API Error in categoryService:" + errorMessage);
    }
}

export async function fetchActiveCategories(): Promise<Category[]> {
    try {
        const response = await fetch(apiURL + "/active");

        if (!response.ok) {
            throw `Failed to fetch active brands. Status: ${response.status}`;
        }

        const categories: Category[] = await response.json();

        return categories;
    } catch (error) {
        const errorMessage =
            error instanceof Error ? error.message : String(error);
        throw new Error("API Error in categoryService:" + errorMessage);
    }
}

export async function createCategory(categoryName: {
    name: string;
}): Promise<Category> {
    try {
        const response = await fetch(apiURL, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(categoryName),
        });

        if (!response.ok) {
            throw new Error(
                `Failed to create brand. Status: ${response.status}`
            );
        }

        const newCategory: Category = await response.json();
        return newCategory;
    } catch (error) {
        const errorMessage =
            error instanceof Error ? error.message : String(error);
        throw new Error("API Error in createCategory:" + errorMessage);
    }
}

export async function deleteCategory(brandId: string): Promise<void> {
    try {
        const response = await fetch(apiURL + "/" + brandId, {
            method: "DELETE",
        });

        if (!response.ok) {
            throw new Error(
                `Failed to delete category. Status: ${response.status}`
            );
        }

        return;
    } catch (error) {
        const errorMessage =
            error instanceof Error ? error.message : String(error);
        throw new Error("API Error in deleteCategory: " + errorMessage);
    }
}
