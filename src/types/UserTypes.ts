export interface User {
    id: string;
    active: boolean;
    name: string;
    last_name: string;
    email: string;
    password: string;
    role: Role;
    duoc: boolean;
    phoneNumber: string | null;
}

export interface Role {
    id: string;
    active: boolean;
    name: string;
}

export type StoredUser = {
    id: string;
    name: string;
    last_name: string;
    email: string;
    role: Role;
    isDuoc: boolean;
};
