export function getCookie(headers) {
    const cookies = headers.Cookie || headers.cookie;
    let accessToken;

    if (cookies) {
        const cookieArray = cookies.split(';');
        for (let i = 0; i < cookieArray.length; i++) {
            const cookie = cookieArray[i].trim();
            if (cookie.startsWith('access_token=')) {
                // Extract the access_token value from the cookie
                accessToken = cookie.substring('access_token='.length);
                accessToken = accessToken.replace(/%22/g, '');
                break;
            }
        }
    }
    return accessToken;
}

export function parseRequest(event) {
    const body = event.body && JSON.parse(event.body);
    const cookie = getCookie(event.headers);
    const idStartIndex = event.path.lastIndexOf('/') + 1;
    const param = event.path.substring(idStartIndex);

    return {
        body,
        cookie,
        param,
    }
}
