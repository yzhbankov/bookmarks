import { TagsRepo } from './models/index.js';
import { DatabaseClient } from '../shared/models/index.js';
import { controller } from '../shared/system/index.js';
import { Routers } from './routers/index.js';

TagsRepo.setRepository(new DatabaseClient('prod_bookmarks_table'));

export const handler = async (event) => {
    try {
        return controller(Routers)(event['httpMethod'], event);
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
