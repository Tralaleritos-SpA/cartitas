const VALID_DOMAINS: Set<String> = new Set<string>([
    "profesor.duoc.cl",
    "duocuc.cl",
    "duoc.cl",
]);

function isDuoc(email: string) {
    if (!email) {
        return false;
    }

    const parts = email.split("@");
    const domain = parts[parts.length - 1];

    return VALID_DOMAINS.has(domain.toLowerCase());
}

export default isDuoc;
