interface IConfig {
    clientId: string;
}

export const config: IConfig = {
    clientId:
        process.env.BOOKMARKS_GOOGLE_CLIENT_ID ||
        '***.apps.googleusercontent.com',
};
