import { BookmarksRepo, DatabaseClient } from './models';
import Controller from './controller';

const db = new BookmarksRepo(new DatabaseClient('prod_bookmarks_table'));

exports.handler = async (event) => {
    try {
        const method = event.httpMethod;
        Controller(method, event);
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
