import { BookmarksRepo, DatabaseClient } from './models/index.js';
import Controller from './controller/index.js';

BookmarksRepo.setRepository(new DatabaseClient('prod_bookmarks_table'));

export const handler = async (event) => {
    try {
        const method = event.httpMethod;
        return Controller(method, event);
    } catch (error) {
        return {
            statusCode: 500,
            body: JSON.stringify({ error: error.message }),
            headers: {
                'Content-Type': 'application/json'
            }
        };
    }
};
