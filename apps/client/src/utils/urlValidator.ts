type ValidationResultType = {
    valid: boolean;
    title?: string;
};

export function validateHttpUrl(url: string): ValidationResultType {
    try {
        const newUrl = new URL(url);
        return { valid: true, title: newUrl.hostname };
    } catch (err) {
        return { valid: false };
    }
}
