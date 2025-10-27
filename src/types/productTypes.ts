export interface Brand {
    id: string;
    active: boolean;
    name: string;
}

export interface Category {
    id: string;
    active: boolean;
    name: string;
}

export interface Product {
    id: string;
    isActive?: boolean;
    name: string;
    brand: Brand;
    category: Category;
    stock?: number;
    price: number;

    // Optional fields
    img_url: string | "";
    description: string | null;
    quantity?: number;
    min_player_number?: number;
    max_player_number?: number;
}
