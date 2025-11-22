import type { Role } from "../types/UserTypes";

const apiURL = "http://localhost:6969/api/v1/roles";

export async function fetchRoles(): Promise<Role[]> {
    try {
        const response = await fetch(apiURL);

        if (!response.ok) {
            throw `Failed to fetch roles. Status: ${response.status}`;
        }

        const roles: Role[] = await response.json();

        return roles;
    } catch (error) {
        const errorMessage =
            error instanceof Error ? error.message : String(error);
        throw new Error("API Error in roleService:" + errorMessage);
    }
}

export async function fetchActiveRoles(): Promise<Role[]> {
    try {
        const response = await fetch(apiURL + "/active");

        if (!response.ok) {
            throw `Failed to fetch active roles. Status: ${response.status}`;
        }

        const Roles: Role[] = await response.json();

        return Roles;
    } catch (error) {
        const errorMessage =
            error instanceof Error ? error.message : String(error);
        throw new Error("API Error in roleService:" + errorMessage);
    }
}

export async function createRole(roleName: { name: string }): Promise<Role> {
    try {
        const response = await fetch(apiURL, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(roleName),
        });

        if (!response.ok) {
            throw new Error(
                `Failed to create role. Status: ${response.status}`
            );
        }

        const newRole: Role = await response.json();
        return newRole;
    } catch (error) {
        const errorMessage =
            error instanceof Error ? error.message : String(error);
        throw new Error("API Error in createRole:" + errorMessage);
    }
}

export async function deleteRole(roleId: string): Promise<void> {
    try {
        const response = await fetch(apiURL + "/" + roleId, {
            method: "DELETE",
        });

        if (!response.ok) {
            throw new Error(
                `Failed to delete role. Status: ${response.status}`
            );
        }

        return;
    } catch (error) {
        const errorMessage =
            error instanceof Error ? error.message : String(error);
        throw new Error("API Error in deleteRole: " + errorMessage);
    }
}
