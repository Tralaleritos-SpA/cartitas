import type { StoredUser, User } from "../types/UserTypes";

const apiURL = "http://localhost:6969/api/v1/users";

export async function fetchUsers(): Promise<User[]> {
    try {
        const response = await fetch(apiURL);

        if (!response.ok) {
            throw `Failed to fetch users. Status: ${response.status}`;
        }

        const users: User[] = await response.json();

        return users;
    } catch (error) {
        const errorMessage =
            error instanceof Error ? error.message : String(error);
        throw new Error("API Error in userService:" + errorMessage);
    }
}

export async function fetchActiveUsers(): Promise<User[]> {
    try {
        const response = await fetch(apiURL + "/active");

        if (!response.ok) {
            throw `Failed to fetch active users. Status: ${response.status}`;
        }

        const Users: User[] = await response.json();

        return Users;
    } catch (error) {
        const errorMessage =
            error instanceof Error ? error.message : String(error);
        throw new Error("API Error in userService:" + errorMessage);
    }
}

export async function createUser(userName: { name: string }): Promise<User> {
    try {
        const response = await fetch(apiURL, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(userName),
        });

        if (!response.ok) {
            throw new Error(
                `Failed to create user. Status: ${response.status}`
            );
        }

        const newUser: User = await response.json();
        return newUser;
    } catch (error) {
        const errorMessage =
            error instanceof Error ? error.message : String(error);
        throw new Error("API Error in createUser:" + errorMessage);
    }
}

export async function deleteUser(userId: string): Promise<void> {
    try {
        const response = await fetch(apiURL + "/" + userId, {
            method: "DELETE",
        });

        if (!response.ok) {
            throw new Error(
                `Failed to delete user. Status: ${response.status}`
            );
        }

        return;
    } catch (error) {
        const errorMessage =
            error instanceof Error ? error.message : String(error);
        throw new Error("API Error in deleteUser: " + errorMessage);
    }
}

export async function updateUserActive(userId: string, active: boolean): Promise<void> {
    try {
        const getRes = await fetch(`${apiURL}/${userId}`);
        if (!getRes.ok) {
            throw new Error(`Failed to fetch user for update. Status: ${getRes.status}`);
        }
        const existing = await getRes.json();

        const updatedObj = { ...existing, active };

        const response = await fetch(`${apiURL}/${userId}`, {
            method: "PUT",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(updatedObj),
        });

        if (!response.ok) {
            throw new Error(`Failed to update user active. Status: ${response.status}`);
        }

        return;
    } catch (error) {
        const errorMessage = error instanceof Error ? error.message : String(error);
        throw new Error("API Error in updateUserActive: " + errorMessage);
    }
}

export async function loginUser(
    email: string,
    password: string
): Promise<StoredUser> {
    try {
        const response = await fetch(apiURL + "/login", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ email, password }),
        });

        if (!response.ok) {
            throw new Error(`Failed to login user. Status: ${response.status}`);
        }

        const data: StoredUser = await response.json();

        localStorage.setItem("user", JSON.stringify(data));

        return data;
    } catch (error) {
        const errorMessage =
            error instanceof Error ? error.message : String(error);
        throw new Error("API Error in loginUser: " + errorMessage);
    }
}
