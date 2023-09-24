import { BookmarksRepo, DatabaseClient } from './models/index.js';
import Controller from './controller/index.js';
import { print, print2 } from './shared/index.js';

BookmarksRepo.setRepository(new DatabaseClient('prod_bookmarks_table'));

export const handler = async (event) => {
    try {
        print();
        print2();
        return Controller(event['httpMethod'], event);
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
