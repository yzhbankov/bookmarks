declare const _default: () => {
    server: {
        port: number;
    };
    google: {
        clientID: string;
        clientSecret: string;
        callbackUrl: string;
    };
    jwt: {
        secret: string;
    };
    database: {
        user: string;
        password: string;
        host: string;
        schema: string;
        port: number;
    };
};
export default _default;
