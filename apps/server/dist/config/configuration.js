"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = () => ({
    server: {
        port: parseInt(process.env.BOOKMARKS_SERVER_PORT, 10)
    },
    database: {
        host: process.env.BOOKMARKS_DATABASE_HOST,
        port: parseInt(process.env.BOOKMARKS_DATABASE_PORT, 10) || 5432
    }
});
//# sourceMappingURL=configuration.js.map