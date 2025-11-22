export interface User {
    id: string;
    active: boolean;
    name: string;
    last_name: string;
    email: string;
    password: string;
    role: Role;
    isDuoc: boolean;
    phoneNumber: string | null;
}

export interface Role {
    id: string;
    active: boolean;
    name: string;
}
