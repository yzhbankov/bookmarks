"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = () => ({
    server: {
        port: parseInt(process.env.BOOKMARKS_SERVER_PORT, 10),
    },
    google: {
        clientID: process.env.BOOKMARKS_GOOGLE_CLIENT_ID,
        clientSecret: process.env.BOOKMARKS_GOOGLE_CLIENT_SECRET,
        callbackUrl: process.env.BOOKMARKS_GOOGLE_CALLBACK_URL,
    },
    jwt: {
        secret: process.env.BOOKMARKS_JWT_SECRET,
    },
    database: {
        user: process.env.BOOKMARKS_DB_USER,
        password: process.env.BOOKMARKS_DB_PWD,
        host: process.env.BOOKMARKS_DB_HOST,
        schema: process.env.BOOKMARKS_DB_SCHEMA,
        port: parseInt(process.env.BOOKMARKS_DB_PORT, 10),
    },
});
//# sourceMappingURL=configuration.js.map