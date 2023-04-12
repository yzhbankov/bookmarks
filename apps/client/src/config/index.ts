interface IConfig {
    clientId: string;
    baseURL: string;
}

export const config: IConfig = {
    clientId: process.env.REACT_APP_BOOKMARKS_GOOGLE_CLIENT_ID || '',
    baseURL: process.env.REACT_APP_BOOKMARKS_BASE_URL || '',
};
