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
