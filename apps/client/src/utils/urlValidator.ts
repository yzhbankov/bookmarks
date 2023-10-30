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

export function urlsEqual(urlOne: string, urlTwo: string): boolean {
    let strippedUrlOne = urlOne.split('?')[0].toLowerCase();
    let strippedUrlTwo = urlTwo.split('?')[0].toLowerCase();

    if (strippedUrlOne.endsWith('/')) {
        strippedUrlOne = strippedUrlOne.slice(0, -1);
    }

    if (strippedUrlTwo.endsWith('/')) {
        strippedUrlTwo = strippedUrlTwo.slice(0, -1);
    }

    return strippedUrlOne === strippedUrlTwo;
}
